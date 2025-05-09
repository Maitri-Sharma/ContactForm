# ContactForm
Save Contact info

A simple web application that allows users to submit their name, phone number, and email address via a form. The frontend is built using React, the backend is powered by .NET, and PostgreSQL is used for data storage. Docker is used to containerize the services.

Structure of the Application
ContactForm/
│
├── contactSubmissionApp/          # React frontend app
│   ├── src/
│   ├── public/
│   └── Dockerfile                 # Dockerfile for React
│
├── contactSubmissionAPI/          # .NET backend API
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   ├── appsettings.json           # Configuration file
│   ├── Dockerfile                 # Dockerfile for .NET API
│   └── Startup.cs                 # Configuration for services
│
├── docker-compose.yml             # Docker Compose file to run all services
└── .dockerignore                  # Docker ignore file to exclude unnecessary files


## Features

- **Frontend (React)**: Simple form UI to collect user data (name, phone number, email).
- **Backend (.NET Core)**: API to handle the form submissions and interact with PostgreSQL.
- **Database (PostgreSQL)**: Stores user data in a PostgreSQL database.
- **Docker**: Containerized the frontend, backend, and database for easy deployment.

## Prerequisites

Before running the application, ensure you have the following installed:

- Docker (for containerization)
- .NET SDK (for backend development, if you want to modify the backend)
- Node.js and npm (for React development)

You can check if these are installed by running:

```bash
docker --version
dotnet --version 5.0
node --version 22.15.0
npm --version 10.9.2