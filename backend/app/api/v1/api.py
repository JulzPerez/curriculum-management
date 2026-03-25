from fastapi import APIRouter
from app.api.v1.endpoints.login import router as login_router

api_router = APIRouter()

api_router.include_router(login_router, tags=["login"])