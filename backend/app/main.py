from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.v1.endpoints import login, users, performance_indicators, courses

from app.db.session import engine
from app.db.base_class import Base
from app.models.user import User
from app.models.course import Course

Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://cms.jeppy.online"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    performance_indicators.router,
    prefix=f"{settings.API_V1_STR}/performance-indicators",
    tags=["Performance Indicators"]
)

app.include_router(
    courses.router,
    prefix=f"{settings.API_V1_STR}/courses",
    tags=["courses"]
)

@app.get("/")
def root():
    return {"message": "System is running"}
