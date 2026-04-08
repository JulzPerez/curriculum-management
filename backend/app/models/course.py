from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base_class import Base

class Course(Base):
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    course_code: Mapped[str] = mapped_column(String, unique=True, index=True)
    title: Mapped[str] = mapped_column(String)
    lec_hours: Mapped[int] = mapped_column(Integer, default=0)
    lab_hours: Mapped[int] = mapped_column(Integer, default=0)
    units: Mapped[int] = mapped_column(Integer)
    
    # Using Optional/Nullable string for subjects with no prerequisite
    prerequisite: Mapped[str | None] = mapped_column(String, nullable=True)