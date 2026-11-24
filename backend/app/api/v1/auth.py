from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from database import get_db
from models import User
from security import verify_password, get_password_hash, authenticate_user, create_access_token
from typing import Optional
import smtplib
from email.message import EmailMessage
import secrets
import string

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=dict)
async def register(
    email: str,
    password: str,
    termsAccepted: bool,
    ageConsent: bool,
    db: Session = Depends(get_db)
):
    """Register a new user."""
    from models import User
    
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Validate consent
    if not termsAccepted:
        raise HTTPException(status_code=400, detail="Please accept terms and conditions")
    
    if not ageConsent:
        raise HTTPException(status_code=400, detail="Age consent required")
    
    # Create new user
    hashed_password = get_password_hash(password)
    user = User(
        email=email,
        username=email.split("@")[0],
        hashed_password=hashed_password,
        is_active=False,  # Email not verified yet
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Send verification email
    # send_verification_email.delay(user.id, email)
    
    return {"message": "Registration successful. Please check your email for verification."}

@router.post("/login", response_model=dict)
async def login(
    request: Request,
    email: str,
    password: str,
    db: Session = Depends(get_db)
):
    """Login user and return JWT token."""
    user = authenticate_user(db, email, password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account not verified. Please check your email.")
    
    access_token = create_access_token(data={"sub": str(user.id)})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username,
        }
    }

@router.post("/logout")
async def logout(
    current_user: Depends = Depends(get_current_active_user),
):
    """Logout user (invalidate token)."""
    # In JWT, there's no server-side logout - client should discard the token
    # We can blacklist the token if needed
    return {"message": "Successfully logged out. Please close your browser."}

@router.post("/request-password-reset")
async def request_password_reset(
    email: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Request password reset link."""
    user = db.query(User).filter(User.email == email).first()
    if not user:
        # Don't reveal if email exists or not (security best practice)
        return {"message": "If an account with this email exists, a password reset link has been sent."}
    
    # Generate reset token
    reset_token = secrets.token_urlsafe(32)
    user.reset_token = reset_token
    user.reset_token_expires = datetime.utcnow() + timedelta(hours=1)
    db.commit()
    
    # Send reset email
    # send_password_reset_email.delay(user.id, email, reset_token)
    
    return {"message": "If an account with this email exists, a password reset link has been sent."}

@router.post("/reset-password/{token}")
async def reset_password(
    token: str,
    new_password: str,
    db: Session = Depends(get_db)
):
    """Reset password with reset token."""
    user = db.query(User).filter(User.reset_token == token).first()
    if not user or user.reset_token_expires < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    user.hashed_password = get_password_hash(new_password)
    user.reset_token = None
    user.reset_token_expires = None
    db.commit()
    
    return {"message": "Password has been reset successfully. You can now login with your new password."}