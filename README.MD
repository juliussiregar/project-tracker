# Project Tracker

Project Tracker is a simple application for tracking projects and associated tasks using Node.js, Express, and Prisma on the backend, with HTML, Tailwind CSS, and JavaScript on the frontend. 
This project is a task assigned by the company APTAVIS.

## Features
- **Add Project**: Add a new project to the list.
- **Add Task**: Add new tasks to an existing project.
- **Edit Task**: Edit task name, status, and weight.
- **Delete Task**: Remove tasks from a project.
- **Manage Project Progress**: Project progress is calculated based on the weight of completed tasks.

## Requirements
- Node.js (latest version recommended)
- NPM (included with Node.js installation)
- Live Server to view the frontend

## Usage

1. **Clone the Repository**

   ```bash
   git clone https://github.com/username/project-tracker.git
   cd project-tracker
   - DATABASE_URL="mysql://root:<password>@localhost:3306/project-tracker" for .env

2. **Install Dependencies**

     - In the root directory  
     ```bash
     npm install

     - In the root directory  
     ```bash
     cd backend
     npm install
 
3. **Run the Backend**

    - In the ./backend directory, run the following command:
     ```bash
     npm run dev

    - The backend will run at http://localhost:3000.

4. **Run the Frontend**

    - Open the project in the root directory (./project-tracker), then open the index.html file using Live Server. Live Server will launch the frontend in your browser.

## Project Structure

    - backend: Contains the backend code using Node.js, Express, and Prisma.
    - public: Contains HTML, CSS, and JavaScript files for the frontend.
    - index.html: The main page of the application that interacts with the backend to manage projects and tasks.

## Development
if you want to further develop the project:

- Adding New Dependencies: Remember to run npm install after adding new dependencies to the package.json.
- Running Tests: You can add and run tests to ensure all features are functioning properly.

## Notes

- Ensure Prisma is correctly configured in the backend directory if you are using a different database.
- You can customize Live Server settings as needed, such as changing the port or enabling live reload.


## License

This project is licensed under Julius Siregar. See the LICENSE file for more details.


