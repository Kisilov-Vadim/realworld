# Project Setup Guide

Welcome to my implementation of the RealWorld application! Follow the steps below to get started and set up both the server and client parts of the application.

## 1. Clone the Project

To get started, begin by cloning this repository to your local machine.

```bash
git clone https://github.com/Kisilov-Vadim/realworld.git
cd realworld
```

## 2. Set Up the Server

### 2.1 Install Dependencies

Navigate to the server directory and install the required dependencies.

```bash
npm install
```

### 2.2 Run Migrations

Now that the server is set up, you need to run the database migrations. This will set up your database schema according to the defined migrations.

```bash
npm run migrate:develop
```

**Explanation:**
This command runs the migration script for the development environment. It will create or update the necessary tables and schema in the database (in this case, a local SQLite file) to match the structure defined in your migration files. Running migrations ensures your database is up-to-date with the latest application changes.

### 2.3 Start the Development Server

Finally, start the server in development mode by running:

```bash
npm run develop
```

This will start the server, and it will now be running in the development environment. You can access your server with `http://localhost:3000`.

---

## 3. Set Up the Client

Now, let's set up the client side of the project.

### 3.1 Navigate to the Root of the Project

Open a new terminal tab or window, and go to the root directory of the project (where the `package.json` file is located).

### 3.2 Install Client Dependencies

Run the following command to install the necessary client dependencies:

```bash
npm install
```

### 3.3 Open Ios Simulator

### 3.4 Start the Client

Finally, start the client application:

```bash
npm start
```

---

You're all set! Happy coding! 🎉
