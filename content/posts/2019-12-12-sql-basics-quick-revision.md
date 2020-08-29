---
template: post
title: SQL Basics - Quick Revision
slug: sql-basics-quick-revision
draft: false
date: '2019-12-12T12:00:00.000Z'
description: >
  This article is for quick revision of SQL basics and have a look at the syntax of SQL statements.
category: Database
tags:
  - SQL
---

> This article is for quick revision of SQL basics and have a look at the syntax of SQL statements.

## Querying data with the SELECT statement

- SELECT statement allows us to retrieve one or more rows from one or more tables.
- Think of SELECT statement as a question you are asking the database.
- Mostly it contains a list of columns from a table we want to query.
- Use of \* wildcard. But it's better to be explicit rather than using \*
- It's a good practice to table qualify your column names. It's helpful in multi table queries.
- Aliasing the table name.
- Alising the column names.
- Constraining the number of results using WHERE clause and DISTINCT qualifier.
- DISTINCT for selecting only the unique values.

```sql
SELECT 'Hello', 'World'
SELECT <COLUMN_NAME>, <COLUMN_NAME> FROM <TABLE_NAME>;
SELECT * FROM <TABLE_NAME>;
SELECT first_name FROM person;
SELECT person.first_name, person.last_name FROM person;
SELECT p.first_name, p.last_name FROM person p;
SELECT p.first_name as FirstName, p.last_name as LastName FROM person p;
SELECT DISTINCT p.first_name FROM person p;
```

## Filtering results with the WHERE clause

### WHERE clause

- Constrains the result set.
- Comes after the FROM clause.
- Contains boolean expressions.
- Using Boolean expressions.
- Use of **AND** and **OR** to combine multiple boolean expressions.

```sql
SELECT p.first_name FROM person p
WHERE p.last_name = 'Sharma'
AND p.city = 'London';
```

### BETWEEN operator

- Acts on column and two values.
- TRUE if column value is between two values.
- It is inclusive i.e. it includes two values (like >= & <=)

```sql
SELECT p.first_name FROM person p
WHERE p.age BETWEEN 13 AND 19;
```

### LIKE operator

- Fuzzy version of =
- Allows using String with special characters to do matching.
```sql
SELECT p.first_name FROM person p
WHERE p.first_name LIKE 'A%';
```

### IN operator
- It's a multi-value version of = operator
- List of potential values.
- True if any of the values in the list "hit".
```sql
SELECT p.first_name FROM person p
WHERE p.last_name IN ('Sharma', 'Modi');
```

### IS operator

- It's similar to equals operator but only for values that might be null.

```sql
SELECT p.first_name FROM person p
WHERE p.last_name IS NULL;

SELECT p.first_name FROM person p
WHERE p.last_name IS NOT NULL;
```

## Shaping results with ORDER BY and GROUP BY

Sometimes we want the result set to be different than the data returned by a simple SELECT statement.

### ORDER BY clause

- Allows sorting of result set.
- It comes after the WHERE clause.
- ASC is default order. DESC for descending order.
- If ORDER BY is not specified then SQL just returns the result in the order they are present in the table.

```sql
SELECT p.first_name FROM person p ORDER BY p.age;
SELECT p.first_name FROM person p ORDER BY p.age DESC;
```

### SET function

- Computes new values from column values.
- Use in place of columns in SELECT clause.
- Passes column name to function.
- Helps us to ask more interesting questions.
- Often used with DISTINCT qualifier.

| Name  | Details                             |
| ----- | ----------------------------------- |
| COUNT | Count of column specified           |
| MAX   | Maximum value of the column         |
| MIN   | Minimum value of the column         |
| AVG   | Average of all values of the column |
| SUM   | Sum of all values of the column     |

- If we want to include NULL values in the our COUNT then use \*

```sql
SELECT COUNT (p.first_name) FROM person p;
SELECT COUNT (DISTINCT p.first_name) FROM person p;
SELECT AVG (p.age) FROM person p;
```
### GROUP BY clause

- Create subsets.
- Allows multiple columns with a set function.
- Breaks result set into subsets.
- Runs set function against each subset.
- Result set returns 1 row per subset.
- Subset is dictated by column in GROUP BY.
- Column must appear in the SELECT LIST.
- Appears after FROM and/or WHERE clauses.

```sql
-- What is the count of every
-- unique first name in my contacts?
SELECT COUNT (p.first_name) FROM person p GROUP BY p.first_name;
```

### HAVING clause

- Works like WHERE works against SELECT
- restrict GROUP BY

```sql
-- What is the count of unique first names in
-- my contacts that appear at least 5 times?
SELECT COUNT (DISTINCT p.first_name) as FirstNameCount, p.first_name
FROM person p
GROUP BY p.first_name
HAVING COUNT FirstNameCount >= 5;
```

## Matching different data tables with JOINs

- JOINS make the relational model come to life by associating tables together.
- Merges multiple tables into one result set.

