import hashlib
from datetime import datetime
from . import Base


class Evidence(Base):
    """Digital evidence model."""
    __tablename__ = "evidence"
    
    id: int
    case_id: int
    original_filename: str
    stored_filename: str
    file_hash: str
    file_size: int
    mime_type: str = ""
    storage_path: str
    sha256_verified: bool = False
    metadata_extracted: bool = False
    uploaded_at: datetime
    uploaded_by_id: int