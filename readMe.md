# Jira Backend Project

This is a backend project for a Jira-like application, focusing on organization and project management features.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication

## API Endpoints

- User Management:
POST-Register User: /api/v1/users/register - Allows users to register for an account.
POST-Login: /api/v1/users/login - Allows users to log in to their account.
PUT-Update Password: /api/v1/users/updatePassword - Allows users to update their password.
PATCH-Update User Information: /api/v1/users/updateUser - Allows users to update their other information.
POST-delete User : /api/v1/users/deleteUser - Allows users to delete their account.
/not done yet
Logout: /api/logout - Allows users to log out of their account.
Profile: /api/profile - Allows users to view and update their profile information.

- Organization:
POST-Create Organization Instance: /api/v1/orgnization/createInstance - Allows registered users to create an organization Instance.
GET-Get Organization: /api/v1/orgnization/getOrgnization - Allows registered users to get organization Instance.

- Project Management:
POST-Create Project: /:siteName/projects/createNewProject - Allows users to create a new project.
GET-Get All Projects: /:siteName/projects/getAllProject - Retrieves a list of all projects in organization instance.
GET-Get Single Project: /:siteName/projects/getSingleProject/:id - Retrieves single project by id in organization instance
/not done yet
Update Project: /api/projects/:id - Allows users to update an existing project.
Delete Project: /api/projects/:id - Allows users to delete a project.

