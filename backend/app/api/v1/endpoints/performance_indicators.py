from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.performance_indicator import PerformanceIndicator
from app.schemas.performance_indicator import (
    PerformanceIndicatorCreate,
    PerformanceIndicatorUpdate,
    PerformanceIndicatorOut,
)

router = APIRouter()

@router.get("/", response_model=list[PerformanceIndicatorOut])
def read_all(db: Session = Depends(get_db)):
    return db.query(PerformanceIndicator).all()

@router.get("/{id}", response_model=PerformanceIndicatorOut)
def read_one(id: int, db: Session = Depends(get_db)):
    obj = db.query(PerformanceIndicator).filter(PerformanceIndicator.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Performance indicator not found")
    return obj

@router.post("/", response_model=PerformanceIndicatorOut)
def create_item(data: PerformanceIndicatorCreate, db: Session = Depends(get_db)):
    obj = PerformanceIndicator(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.put("/{id}", response_model=PerformanceIndicatorOut)
def update_item(id: int, data: PerformanceIndicatorUpdate, db: Session = Depends(get_db)):
    obj = db.query(PerformanceIndicator).filter(PerformanceIndicator.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Performance indicator not found")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(obj, key, value)

    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{id}")
def delete_item(id: int, db: Session = Depends(get_db)):
    obj = db.query(PerformanceIndicator).filter(PerformanceIndicator.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Performance indicator not found")

    db.delete(obj)
    db.commit()
    return {"message": "Deleted successfully"}