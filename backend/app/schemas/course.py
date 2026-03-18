from typing import Optional
from pydantic import BaseModel

# Shared properties
class CourseBase(BaseModel):
    course_code: str
    title: str
    lec_hours: int = 0
    lab_hours: int = 0
    units: int
    prerequisite: Optional[str] = None

# Properties to receive via API on creation (Same as base for now)
class CourseCreate(CourseBase):
    pass

# Properties to return via API
class Course(CourseBase):
    id: int

    class Config:
        from_attributes = True  # Allows Pydantic to read from the SQLAlchemy ORM