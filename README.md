1. Project Setup
   Initialize a new Next.js project using the boilerplate template.
   Include TypeScript setup.
   Set up the app directory for routing.
   Add and configure dependencies:
   Prisma, PostgreSQL, and ShadCN UI.
   Authentication library (e.g., NextAuth or another secure option).
   Utility libraries (e.g., Zod for validation, bcrypt for password hashing).
   Set up .env for environment variables:
   Database URL for PostgreSQL.
   Secret keys for authentication.

2. Database and Prisma Configuration
   Initialize Prisma in the project:
   Create the prisma/schema.prisma file.
   Configure the PostgreSQL database connection.
   Design and define the Prisma schema:
   User Model: Include fields like id, name, email, password, role (enum: ADMIN, EMPLOYEE), etc.
   LeaveRequest Model: Include fields like id, userId, status (enum: PENDING, APPROVED, DECLINED), startDate, endDate, etc.
   Run the initial Prisma migration to create tables in the database.
   Seed the database with:
   One admin user.
   Sample employees.

3. Authentication and Authorization
   Implement login and logout functionality:
   Create a custom authentication API using JWT or integrate NextAuth.
   Use bcrypt to hash passwords and verify during login.
   Set up a session management system.
   Implement role-based access control:
   Middleware to restrict routes or API endpoints based on the user role.

4. Admin Capabilities
   Create and Delete Employees:
   Build API routes for:
   Creating new employees (with validations for email uniqueness, etc.).
   Deleting employees by id.
   Write Prisma queries for these actions.
   Search and View Employee Details:
   Build API routes for searching employees by name, email, or ID.
   Create an endpoint to fetch employee details by id.
   Accept/Decline Leave Requests:
   Build API routes for:
   Fetching pending leave requests.
   Approving or declining requests.
   Write Prisma queries to update leave request statuses.

5. Employee Capabilities
   Submit Leave Requests:
   Build an API route for employees to submit leave requests.
   Validate date ranges and prevent overlapping requests.
   View Leave Request Status:
   Build an API route to fetch leave request statuses for the logged-in employee.

6. Frontend UI Implementation (ShadCN UI)
   Create reusable components for:
   Form Inputs: Input fields, text areas, date pickers.
   Buttons: Configurable for different actions (e.g., primary, secondary).
   Alerts and Modals: For confirming actions or displaying messages.
   Admin Dashboard:
   Employee management (list, create, delete).
   Leave requests (list pending, approve, decline).
   Employee Dashboard:
   Submit leave requests.
   View request statuses.

7. API Design and Documentation
   Document each API route using a clear format:
   Endpoint URL, method, required parameters, and example responses.
   Set up validation for incoming API requests using Zod or a similar library.

8. Debugging and Testing
   Write unit tests for API routes and Prisma queries.
   Test authentication and role-based access control.
   Use a tool like Postman to test API functionality.

9. Deployment and Optimization
   Optimize Prisma queries for performance (e.g., indexing fields in PostgreSQL).
   Set up CI/CD pipelines for deployment.
   Deploy the app to a hosting provider like Vercel and the database to a managed PostgreSQL service.
