# DCS Research Repository System

A full-stack web application for managing research records (capstone/thesis/projects), including PDF uploads, status tracking, and search functionality.
## Tech Stack
### Frontend
React (Vite or CRA)
Tailwind CSS
### Backend
Node.js
Express.js
MySQL (mysql2)
### Features
Create / Read / Update / Delete (CRUD)
PDF file upload
Search filtering
Status tracking (MOR / Part A / Part B / Finished)
Abstract preview modal
Delete confirmation modal

## Project Structure
```
dcs-research-tracker/
│
├── research-client/    
│   ├── src/
│   └── package.json
│
├── research-server/       
│   ├── uploads/            
│   ├── server.js
│   └── package.json
│
└── README.md
```
## Installation

### ⚙️ 1. Backend Setup (Node + Express)

📌 Install dependencies
```bash
cd research-server
npm install
```
📌 Install required packages
```bash
npm install express cors mysql2 multer dotenv
```
📌 Create MySQL Database

```bash
CREATE DATABASE dcs_research;

USE dcs_research;

CREATE TABLE research (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  authors TEXT NOT NULL,
  abstract TEXT NOT NULL,
  pdf_url VARCHAR(500),
  adviser VARCHAR(255) NOT NULL,
  critic VARCHAR(255) NOT NULL,
  status ENUM('MOR', 'Part A', 'Part B', 'Finished') DEFAULT 'MOR',
  website_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
📌 Configure Database Connection

Edit server.js:
```bash
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",
  database: "dcs_research",
});
```
📌 Run Backend

```bash
node server.js
```

🎯 2. Frontend Setup (React)
📌 Install dependencies

```bash
cd research-client
npm install
```

📌 Run frontend

```bash
npm run dev
```

📤 3. File Upload System (IMPORTANT)

This project uses local uploads:
```bash
/uploads
```
🔌 4. Backend API Endpoints
📌 Create Research

```bash
POST /api/research
```
📌 Get All Research
```bash
GET /api/research
```
📌 Update Research
```bash
PUT /api/research/:id
```
📌 Delete Research
```bash
DELETE /api/research/:id
```

🚀 Running the Full System
Step 1: Start MySQL

Make sure MySQL is running

Step 2: Start backend

```bash
cd research-server
node server.js
```
Step 3: Start frontend

```bash
cd research-client
npm run dev
```

👨‍💻 Author: Edan A. Belgica

Developed for DCS Research Repository System
For academic use.
