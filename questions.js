/* Question templates and contexts follow the five theory units in syllabus 313302. */
(function () {
  "use strict";

  const contexts = [
    "college enrolment system", "hospital patient-record system",
    "retail inventory system", "banking application",
    "online examination portal"
  ];

  const units = [
    {
      name: "Unit I · Introduction to Database Systems",
      questions: [
        ["Simple", "what is the primary purpose of a DBMS?", "To define, store, retrieve, and manage data in a controlled way", ["To compile application source code", "To replace every operating system", "To design web-page layouts"], "A DBMS provides facilities to define, store, query, and administer data."],
        ["Simple", "which problem is a DBMS designed to reduce compared with separate file systems?", "Uncontrolled data redundancy and inconsistency", ["The need to give data any structure", "The use of computer memory", "The need to identify records"], "Centralized database management helps control duplicated data and inconsistencies."],
        ["Simple", "which term means a meaningful fact or value before it is organized into useful information?", "Data", ["Schema", "Query", "Transaction"], "Data is a collection of raw facts that can be processed into information."],
        ["Simple", "which database model organizes data primarily as tables of rows and columns?", "Relational model", ["Hierarchical model", "Network model", "File-allocation model"], "The relational model represents data and relationships using tables."],
        ["Simple", "what does a database schema describe?", "The database's defined structure", ["Only the rows added today", "The sequence of user logins", "The result of the most recent query"], "A schema is the defined organization of a database, including its objects and constraints."],
        ["Intermediate", "which level of data abstraction describes how records are physically stored?", "Internal (physical) level", ["External (view) level", "Conceptual level", "Application-interface level"], "The internal level concerns storage structures and access paths."],
        ["Intermediate", "a change to an index should not require changes to application views. Which property does this illustrate?", "Physical data independence", ["Logical data independence", "Referential integrity", "Entity integrity"], "Physical data independence isolates logical structures from storage changes."],
        ["Intermediate", "in which architecture does a client application communicate directly with the database server?", "Two-tier architecture", ["Three-tier architecture", "Peer-to-peer file architecture", "Single-level abstraction"], "In a two-tier client-server arrangement, the client communicates with the database server."],
        ["Complex", "a team changes the storage format of a table while keeping its logical design and user views unchanged. Which conclusion is correct?", "This is physical data independence; storage changes are isolated from higher levels", ["This is logical data independence; every view must be rewritten", "This is referential integrity; all foreign keys are removed", "This is a schema change that requires all users to redefine their queries"], "Physical data independence permits internal storage changes without changing the conceptual schema or external views."],
        ["Complex", "an application separates the user interface, business rules, and database access into distinct tiers. What is the main architectural benefit?", "The middle tier can enforce business logic without exposing direct database access to clients", ["All tiers must use the same machine and process", "The database no longer needs a schema", "Every client must store a complete database copy"], "Three-tier architecture separates presentation, application logic, and data services."],
        ["Simple", "what does a data dictionary typically store?", "Metadata describing database objects and their definitions", ["Only backup copies of table rows", "Only the results of the latest transaction", "The source code of every client application"], "A data dictionary records metadata such as object definitions, data types, and constraints."],
        ["Simple", "which database model represents parent-child records in a tree structure?", "Hierarchical model", ["Relational model", "Network model", "Document-free model"], "The hierarchical model organizes records in a tree of parent-child relationships."],
        ["Simple", "what is a database instance?", "The data stored in the database at a particular moment", ["The permanent definition of all database tables", "The DBMS software installation package", "A rule that makes every attribute a key"], "An instance is the database contents at a particular point in time."],
        ["Simple", "which DBMS component parses and processes SQL statements?", "Query processor", ["Presentation layer", "Operating-system scheduler", "Data-entry form"], "The query processor interprets SQL and prepares operations for execution."],
        ["Simple", "which type of database user is responsible for access control, backup, and database maintenance?", "Database administrator", ["End user", "Application visitor", "Web-page designer"], "A database administrator manages security, availability, and ongoing database operations."],
        ["Intermediate", "which schema level describes the whole logical structure of the database for the organization?", "Conceptual level", ["External level", "Internal level", "Presentation level"], "The conceptual schema describes the overall logical structure and relationships."],
        ["Intermediate", "an organization changes its logical table design while preserving each user's external view. Which property is sought?", "Logical data independence", ["Physical data independence", "Atomicity", "Domain integrity"], "Logical data independence insulates external views from changes to the conceptual schema."],
        ["Intermediate", "which feature distinguishes the network data model from a strict tree-based hierarchical model?", "A record can participate in multiple parent-child relationships", ["Every record must have exactly one parent", "Data can only be stored in a single table", "It has no links between records"], "The network model allows more general record links, including multiple parent relationships."],
        ["Complex", "a legacy file application keeps separate customer details in orders, invoices, and support files. Updating one file but not the others creates conflicting addresses. Which DBMS advantage directly addresses this problem?", "Controlled integration and reduced redundancy help maintain a consistent shared customer record", ["Data abstraction requires separate copies of every customer", "A three-tier architecture automatically corrects all user-entered values", "A database instance prevents any concurrent access"], "A shared database can reduce uncontrolled duplication and the resulting update anomalies."],
        ["Complex", "an analyst needs a customized view that hides salary columns, while the underlying shared database schema remains unchanged. Which abstraction level supplies this view?", "External level", ["Internal level", "Physical storage level", "Transaction state level"], "The external level presents user- or application-specific views of the database."]
      ]
    },
    {
      name: "Unit II · Relational Data Model",
      questions: [
        ["Simple", "in a relational table, what is a row called?", "Tuple", ["Domain", "Attribute", "Schema"], "A row in a relation is a tuple."],
        ["Simple", "in a relational table, what is a column called?", "Attribute", ["Tuple", "Transaction", "Instance"], "A column in a relation is an attribute."],
        ["Simple", "which key uniquely identifies each row and is selected for that purpose?", "Primary key", ["Foreign key", "Non-key attribute", "Domain"], "A primary key uniquely identifies each tuple in its table."],
        ["Simple", "which key refers to a key in another table to represent a relationship?", "Foreign key", ["Candidate key", "Superkey", "Alternate attribute"], "A foreign key references a key in another relation."],
        ["Simple", "what does first normal form (1NF) require for each row-column intersection?", "A single, atomic value", ["A repeating list of values", "Every attribute to be a foreign key", "Every table to contain exactly two rows"], "1NF requires attribute values to be atomic rather than repeating groups."],
        ["Intermediate", "a table's key is (StudentID, CourseID), and StudentName depends only on StudentID. Which issue does this indicate?", "A partial dependency that violates 2NF", ["A transitive dependency that violates 3NF only", "A domain constraint that guarantees 2NF", "A foreign-key cycle"], "An attribute depending on only part of a composite key is a partial dependency; 2NF removes it."],
        ["Intermediate", "which constraint ensures that a foreign-key value either matches a referenced key or is null when permitted?", "Referential integrity", ["Domain integrity", "Entity integrity", "View consistency"], "Referential integrity keeps references consistent with rows in the referenced relation."],
        ["Intermediate", "which ER attribute type can be broken into smaller meaningful components, such as street, city, and postal code?", "Composite attribute", ["Multivalued attribute", "Derived attribute", "Keyless attribute"], "A composite attribute has constituent subattributes."],
        ["Complex", "a relation is in 2NF, but a non-key attribute depends on another non-key attribute. Which normal form is still violated, and what should be removed?", "3NF; remove the transitive dependency", ["1NF; split every atomic value", "2NF; remove a partial dependency on the whole key", "BCNF; add a repeating group"], "3NF requires non-key attributes to depend on the key, the whole key, and nothing but the key."],
        ["Complex", "in an ER model, an employee record cannot be identified without its owning department and has only a partial key. How should it be modelled?", "As a weak entity identified through its owner and an identifying relationship", ["As a strong entity with no relationship", "As a multivalued attribute of the department", "As a domain constraint"], "A weak entity depends on an owner entity and is identified using its partial key together with the owner's key."],
        ["Simple", "what is a candidate key?", "A minimal set of attributes that uniquely identifies a tuple", ["Any attribute that may contain duplicates", "A key that can only reference another table", "A list of permitted values for a column"], "A candidate key uniquely identifies tuples, and no proper subset of it does."],
        ["Simple", "what does a domain specify for a relational attribute?", "The permitted set or type of values for that attribute", ["The number of tables in a schema", "The user who owns each row", "The physical location of the database"], "A domain constrains the values that an attribute may contain."],
        ["Simple", "which rule of entity integrity applies to a primary key?", "No primary-key component may be null", ["Every primary key must reference another table", "A primary key must contain a repeating group", "Every table must have two primary keys"], "Entity integrity requires primary-key values to identify rows and not be null."],
        ["Simple", "which ER attribute can have several values for one entity, such as multiple phone numbers?", "Multivalued attribute", ["Composite attribute", "Derived attribute", "Simple single-valued attribute"], "A multivalued attribute can have more than one value for an entity instance."],
        ["Simple", "which relationship cardinality allows one department to be associated with many employees?", "One-to-many", ["One-to-one", "Many-to-many", "Zero-to-zero"], "In a one-to-many relationship, one entity instance can relate to multiple instances of the other entity."],
        ["Intermediate", "a person's age is calculated from their date of birth rather than stored directly. What type of ER attribute is age in this design?", "Derived attribute", ["Multivalued attribute", "Foreign-key attribute", "Weak attribute"], "A derived attribute is calculated from other stored information."],
        ["Intermediate", "which functional dependency notation states that attribute set X determines attribute set Y?", "X → Y", ["X ∩ Y = 0", "X ⊂ Y only", "Y → X for every relation"], "X → Y means that each X value is associated with a single Y value."],
        ["Intermediate", "a relation has a single-attribute primary key and no partial dependencies. Which additional condition is specifically required for 3NF?", "It has no transitive dependency of a non-key attribute on the key", ["It must contain a multivalued attribute", "Every non-key attribute must be a foreign key", "It must have a composite primary key"], "3NF rules out transitive dependencies of non-key attributes on a key."],
        ["Complex", "an order table stores OrderID, CustomerID, and CustomerAddress; OrderID determines CustomerID, and CustomerID determines CustomerAddress. What is the normalization issue?", "CustomerAddress is transitively dependent on OrderID through CustomerID", ["CustomerAddress is a partial dependency on part of OrderID", "CustomerID violates 1NF because it is a key", "The relation has no functional dependency"], "CustomerAddress depends on the key through the non-key CustomerID, a transitive dependency."],
        ["Complex", "a registration relation uses (StudentID, CourseID) as its key, and Grade depends on both attributes together. Which normal-form conclusion is justified if all values are atomic and there are no other dependencies?", "It satisfies 2NF because Grade depends on the whole composite key", ["It violates 1NF because its key is composite", "It violates 2NF because Grade depends on the whole key", "It is necessarily in 3NF regardless of other dependencies"], "With atomic values and no partial dependencies, a relation with a composite key satisfies 2NF; 3NF requires checking transitive dependencies as well."]
      ]
    },
    {
      name: "Unit III · Interactive SQL and Performance Tuning",
      questions: [
        ["Simple", "which SQL language category is used to create or alter table structures?", "DDL", ["DML", "DCL", "TCL"], "Data Definition Language includes commands such as CREATE and ALTER."],
        ["Simple", "which SQL command adds a new row to a table?", "INSERT", ["UPDATE", "DELETE", "GRANT"], "INSERT adds rows to a table."],
        ["Simple", "which clause filters individual rows before grouping?", "WHERE", ["HAVING", "ORDER BY", "GROUP BY"], "WHERE applies conditions to rows before group aggregation."],
        ["Simple", "which aggregate function counts rows?", "COUNT", ["ROUND", "UPPER", "SYSDATE"], "COUNT returns the number of rows or non-null values, depending on its argument."],
        ["Simple", "which database object stores a named query result definition that can be queried like a table?", "View", ["Sequence", "Index", "Cursor"], "A view is a named query that presents data from one or more tables."],
        ["Intermediate", "which clause filters groups after aggregate calculations have been made?", "HAVING", ["WHERE", "ORDER BY", "VALUES"], "HAVING filters grouped results, often using aggregate expressions."],
        ["Intermediate", "which join returns only rows that satisfy the join condition in both tables?", "INNER JOIN", ["LEFT OUTER JOIN", "CROSS JOIN", "FULL OUTER JOIN"], "An inner join includes matching row pairs and excludes unmatched rows."],
        ["Intermediate", "which SQL category includes GRANT and REVOKE?", "DCL", ["DDL", "DML", "TCL"], "Data Control Language commands manage database privileges."],
        ["Complex", "a query should list departments whose average salary exceeds 50000. Which clause must filter the grouped average?", "HAVING AVG(salary) > 50000", ["WHERE AVG(salary) > 50000 before GROUP BY", "ORDER BY AVG(salary) > 50000", "GROUP BY AVG(salary) > 50000"], "An aggregate condition is applied to groups with HAVING after GROUP BY."],
        ["Complex", "a report must list every customer, including customers with no orders, alongside any matching orders. Which join preserves those customers?", "LEFT OUTER JOIN from Customer to Order", ["INNER JOIN from Customer to Order", "RIGHT join with Order on the left and no reversal", "CROSS JOIN"], "A left outer join retains every row on its left side and supplies nulls when no right-side match exists."],
        ["Simple", "which SQL command changes existing values in selected rows?", "UPDATE", ["INSERT", "CREATE", "GRANT"], "UPDATE modifies values in existing rows."],
        ["Simple", "which SQL operator combines the results of two compatible queries and removes duplicates?", "UNION", ["JOIN", "MINUS ALL", "ORDER BY"], "UNION combines compatible result sets and removes duplicate rows."],
        ["Simple", "which clause sorts query results?", "ORDER BY", ["GROUP BY", "HAVING", "VALUES"], "ORDER BY sorts the rows returned by a query."],
        ["Simple", "what does a sequence commonly provide for a table column?", "Generated numeric values, often used as identifiers", ["A saved query definition", "A privilege on another user's table", "A backup of all table data"], "A sequence generates numeric values that can be used as identifiers."],
        ["Simple", "what is the primary purpose of an index?", "To provide an access path that can speed up data retrieval", ["To guarantee that every query returns sorted rows", "To replace the table's data", "To execute a stored procedure automatically"], "An index can improve lookup performance by providing an access path to rows."],
        ["Intermediate", "which operator tests whether a value matches any value returned by a subquery?", "IN", ["BETWEEN", "LIKE", "IS NULL"], "IN tests membership in a list or subquery result."],
        ["Intermediate", "which function category includes SUM, AVG, MIN, and MAX?", "Aggregate functions", ["String functions", "Date and time functions", "Transaction functions"], "Aggregate functions calculate a result over a set of rows."],
        ["Intermediate", "which TCL command can mark a point inside a transaction to which a later rollback may return?", "SAVEPOINT", ["GRANT", "TRUNCATE", "CREATE VIEW"], "SAVEPOINT establishes a named point for a partial rollback."],
        ["Complex", "an application needs rows whose salary is above the overall company average. Which SQL approach correctly computes the comparison?", "Compare salary to a scalar subquery that returns AVG(salary)", ["Compare salary to AVG(salary) in WHERE before grouping the same query", "Sort by salary and assume the middle row is the average", "Use HAVING without grouping and omit the aggregate"], "A scalar subquery can calculate the overall average for comparison with each row."],
        ["Complex", "a frequently used query filters by an indexed column, but inserts have slowed after adding several indexes. Which trade-off explains the slowdown?", "Indexes can improve reads but require storage and maintenance during data changes", ["Indexes eliminate the need to write table rows", "Indexes automatically commit every insert", "Indexes prevent all table constraints from being checked"], "Indexes speed some retrievals but must be maintained as rows are inserted, updated, or deleted."]
      ]
    },
    {
      name: "Unit IV · PL/SQL Programming",
      questions: [
        ["Simple", "which section of a PL/SQL block contains executable statements?", "BEGIN ... END", ["DECLARE only", "EXCEPTION only", "CREATE ... TABLE"], "The executable section begins with BEGIN and is terminated by END."],
        ["Simple", "which PL/SQL keyword begins the executable section of a block?", "BEGIN", ["DECLARE", "EXCEPTION", "CURSOR"], "BEGIN marks the start of executable statements."],
        ["Simple", "which cursor is automatically managed by Oracle for an individual SQL statement?", "Implicit cursor", ["Explicit cursor", "Parameterized cursor", "External cursor"], "The database creates and manages an implicit cursor for statements such as single-row DML."],
        ["Simple", "which PL/SQL section is used to handle runtime errors?", "EXCEPTION", ["DECLARE", "BEGIN", "RETURN"], "The exception section contains handlers for runtime errors."],
        ["Simple", "which stored program unit returns a value to its caller?", "Function", ["Procedure", "Trigger", "Package variable"], "A function returns a value through its RETURN clause."],
        ["Intermediate", "which sequence of operations is used with an explicit cursor to process query rows?", "DECLARE, OPEN, FETCH, and CLOSE", ["CREATE, GRANT, COMMIT, and DROP", "BEGIN, GROUP, ORDER, and HAVING", "INSERT, RENAME, TRUNCATE, and REVOKE"], "An explicit cursor is declared, opened, fetched from, and closed."],
        ["Intermediate", "which control structure repeats statements while a condition remains true?", "WHILE loop", ["IF statement", "CASE expression", "Exception handler"], "A WHILE loop tests a condition before each iteration."],
        ["Intermediate", "what is a user-defined exception?", "An application-declared error that can be raised and handled by PL/SQL code", ["A database error that can never be caught", "A cursor attribute", "A type of primary key"], "PL/SQL permits programs to declare, raise, and handle application-specific exceptions."],
        ["Complex", "a PL/SQL program must process every row from a query and close the cursor automatically after iteration. Which construct is most appropriate?", "A cursor FOR loop", ["An unopened explicit cursor", "A sequence NEXTVAL expression", "A DDL trigger used as a query"], "A cursor FOR loop manages opening, fetching, and closing the cursor automatically."],
        ["Complex", "an audit action must run automatically whenever a row is inserted into a table. Which object and timing best meet this requirement?", "An INSERT trigger that fires automatically for the event", ["A stored procedure that a user must run manually", "An explicit cursor opened by each client", "A sequence altered after each insert"], "A database trigger is associated with an event and executes automatically when that event occurs."],
        ["Simple", "which PL/SQL block section is commonly used to declare local variables and constants?", "DECLARE", ["BEGIN", "EXCEPTION", "RETURN"], "The optional DECLARE section introduces variables, constants, and cursors."],
        ["Simple", "which PL/SQL keyword declares a named constant?", "CONSTANT", ["CURSOR", "EXCEPTION", "TRIGGER"], "The CONSTANT keyword declares a variable whose value cannot be reassigned."],
        ["Simple", "which PL/SQL statement selects one branch based on a condition?", "IF", ["FETCH", "COMMIT", "OPEN"], "IF provides conditional control in PL/SQL."],
        ["Simple", "which cursor attribute indicates whether the most recent fetch returned a row?", "%FOUND", ["%TYPE", "%ROWTYPE", "%ISOPEN"], "%FOUND reports whether a cursor operation returned a row."],
        ["Simple", "which stored program unit is commonly invoked to perform an action and need not return a value?", "Procedure", ["Function", "Sequence", "View"], "A procedure performs a stored action and does not require a return value."],
        ["Intermediate", "which cursor is explicitly declared and controlled by the programmer for a multi-row query?", "Explicit cursor", ["Implicit cursor", "System sequence", "Trigger cursor"], "An explicit cursor is declared and controlled when a program processes a query row by row."],
        ["Intermediate", "which loop is guaranteed to execute its body at least once before testing its exit condition?", "Basic LOOP with an EXIT condition inside", ["WHILE loop", "IF statement", "Cursor declaration"], "A basic LOOP executes until an EXIT condition is met, so its body runs at least once."],
        ["Intermediate", "which PL/SQL section handles predefined exceptions such as NO_DATA_FOUND?", "EXCEPTION section", ["DECLARE section", "Parameter section", "Cursor query"], "Predefined exceptions are handled by handlers in the EXCEPTION section."],
        ["Complex", "a function and a procedure both perform database work, but a SQL expression needs a returned value. Which unit is designed to provide that value?", "A function with a RETURN value", ["A procedure with no output parameter", "A row-level trigger", "An explicit cursor without a fetch"], "A PL/SQL function returns a value through RETURN and can be used where a value is needed."],
        ["Complex", "a PL/SQL block raises a named application error when an account withdrawal exceeds the balance. What must the program do to handle this user-defined exception?", "Declare the exception, raise it when the condition occurs, and provide a matching handler", ["Add it as a database primary key", "Use GRANT to convert it into a predefined exception", "Open a cursor and let it commit automatically"], "A user-defined exception is declared, raised by the program, and handled in an exception section."]
      ]
    },
    {
      name: "Unit V · Database Administration",
      questions: [
        ["Simple", "which SQL command gives a user permission to perform an operation?", "GRANT", ["REVOKE", "ROLLBACK", "SAVEPOINT"], "GRANT assigns privileges to users or roles."],
        ["Simple", "which transaction property guarantees that committed changes survive a failure?", "Durability", ["Atomicity", "Isolation", "Consistency"], "Durability preserves committed results despite subsequent failures."],
        ["Simple", "which TCL command makes the current transaction's changes permanent?", "COMMIT", ["ROLLBACK", "SAVEPOINT", "REVOKE"], "COMMIT ends a transaction and makes its changes permanent."],
        ["Simple", "which backup captures database files or storage structures rather than exporting logical objects?", "Physical backup", ["Logical backup", "Query backup", "Cursor backup"], "A physical backup copies database files or physical storage components."],
        ["Simple", "which technology is primarily designed for analysis of large collections of historical data?", "Data warehouse", ["PL/SQL cursor", "Database trigger", "Sequence"], "A data warehouse integrates and organizes data for analytical reporting."],
        ["Intermediate", "which recovery operation reverses uncommitted changes after a transaction fails?", "Rollback", ["Roll forward", "Commit", "Grant"], "Rollback undoes changes that should not remain in the database."],
        ["Intermediate", "which transaction property makes a transaction behave as an all-or-nothing unit?", "Atomicity", ["Durability", "Availability", "Redundancy"], "Atomicity means all transaction operations succeed together or are undone."],
        ["Intermediate", "what is a key difference between a logical backup and a physical backup?", "A logical backup exports database objects or data; a physical backup copies database files", ["A logical backup copies files only; a physical backup exports SQL statements only", "Both terms mean that no data is saved", "A physical backup can only contain user passwords"], "Logical backups represent objects/data; physical backups capture files and storage structures."],
        ["Complex", "after restoring a backup, an administrator reapplies archived changes recorded after that backup to reach a later consistent point. Which recovery action is this?", "Roll forward", ["Rollback", "Revoke", "Savepoint"], "Roll forward reapplies recorded changes to advance a restored database."],
        ["Complex", "an organization stores raw, varied-format data for future exploration, while a separate system keeps curated historical data for reporting. Which pairing fits these purposes?", "Data lake for raw varied data; data warehouse for curated analytics", ["Data warehouse for raw files only; data lake for transaction rollback", "MongoDB for backups; a cursor for historical reports", "A sequence for raw data; a trigger for analytical storage"], "Data lakes commonly retain raw varied data, while warehouses organize curated data for analysis."],
        ["Simple", "which SQL command removes a user's previously granted privilege?", "REVOKE", ["GRANT", "COMMIT", "SAVEPOINT"], "REVOKE removes privileges previously assigned to a user or role."],
        ["Simple", "which ACID property requires concurrent transactions to behave as if suitably ordered?", "Isolation", ["Durability", "Atomicity", "Redundancy"], "Isolation controls the effects of concurrent transactions on one another."],
        ["Simple", "which transaction command undoes uncommitted changes?", "ROLLBACK", ["COMMIT", "GRANT", "CREATE"], "ROLLBACK reverses uncommitted transaction changes."],
        ["Simple", "which advanced database technology is a document-oriented NoSQL database named in the syllabus?", "MongoDB", ["PL/SQL", "SQL*Plus", "A relational index"], "MongoDB is a document-oriented NoSQL database included in the syllabus."],
        ["Simple", "which backup exports logical database objects or data rather than copying the underlying database files?", "Logical backup", ["Physical backup", "Cursor backup", "Transaction state"], "A logical backup represents database objects and data rather than the physical files."],
        ["Intermediate", "which practice follows the principle of granting only the permissions a user needs for assigned duties?", "Least privilege", ["Granting every user DBA privileges", "Sharing one administrator account", "Disabling transaction logging"], "Least privilege limits each account to the permissions required for its work."],
        ["Intermediate", "a transaction has completed its operations but has not yet been committed or rolled back. Which state is it in?", "Partially committed", ["Failed", "Aborted", "Terminated"], "A transaction enters a partially committed state after its final statement but before commit is confirmed."],
        ["Intermediate", "which data-mining activity aims to discover useful patterns or relationships in a dataset?", "Analyzing data to identify patterns and trends", ["Defining foreign-key constraints", "Creating a physical backup", "Granting table privileges"], "Data mining applies analysis to discover patterns and useful knowledge in data."],
        ["Complex", "a failure occurs after a transaction updates a balance but before it commits. During recovery, which action prevents the incomplete update from remaining?", "Rollback the uncommitted transaction", ["Roll forward the uncommitted transaction as if committed", "Grant the transaction a new privilege", "Create a sequence from the changed balance"], "An uncommitted transaction is undone during recovery so partial changes do not remain."],
        ["Complex", "an application stores flexible JSON-like documents across a managed cloud service identified in the syllabus. Which named database service matches this description?", "Amazon DynamoDB", ["Oracle sequence", "PL/SQL cursor", "A logical backup"], "DynamoDB is a managed NoSQL database service named in the advanced concepts section."]
      ]
    }
  ];

  const bank = [];
  units.forEach(function (unit, unitIndex) {
    unit.questions.forEach(function (entry, templateIndex) {
      const level = entry[0];
      const difficultyRank = level === "Simple" ? 0 : level === "Intermediate" ? 1 : 2;
      contexts.forEach(function (context, variantIndex) {
        bank.push({
          id: "DBMS-" + String(bank.length + 1).padStart(3, "0"),
          templateId: "U" + (unitIndex + 1) + "-Q" + String(templateIndex + 1).padStart(2, "0"),
          unit: unit.name,
          difficulty: level,
          difficultyRank: difficultyRank,
          question: "In the " + context + ", " + entry[1],
          answer: entry[2],
          distractors: entry[3],
          explanation: entry[4]
        });
      });
    });
  });

  window.QUESTION_BANK = bank;
})();
