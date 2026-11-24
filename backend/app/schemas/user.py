from datetime import datetime


class UserCreate:
    """Schema for creating a user."""
    def __init__(self, email: str, password: str, username: str | None = None):
        self.email = email
        self.password = password
        self.username = username or email.split("@")[0]


class UserUpdate:
    """Schema for updating a user."""
    def __init__(self, email: str | None = None, password: str | None = None, is_active: bool | None = None):
        self.email = email
        self.password = password
        self.is_active = is_active


class UserResponse:
    """Schema for user API response."""
    def __init__(self, id: int, email: str, username: str, is_active: bool, 
                 created_at: datetime):
        self.id = id
        self.email = email
        self.username = username
        self.is_active = is_active
        self.created_at = created_at