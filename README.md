UniversityA - Administrative Painel
Introduction
Welcome to the administrative panel of UniversityA! This project utilizes NestJS, Prisma, and Docker Compose to create a robust and scalable application. NestJS provides a powerful framework for building server-side applications, Prisma serves as an efficient database toolkit, and Docker Compose simplifies the deployment process by containerizing the application and its dependencies.

Prerequisites
Before getting started, make sure you have the following installed:

Node.js
Docker
Docker Compose
Getting Started
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/diegopires1992/UniversityA
cd UniversityA
npm install
Configuration
Describe any configuration steps if needed.

Usage
Describe how to use the application and provide any specific details or considerations.

Docker Compose
To run the application using Docker Compose:

Build the Docker images:

bash
Copy code
docker-compose build
Start the containers:

bash
Copy code
docker-compose up
To generate a database migration, run the command:

bash
Copy code
npx prisma migrate dev --name add_profile
After installation, run the command:

bash
Copy code
npm run start:dev
Contributing
If you'd like to contribute to this project, please follow the guidelines in CONTRIBUTING.md.

License
This project is licensed under the LICENSE - describe your license here.

This structure provides a clear and organized guide for users to understand, install, and use your UniversityA administrative panel. Feel free to customize it further based on your specific project details and preferences.