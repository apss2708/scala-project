from datetime import datetime
from . import Base


class User(Base):
    """User model for authentication."""
    __tablename__ = "users"
    
    id: int
    email: str
    username: str
    hashed_password: str
    is_active: bool = True
    is_superuser: bool = False
    created_at: datetime
    
    # Relationships
    cases: list["Case"] = []
    evidence: list["Evidence"] = []