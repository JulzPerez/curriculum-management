from app.db.session import engine
from app.db.base_class import Base
from app.models.indicator import Indicator

Base.metadata.create_all(bind=engine)

print("Indicators table created successfully.")