### CROSS JOIN

- Simplest JOIN
- All rows from both tables
- Similar to Cartesian Product
- It is inefficient and should be avoided

```sql
SELECT p.first_name, e.email_address FROM person p, email_address e;
```

### INNER JOIN

- Most typically used JOIN
- Emphasizes relational nature of databse
- Matches column in first table to second
- Primary key to foreign key is most common

```sql
-- What are my contacts email addresses?
SELECT p.first_name, e.email_address FROM person p
INNER JOIN email_address e
ON p.person_id = e.email_address_person_id;
```

### OUTER JOIN

- INNER JOIN doesn't deal with NULL values but OUTER JOIN works even when with no match in second table.
- Returns NULL columns if no match in second table and NULL if no match in either table.
- FULL OUTER JOIN returns all joined rows.

#### LEFT OUTER JOIN

- All the rows from the left side will be returned.
- NULL for non matching right side table rows.

```sql
-- What are my contacts and their email addresses,
-- including those I don't have an email for?
SELECT p.first_name, e.email_address FROM person p
LEFT OUTER JOIN email_address e
ON p.person_id = e.email_address_person_id;
```
#### RIGHT OUTER JOIN

- Opposite of LEFT OUTER JOIN
- Gives all rows from the right side and NULL for non-matching left side table.

#### FULL OUTER JOIN

- LEFT and RIGHT OUTER JOIN combined.

### SELF JOIN

- We can JOIN a table on itself.
- Useful when table contains hierarchial data.
- It's a concept which can be used with all other joins by putting the same table name on both sides.

## Adding, Changing, and Removing Data

### INSERT command

- Number of column names and values should be equal.
- Order of column names and values should be same.

```sql
INSERT INTO person (person_id, first_name, last_name)
VALUES (1, 'Ayush', 'Sharma'), (2, 'Hello', 'World');
```
#### Bulk Insert

```sql
INSERT INTO person p SELECT * FROM person_archive pa
WHERE pa.person_id > 100;
```

### UPDATE command
```sql
UPDATE email_address e SET e.email_address = 'abc@mail.com'
WHERE e.email_address_id = 5;
```

### DELETE command

- It's permanent deletion. So use this carefully.

```sql
DELETE FROM person p WHERE p.id = 5
```

## Creating Databases and Tables

- Data Definition Language (DDL) is SQL subset for creating databases and tables.
- There cannot be two database with same name in a single instance of a database server.

### CREATE DATABASE

- USE DATABASE command to scope future queries.

```sql
CREATE DATABASE contact;
USE DATABASE Contact;
SELECT * FROM Contact.person p;
```

### CREATE TABLE

```sql
CREATE TABLE email_address(
email_address_id INTEGER NOT NULL PRIMARY KEY,
email_address_person_id INTEGER,
email_address VARCHAR(256) NOT NULL
);
```

| Data Type | Value Space                                          |
| --------- | ---------------------------------------------------- |
| CHAR      | Can hold N character values - set to N statically    |
| VARCHAR   | set to N dynamically - can be less than N            |
| BINARY    | Hexadecimal data                                     |
| SMALLINT  | -2^15 to 2^15 -1                                     |
| INTEGER   | -2^31 to 2^31 -1                                     |
| BIGINT    | -2^63 to 2^63 -1                                     |
| BOOLEAN   | TRUE or FALSE                                        |
| DATE      | YEAR, MONTH, and DAY in the format YYYY-MM-DD        |
| TIME      | HOUR, MINUTE, and SECOND in the format HH:MM:SS[.sF] |
| TIMESTAMP | Both DATE and TIME                                   |

- NULL is default for a column definition. If it is NOT NULL then it must be specified on column definition.

### PRIMARY KEY

- Must be a unique value per row.
- Must be NOT NULL
- Can be multiple columns (compound key)

### CONSTRAINT

- Just a good practice to put all the constraints at the end of table creation

### ALTER TABLE

- Used to change the structure of existing table.
- Changes need to match the existing data.

```sql
ALTER TABLE email_address
ADD CONSTRAINT FK_email_address_person
FOREIGN KEY (email_address_person_id)
REFERENCES person (person_id);
```

### DROP TABLE

- Removes table and all data from database, so be careful!
- Error if table is a foregin key to another table.

```sql
DROP TABLE person
```

## Learning check

- Relational database theory is based partly on relational algebra.
- A common use of a Set function is to find out the number of rows in a table.
- The GROUP BY clause enables us to add a single column to a select list that includes a Set function.
- To rollback a DELETE statement, run the DELETE statement in the context of a SQL Transaction.
- By default the columns can have NULL values in them unless a NOT NULL contraint is applied.
- INSERT UPDATE DELTE only applies to one table at a time.
- AND and OR enables us to add multiple expressions in the WHERE clause.
- ALTER TABLE allows us to change columns and constraints.


I hope this was useful. let me know your feedback in the comments below.

\- Ayush 🙂