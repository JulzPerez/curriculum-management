from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 1. CRITICAL IMPORTS
from app.core.config import settings
from app.api.v1.endpoints import login, users, courses

# --- NEW: AUTOMATIC DATABASE CREATION ---
# This looks at your Python models and builds the Postgres tables!
from app.db.session import engine
from app.db.base_class import Base
from app.models.user import User      
from app.models.course import Course  

Base.metadata.create_all(bind=engine)
# ----------------------------------------

app = FastAPI(title=settings.PROJECT_NAME)

# 2. CORS SETUP
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. ROUTER REGISTRATION
app.include_router(
    login.router, 
    prefix=f"{settings.API_V1_STR}/login", 
    tags=["login"]
)

app.include_router(
    users.router, 
    prefix=f"{settings.API_V1_STR}/users", 
    tags=["users"]
)

app.include_router(
    courses.router, 
    prefix=f"{settings.API_V1_STR}/courses", 
    tags=["courses"]
)

# 4. HEALTH CHECK
@app.get("/")
def root():
    return {"message": "System is running"}