This is my thesis project for my Master's in Computer Science. It is an object-relational mapper and
code generator that generates most of the data layer code for a data driven web application. 

My goal was to automate the generation of the data access code based on a model describing the
application. I designed a data definition language along with a set of rules for deriving data
access operations from the application’s data model. Code generation went through the following
process:

1. Parser: parses the input file (the application schema) and generates a parse tree; validates the syntax and structural integrity of the schema in the input file
2. SchemaValidator: checks the schema as a whole, guarding against duplicate class names, duplicate primary keys, maintaining correct references in foreign key descriptors, etc. 
3. Database loader: loads the current database schema, compares it with the new schema and updates the database
4. ApplicationLoader: takes the parse tree as input and creates an abstract syntax tree, which is then used to generating the code

The system was implemented in C#. It Generates SQL, and C# or VB.Net.  I've used it for multiple
web applications.

Sample application schemas, as well as generated code (C# and SQL) is <a href="https://github.com/ic4f/codegenerator/tree/master/demo" target="_blank">available here</a>.

## Related 

* My thesis: <a href="/static/projects/codegenerator/thesis.pdf" target="_blank">Specification and Automatic Code Generation of the Data Layer for Data-Intensive Web-Based Applications</a>
* <a href="/static/projects/codegenerator/defense.pdf" target="_blank">My thesis defense</a>
