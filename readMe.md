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
Register User: /api/v1/users/register - Allows users to register for an account.
Login: /api/v1/users/login - Allows users to log in to their account.
Update Password: /api/v1/users/updatePassword - Allows users to update their password.
Update User Information: /api/v1/users/updateUser - Allows users to update their other information.
delete User : /api/v1/users/deleteUser - Allows users to delete their account.
/not done yet
Logout: /api/logout - Allows users to log out of their account.
Profile: /api/profile - Allows users to view and update their profile information.

- Organization:
Create Organization Instance: /api/v1/orgnization/createInstance - Allows registered users to create an organization Instance.
Get Organization: /api/v1/orgnization/getOrgnization - Allows registered users to get organization Instance.

- Project Management:
Create Project: /:siteName/createNewProject - Allows users to create a new project.
Get All Projects: /:siteName/getAllProject - Retrieves a list of all projects of users organization instance.
/not done yet
Update Project: /api/projects/:id - Allows users to update an existing project.
Delete Project: /api/projects/:id - Allows users to delete a project.

