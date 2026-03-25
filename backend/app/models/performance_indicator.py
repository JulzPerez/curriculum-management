from sqlalchemy import Column, Integer, String, Text, Numeric, DateTime
from sqlalchemy.sql import func
from app.db.base_class import Base

class PerformanceIndicator(Base):
    __tablename__ = "performance_indicators"

    id = Column(Integer, primary_key=True, index=True)
    indicator_code = Column(String(50), unique=True, nullable=False)
    indicator_name = Column(String(255), nullable=False)
    description = Column(Text)
    target_value = Column(Numeric(10, 2))
    current_value = Column(Numeric(10, 2))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())