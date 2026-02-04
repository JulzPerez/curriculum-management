# Import the Base from the new file
from app.db.base_class import Base

# Import all models here (so Alembic can see them)
from app.models.user import User
