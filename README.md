# Todo Subtodo API

This is a RESTful API for managing Todo items and their corresponding subtasks. It allows you to perform CRUD operations on both Todo and Subtodo entities.

## Features
- Create, update, and delete Todo items
- Create, update, and delete Subtodo items
- Mark Todos and Subtodos as completed
- Retrieve all Todos and their subtasks

## Requirements
- Node.js >= 14.x.x
- MongoDB (Local or Atlas)

## Setup

1. Clone this repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>

2. Install dependencies:
   ```bash
   npm init
   npm install express mongoose dotenv
   npm install --save-dev nodemon
   ```

3. Make the following changes in package.json:
   ```json 
       "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
   ```

4. Create a .env file and add the following line:
``` 
 MONGO_URI=<your_mongodb_connection_string>
``` 

5. Start the project:
   ```bash
   npm run dev
   ```