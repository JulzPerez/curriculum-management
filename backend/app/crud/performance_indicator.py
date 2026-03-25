from sqlalchemy.orm import Session
from app.models.performance_indicator import PerformanceIndicator
from app.schemas.performance_indicator import (
    PerformanceIndicatorCreate,
    PerformanceIndicatorUpdate
)

def get_all(db: Session):
    return db.query(PerformanceIndicator).all()

def get_one(db: Session, id: int):
    return db.query(PerformanceIndicator).filter(PerformanceIndicator.id == id).first()

def create(db: Session, data: PerformanceIndicatorCreate):
    obj = PerformanceIndicator(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def update(db: Session, id: int, data: PerformanceIndicatorUpdate):
    obj = get_one(db, id)
    if not obj:
        return None

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(obj, key, value)

    db.commit()
    db.refresh(obj)
    return obj

def delete(db: Session, id: int):
    obj = get_one(db, id)
    if not obj:
        return None

    db.delete(obj)
    db.commit()
    return obj