# CRUD-BookApp
## User Story:

**Responsive CRUD Application with Token Management, Built in Angular 18 and .NET 8 C# API**
 The goal is to create a responsive CRUD web application with Angular 18 for the front-end and .NET 8 C# for the back-end API. Additionally, you must implement token management for user authentication, use Bootstrap and Font Awesome icons for styling, and add a "My Quotes" page where users can add and view their favorite quotes.

**Requirements:**

- Implement a web application with a page that displays a list of all books.
- Create a homepage with a button to add a new book.
- Clicking the "Add New Book" button should redirect the user to a form where they can enter information about a new book (e.g., title, author, publication date).
- After submitting the form, the user should be redirected back to the homepage, where they can see the newly added book in the list.
- Each book in the list should have an "Edit" button that takes the user to a form where they can edit the book's details.
- After submitting the form, the user should be redirected back to the homepage, where they can see the updated book details in the list.
- Each book in the list should have a "Delete" button that allows the user to remove the book.
- After deleting a book, the user should see the book removed from the list.

**Token Management:**

- Implement user authentication with JWT (JSON Web Tokens).
- Create a simple login page where users can enter their credentials (e.g., username and password).
- After a successful login, the back-end should generate a token and send it back to the front-end.
- The front-end should securely store the token (e.g., in local storage or a cookie) and use it for subsequent API requests to the back-end.
- Implement token validation on the back-end to ensure that only authenticated users can access CRUD operations.

**My Quotes Page:**

- Create a separate view called "My Quotes."
- Display a list of 5 quotes you like.
- There should be a menu to switch between the book view and the quotes view.

**Responsive Design Testing:**

- Ensure that the application’s layout and components adjust smoothly to different screen sizes, including desktops, tablets, and mobile devices.
- Test the application by resizing the browser window and verify that all elements adjust properly.
- Check that navigation menus collapse into a responsive mobile menu on smaller screens.
- Verify that form fields, buttons, and other UI elements maintain correct spacing and alignment across different viewports.
- Test the application on different devices (e.g., smartphones, tablets) and browsers to ensure consistent behavior.

**Bootstrap and Font Awesome:**

- Use Bootstrap to create a responsive and visually appealing layout for the application.
- Use Bootstrap classes to style buttons, forms, and other UI components.
- Include Font Awesome icons to enhance the program’s visual elements.
- Verify that Font Awesome icons are displayed correctly and used appropriately throughout the application.

**Additional Challenge:**

- Implement a button that allows the user to toggle between a light and dark UX design for the application.
** Features
- Book Management: CRUD functionality to add, view, update, and delete books.
- Authentication: Secure login functionality (JWT-based authentication).
- Database: Uses Microsoft SQL Server, hosted on Azure, for persistent data storage.
- API: Exposes a RESTful API for interacting with book data.
**Technologies Used:
 - Frontend: HTML, CSS, JavaScript  Angular 18.
 - Backend: ASP.NET Core (Web API).
 - Database: Microsoft SQL Server (hosted on Azure).
 - Authentication: JWT (JSON Web Token) for user authentication.
 - Deployment: Microsoft Azure (App Service, SQL Database, and App Services for deployment).

  ## Running Locally

### Prerequisites

- **.NET Core SDK** (8.0 or higher)
- **Azure Account** (optional for deployment)
- **GitHub Account**

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/IvyAnalisa/CRUD-BookApp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd CRUD-BookApp
   ```
3. Restore dependencies:
   ```bash
   dotnet restore
   ```
4. Build the project:
   ```bash
   dotnet build
   ```
5. Run the application:
   ```bash
   dotnet run
   ```

The API will be available locally at `https://localhost:7149` for Backen Server, `https://localhost:60529` for Client.

## Deployment
### 1. **Preparing the Azure Environment**

- **Azure App Service**: Created using Azure Portal.
- **Region & Pricing Plan**: Selected a student-supported plan.
- **SCM Configuration**: Enabled in App Service to allow deployment from GitHub.

### 2. **CI/CD Setup**

- Configured **GitHub Actions** for Continuous Integration/Continuous Deployment (CI/CD).
- Steps include building the project with `.NET Core`, publishing artifacts, and deploying to **Azure Web App** using the `azure/webapps-deploy` GitHub action.

### 3. **Application Insights**

- **Application Insights** has been enabled for monitoring application performance.
- Allows real-time tracking of response times, requests, and errors.
- Traffic simulation was done to test performance.

### 4. **Deployment Instructions**

1. **Build Process**: The project is automatically built and deployed on every push to the `master` branch via GitHub Actions.
2. **Deployment Slot**: The app is deployed to the production slot of Azure App Service.
3. **Live URL**: The web API is available at `https://book-web-api-bbemd6c3hghyg4a7.northeurope-01.azurewebsites.net`.

### 5. **Monitoring**

- Application Insights captures logs and performance metrics.
- Real-time metrics like CPU usage, memory, and request rates can be monitored.

