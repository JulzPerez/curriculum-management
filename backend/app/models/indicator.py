from sqlalchemy import Column, Integer, String, Float
from app.db.base_class import Base

class Indicator(Base):
    __tablename__ = "indicators"

    id = Column(Integer, primary_key=True, index=True)
    indicator_code = Column(String, unique=True)
    indicator_name = Column(String)
    description = Column(String)
    target_value = Column(Float)
    current_value = Column(Float)