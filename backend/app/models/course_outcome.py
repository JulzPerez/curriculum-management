from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base_class import Base

class CourseOutcome(Base):
    __tablename__ = "course_outcomes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    code: Mapped[str] = mapped_column(String, unique=True, index=True)
    description: Mapped[str] = mapped_column(Text)
