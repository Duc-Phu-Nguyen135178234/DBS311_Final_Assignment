
Student API Documentation
Base URL: http://localhost:3000/api

Endpoints Overview

Retrieve All Active Students
Method: GET
Endpoint: /students/active
Description: Fetches all students whose status is "active".
Response: A JSON array containing the details of all active students.

Add a New Student Record
Method: POST
Endpoint: /students/add
Description: Creates a new student record in the database.
Request Body:
name (string): The name of the student.
email (string): The email address of the student.
age (integer): The student's age (must be within the range of 18 to 30).
enrollment_date (date): The date the student was enrolled.
status (string): The current status of the student, which must be one of "active", "graduated", or "dropped".
Response: Returns the newly created student object in JSON format.

Update the Status of a Student
Method: PATCH
Endpoint: /students/:id
Description: Updates the status of a specific student using their _id.
Path Parameter:
id (string): The unique _id of the student you wish to update.
Request Body:
status (string): The new status for the student, which must be either "active", "graduated", or "dropped".
Response: Returns the updated student object in JSON format.

Delete a Student Record
Method: DELETE
Endpoint: /students/:id
Description: Deletes a student record from the database using their _id.
Path Parameter:
id (string): The unique _id of the student to be deleted.
Response: Returns the deleted student object in JSON format.

Step 4: API Testing Guidelines
Testing Tools: Utilize Postman to perform API requests against the defined endpoints.

This API setup provides the necessary endpoints to manage student records, allowing you to perform operations such as retrieving active students, adding new students, updating a student's status, and deleting student records.