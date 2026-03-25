from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PerformanceIndicatorBase(BaseModel):
    indicator_code: str
    indicator_name: str
    description: Optional[str] = None
    target_value: Optional[float] = None
    current_value: Optional[float] = None

class PerformanceIndicatorCreate(PerformanceIndicatorBase):
    pass

class PerformanceIndicatorUpdate(BaseModel):
    indicator_code: Optional[str] = None
    indicator_name: Optional[str] = None
    description: Optional[str] = None
    target_value: Optional[float] = None
    current_value: Optional[float] = None

class PerformanceIndicatorOut(PerformanceIndicatorBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True