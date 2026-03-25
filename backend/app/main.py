from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.v1.endpoints import login, users, performance_indicators

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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

@app.get("/")
def root():
    return {"message": "System is running"}