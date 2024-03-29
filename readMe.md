# AgileHub Project Management Backend 

This is a backend project for a Jira-like application, focusing on organization and project management features.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- bcrypt

## API Endpoints

## User Management
- POST /api/v1/users/register: Allows users to register for an account.
- POST /api/v1/users/login: Allows users to log in to their account.
- PUT /api/v1/users/updatePassword: Allows users to update their password.
- PATCH /api/v1/users/updateUser: Allows users to update their other information.
- POST /api/v1/users/deleteUser: Allows users to delete their account.

## Organization
- POST /api/v1/orgnization/createInstance: Allows registered users to create an organization instance.
- GET /api/v1/orgnization/getOrgnization/:id: Allows registered users to get organization instances by id.

## Project Management
- POST /:siteName/projects/createNewProject: Allows users to create a new project in a specific organization instance.
- GET /:siteName/projects/getAllProject: Retrieves a list of all projects in a specific organization instance.
- GET /:siteName/projects/getSingleProject/:id: Retrieves a single project by ID in a specific organization instance.
- PATCH /:siteName/projects/updateProject/:id: Allows users to update an existing project.
- DELETE /:siteName/projects/deleteProject/:id: Allows users to delete a project.

## Usage
Ensure you have MongoDB installed and running.
Use a tool like Postman to send requests to the API endpoints.

