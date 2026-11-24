from datetime import datetime
from . import Base


class Case(Base):
    """Investigation case model."""
    __tablename__ = "cases"
    
    id: int
    name: str
    description: str = ""
    status: str = "active"
    investigator_id: int | None = None
    created_at: datetime
    updated_at: datetime
    
    # Relationships
    evidence: list["Evidence"] = []