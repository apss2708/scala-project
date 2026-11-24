from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from database import get_db
from repositories import EvidenceRepository
from schemas import EvidenceCreate, EvidenceResponse
from security import get_current_active_user
from fastapi import HTTPException

router = APIRouter(prefix="/evidence", tags=["evidence"])

@router.post("/upload", response_model=EvidenceResponse)
async def upload_evidence(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: Depends = Depends(get_current_active_user)
):
    """Upload and process digital evidence."""
    from security import hashlib
    content = await file.read()
    file_hash = hashlib.sha256(content).hexdigest()
    
    # Check if evidence already exists
    repo = EvidenceRepository(db)
    existing = repo.get_by_hash(file_hash)
    if existing:
        return existing
    
    # Create evidence record
    evidence_data = EvidenceCreate(
        original_filename=file.filename,
        file_hash=file_hash,
        file_size=len(content),
        mime_type=file.content_type,
        case_id=current_user.cases[0].id if current_user.cases else 1,
        uploaded_by_id=current_user.id,
    )
    evidence = repo.create(**evidence_data.dict() if hasattr(evidence_data, 'dict') else 
                          {k: getattr(evidence_data, k) for k in evidence_data.__dict__})
    
    return evidence