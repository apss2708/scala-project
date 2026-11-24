from sqlalchemy.orm import Session
from models import User


class UserRepository:
    """Repository for User model operations."""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get(self, user_id: int) -> User | None:
        """Get user by ID."""
        return self.db.query(User).filter(User.id == user_id).first()
    
    def get_by_email(self, email: str) -> User | None:
        """Get user by email."""
        return self.db.query(User).filter(User.email == email).first()
    
    def create(self, email: str, username: str, password: str) -> User:
        """Create a new user."""
        from security import get_password_hash
        user = User(
            email=email,
            username=username,
            hashed_password=get_password_hash(password),
            is_active=False,  # Email verification required
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user
    
    def update(self, user_id: int, **kwargs) -> User | None:
        """Update user."""
        user = self.get(user_id)
        if not user:
            return None
        for key, value in kwargs.items():
            setattr(user, key, value)
        self.db.commit()
        self.db.refresh(user)
        return user
    
    def request_data_deletion(self, user_id: int) -> dict:
        """Process a data deletion request (GDPR)."""
        user = self.get(user_id)
        if not user:
            return {"status": "error", "detail": "User not found"}
        
        # Anonymize personal data
        user.email = "deleted-user"
        user.username = "deleted"
        user.hashed_password = ""
        user.is_active = False
        self.db.commit()
        
        return {"status": "success", "detail": "Data deletion request processed"}