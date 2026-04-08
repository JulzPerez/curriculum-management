from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.course_outcome import CourseOutcome
from app.schemas.course_outcome import CourseOutcomeCreate, CourseOutcomeUpdate, CourseOutcomeOut

router = APIRouter()

@router.get("/", response_model=list[CourseOutcomeOut])
def get_all(db: Session = Depends(get_db)):
    return db.query(CourseOutcome).order_by(CourseOutcome.code).all()

@router.post("/", response_model=CourseOutcomeOut)
def create(payload: CourseOutcomeCreate, db: Session = Depends(get_db)):
    obj = CourseOutcome(**payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.put("/{id}", response_model=CourseOutcomeOut)
def update(id: int, payload: CourseOutcomeUpdate, db: Session = Depends(get_db)):
    obj = db.query(CourseOutcome).filter(CourseOutcome.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Course outcome not found")
    for key, value in payload.model_dump().items():
        setattr(obj, key, value)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{id}")
def delete(id: int, db: Session = Depends(get_db)):
    obj = db.query(CourseOutcome).filter(CourseOutcome.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Course outcome not found")
    db.delete(obj)
    db.commit()
    return {"message": "Deleted"}
