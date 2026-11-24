import os
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, Request
from sqlalchemy.orm import Session
from database import get_db
from models import User


# Password hashing
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash a password."""
    return pwd_context.hash(password)


def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """Authenticate a user."""
    from models import User
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def create_access_token(
    data: dict,
    expires_delta: Optional[timedelta] = None,
) -> str:
    """Create a JWT access token."""
    from datetime import datetime
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=1)
    
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    encoded_jwt = jwt.encode(to_encode, os.getenv("SECRET_KEY", "secret"), algorithm="HS256")
    return encoded_jwt


def decode_token(token: str) -> dict:
    """Decode and verify JWT token."""
    try:
        payload = jwt.decode(token, os.getenv("SECRET_KEY", "secret"), algorithms=["HS256"])
        return payload
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {e}")


def get_current_user_from_token(
    token: str,
    db: Session,
) -> User:
    """Get current user from JWT token."""
    payload = decode_token(token)
    user_id: str = payload.get("sub")
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid authentication payload")
    
    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="User account is disabled")
    
    return user


# Role-based access dependency
def get_current_active_user(db: Session = Depends(get_db)) -> User:
    """FastAPI dependency to get current active user."""
    raise HTTPException(status_code=401, detail="Authentication required")


# Rate limiting helper
class RateLimiter:
    """Simple rate limiter for API endpoints."""
    
    def __init__(self, calls: int, period: int = 60):
        self.calls = calls
        self.period = period
        self.calls_made = []
    
    async def __call__(self):
        now = datetime.utcnow()
        # Remove calls outside the period
        self.calls_made = [call for call in self.calls_made if now - call < timedelta(seconds=self.period)]
        
        if len(self.calls_made) >= self.calls:
            raise HTTPException(status_code=429, detail="Rate limit exceeded")
        
        self.calls_made.append(now)


# Database backup helper
def backup_database(db: Session, backup_path: str = "backup_nexus.sql"):
    """Create a database backup."""
    import subprocess
    try:
        # For SQLite
        result = subprocess.run(
            ["sqlite3", db.bind.url.database, ".dump"],
            capture_output=True,
            text=True
        )
        with open(backup_path, "w") as f:
            f.write(result.stdout)
    except Exception as e:
        print(f"Backup failed: {e}")