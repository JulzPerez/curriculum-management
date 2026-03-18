from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.indicator import Indicator

router = APIRouter()


@router.get("/")
def get_indicators(db: Session = Depends(get_db)):
    return db.query(Indicator).all()


@router.post("/")
def create_indicator(data: dict, db: Session = Depends(get_db)):
    new_item = Indicator(**data)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


@router.put("/{id}")
def update_indicator(id: int, data: dict, db: Session = Depends(get_db)):
    item = db.query(Indicator).filter(Indicator.id == id).first()

    if not item:
        return {"error": "Not found"}

    for key, value in data.items():
        setattr(item, key, value)

    db.commit()
    return item


@router.delete("/{id}")
def delete_indicator(id: int, db: Session = Depends(get_db)):
    item = db.query(Indicator).filter(Indicator.id == id).first()

    if not item:
        return {"error": "Not found"}

    db.delete(item)
    db.commit()
    return {"message": "Deleted"}