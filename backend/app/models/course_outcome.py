from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base_class import Base

class CourseOutcome(Base):
    __tablename__ = "course_outcomes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    attribute: Mapped[str] = mapped_column(String)
    code: Mapped[str] = mapped_column(String, unique=True, index=True)
    student_outcome: Mapped[str] = mapped_column(Text)
