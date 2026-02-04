from app.db.session import SessionLocal, engine
from app.models.user import User
from app.core.security import get_password_hash

def init_db():
    # ---------------------------------------------------------
    # 1. THIS IS THE MISSING LINE
    # It checks your User model and builds the table in Postgres
    # ---------------------------------------------------------
    User.metadata.create_all(bind=engine)

    db = SessionLocal()
    
    email = "admin@university.edu"
    password = "secret123"
    
    # 2. Now it is safe to query because the table exists
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        print(f"Creating user: {email}")
        user = User(
            email=email,
            hashed_password=get_password_hash(password),
            is_active=True,
            is_superuser=True,
        )
        db.add(user)
        db.commit()
        print("SUCCESS: User created!")
    else:
        print(f"User {email} already exists.")

if __name__ == "__main__":
    print("Creating initial data...")
    init_db()
    print("Initial data created.")
