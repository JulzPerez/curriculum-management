from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 1. CRITICAL IMPORTS
# These were missing or broken in previous versions
from app.core.config import settings
from app.api.v1.endpoints import login, users

app = FastAPI(title=settings.PROJECT_NAME)

# 2. CORS SETUP
# Allows your Frontend (port 3000) to talk to Backend (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. ROUTER REGISTRATION
# This creates the endpoint: /api/v1/login/access-token
app.include_router(
    login.router, 
    prefix=f"{settings.API_V1_STR}/login", 
    tags=["login"]
)

# This creates the endpoint: /api/v1/users/me
app.include_router(
    users.router, 
    prefix=f"{settings.API_V1_STR}/users", 
    tags=["users"]
)

# 4. HEALTH CHECK
@app.get("/")
def root():
    return {"message": "System is running"}
