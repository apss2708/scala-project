from sqlalchemy.orm import Session
from models import Case


class CaseRepository:
    """Repository for Case model operations."""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get(self, case_id: int) -> Case | None:
        """Get a case by ID."""
        return self.db.query(Case).filter(Case.id == case_id).first()
    
    def create(self, name: str, description: str = "", investigator_id: int | None = None) -> Case:
        """Create a new case."""
        from datetime import datetime
        from models import Case
        
        case = Case(
            name=name,
            description=description,
            investigator_id=investigator_id,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        self.db.add(case)
        self.db.commit()
        self.db.refresh(case)
        return case
    
    def get_by_user(self, user_id: int) -> list[Case]:
        """Get all cases for a user."""
        return self.db.query(Case).filter(Case.investigator_id == user_id).all()