param(
  [int]$Port = 3000,
  [string]$CsvPath = $(if ($env:QUIZ_CSV_PATH) { $env:QUIZ_CSV_PATH } else { Join-Path $PSScriptRoot "quiz-scores.csv" })
)

$ErrorActionPreference = "Stop"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()
$resolvedCsvPath = [System.IO.Path]::GetFullPath($CsvPath)
$headers = '"Enrolment Number","Name","Score","Maximum Marks","Percentage","Started At","Submitted At","Submission Reason"'
$contentTypes = @{
  "index.html" = "text/html; charset=utf-8"
  "app.js" = "text/javascript; charset=utf-8"
  "questions.js" = "text/javascript; charset=utf-8"
  "quiz-config.js" = "text/javascript; charset=utf-8"
  "styles.css" = "text/css; charset=utf-8"
}

function Write-Response($Response, [int]$Status, [string]$ContentType, [byte[]]$Bytes) {
  $Response.StatusCode = $Status
  $Response.ContentType = $ContentType
  $Response.ContentLength64 = $Bytes.Length
  $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
  $Response.Close()
}

function Write-Json($Response, [int]$Status, $Value) {
  $json = ConvertTo-Json -InputObject $Value -Compress
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
  Write-Response $Response $Status "application/json; charset=utf-8" $bytes
}

function ConvertTo-CsvField($Value) {
  $text = [string]$Value
  if ($text -match '^\s*[=+\-@]') { $text = "'" + $text }
  return '"' + $text.Replace('"', '""') + '"'
}

Write-Host "DBMS Quiz available at http://127.0.0.1:$Port"
Write-Host "Scores will be appended to $resolvedCsvPath"

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    if ($request.HttpMethod -eq "POST" -and $request.Url.AbsolutePath -eq "/api/attempts") {
      try {
        if ($request.ContentLength64 -gt 16384) { throw "Request body is too large." }
        $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
        $attempt = ConvertFrom-Json -InputObject $reader.ReadToEnd() -ErrorAction Stop
        $valid = $attempt.enrollmentNumber -is [string] -and $attempt.enrollmentNumber.Trim().Length -gt 0 -and $attempt.enrollmentNumber.Length -le 40 -and
          $attempt.name -is [string] -and $attempt.name.Trim().Length -gt 0 -and $attempt.name.Length -le 100 -and
          $attempt.score -is [int] -and $attempt.maxMarks -is [int] -and $attempt.maxMarks -gt 0 -and
          $attempt.percentage -is [int] -and $attempt.startedAt -is [string] -and
          $attempt.submittedAt -is [string] -and $attempt.submissionReason -is [string]
        if (-not $valid) {
          Write-Json $response 400 @{ error = "Attempt data is incomplete or invalid." }
          continue
        }

        $fields = @(
          $attempt.enrollmentNumber, $attempt.name, $attempt.score, $attempt.maxMarks,
          "$($attempt.percentage)%", $attempt.startedAt, $attempt.submittedAt, $attempt.submissionReason
        ) | ForEach-Object { ConvertTo-CsvField $_ }
        if (-not (Test-Path -LiteralPath $resolvedCsvPath) -or (Get-Item -LiteralPath $resolvedCsvPath).Length -eq 0) {
          [System.IO.File]::WriteAllText($resolvedCsvPath, $headers + "`r`n", (New-Object System.Text.UTF8Encoding($true)))
        }
        [System.IO.File]::AppendAllText($resolvedCsvPath, ($fields -join ",") + "`r`n", (New-Object System.Text.UTF8Encoding($false)))
        Write-Json $response 201 @{ saved = $true }
      } catch {
        Write-Json $response 400 @{ error = $_.Exception.Message }
      }
      continue
    }

    if ($request.HttpMethod -ne "GET") {
      Write-Response $response 405 "text/plain; charset=utf-8" ([System.Text.Encoding]::UTF8.GetBytes("Method not allowed"))
      continue
    }

    $relativePath = if ($request.Url.AbsolutePath -eq "/") { "index.html" } else { $request.Url.AbsolutePath.TrimStart("/") }
    if (-not $contentTypes.ContainsKey($relativePath)) {
      Write-Response $response 404 "text/plain; charset=utf-8" ([System.Text.Encoding]::UTF8.GetBytes("Not found"))
      continue
    }
    $filePath = Join-Path $PSScriptRoot $relativePath
    if (-not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
      Write-Response $response 404 "text/plain; charset=utf-8" ([System.Text.Encoding]::UTF8.GetBytes("Not found"))
      continue
    }
    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    Write-Response $response 200 $contentTypes[$relativePath] $bytes
  }
} finally {
  $listener.Stop()
  $listener.Close()
}