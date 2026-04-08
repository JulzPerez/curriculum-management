from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.course import Course as CourseModel

router = APIRouter()

# --- GET ALL ---
@router.get("/")
def read_courses(db: Session = Depends(get_db)):
    return db.query(CourseModel).all()

# --- CREATE ---
@router.post("/")
def create_course(course_in: dict, db: Session = Depends(get_db)):
    db_obj = CourseModel(**course_in)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

# --- UPDATE (Fixes the 404 for PUT) ---
@router.put("/{course_id}")
def update_course(course_id: int, course_in: dict, db: Session = Depends(get_db)):
    # We look for the course using 'id' from your database model
    course = db.query(CourseModel).filter(CourseModel.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    for key, value in course_in.items():
        setattr(course, key, value)
    
    db.commit()
    db.refresh(course)
    return course

# --- DELETE (Fixes the 404 for DELETE) ---
@router.delete("/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(CourseModel).filter(CourseModel.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    db.delete(course)
    db.commit()
    return {"message": "Successfully deleted"}