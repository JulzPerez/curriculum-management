from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# 1. Create the Database Engine
# pool_pre_ping=True helps prevent "connection lost" errors
engine = create_engine(settings.SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)

# 2. Create the Session Factory (SessionLocal)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

