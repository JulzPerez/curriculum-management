from pydantic import BaseModel

class CourseOutcomeBase(BaseModel):
    code: str
    description: str

class CourseOutcomeCreate(CourseOutcomeBase):
    pass

class CourseOutcomeUpdate(CourseOutcomeBase):
    pass

class CourseOutcomeOut(CourseOutcomeBase):
    id: int

    class Config:
        from_attributes = True
