from sqlalchemy.orm import Session
from models import Evidence
from datetime import datetime


class EvidenceRepository:
    """Repository for Evidence model operations."""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get(self, evidence_id: int) -> Evidence | None:
        """Get evidence by ID."""
        return self.db.query(Evidence).filter(Evidence.id == evidence_id).first()
    
    def get_by_case(self, case_id: int) -> list[Evidence]:
        """Get all evidence for a case."""
        return self.db.query(Evidence).filter(Evidence.case_id == case_id).all()
    
    def get_by_hash(self, file_hash: str) -> Evidence | None:
        """Get evidence by SHA-256 hash."""
        return self.db.query(Evidence).filter(Evidence.file_hash == file_hash).first()
    
    def create(self, original_filename: str, file_hash: str, file_size: int,
               mime_type: str, case_id: int, uploaded_by_id: int) -> Evidence:
        """Create a new evidence record."""
        from models import Evidence
        
        evidence = Evidence(
            original_filename=original_filename,
            file_hash=file_hash,
            file_size=file_size,
            mime_type=mime_type,
            case_id=case_id,
            uploaded_by_id=uploaded_by_id,
            uploaded_at=datetime.utcnow(),
            storage_path=f"evidence/{file_hash}_{original_filename}",
        )
        self.db.add(evidence)
        self.db.commit()
        self.db.refresh(evidence)
        return evidence