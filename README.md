# Curriculum Management System

## Prerequisites
Before you start, ensure you have the following installed:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [Python 3.10+](https://www.python.org/downloads/)
* [Node.js 18+](https://nodejs.org/)
* [VS Code](https://code.visualstudio.com/)

---

## 1. Quick Start (Database)
We use Docker to run the database so you don't need to install Postgres manually.

1.  Open a terminal in the project root.
2.  Start the database:
    ```bash
    docker-compose up -d
    ```
    *(This starts PostgreSQL on port 5432 with user 'admin' and password 'password')*

## 2. Backend Setup (FastAPI)
1.  Navigate to the backend:
    ```bash
    cd backend
    ```
2.  Create your environment file:
    ```bash
    cp .env.example .env
    ```
3.  Create a virtual environment and install dependencies:
    ```bash
    python -m venv venv
    
    # Windows
    .\venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    
    pip install -r requirements.txt
    ```
4.  Run the server:
    ```bash
    uvicorn app.main:app --reload
    ```
    *API is now running at: http://localhost:8000*

## 3. Frontend Setup (Next.js)
1.  Open a **new terminal** and navigate to the frontend:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    *UI is now running at: http://localhost:3000*

## Login Credentials
* **Admin:** `admin@university.edu` / `admin`
