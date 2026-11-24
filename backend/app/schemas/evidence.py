import hashlib
from datetime import datetime
from . import __all__


class EvidenceCreate:
    """Schema for creating evidence."""
    def __init__(self, original_filename: str, file_hash: str, file_size: int,
                 mime_type: str, case_id: int, uploaded_by_id: int):
        self.original_filename = original_filename
        self.file_hash = file_hash
        self.file_size = file_size
        self.mime_type = mime_type
        self.case_id = case_id
        self.uploaded_by_id = uploaded_by_id


class EvidenceUpdate:
    """Schema for updating evidence."""
    def __init__(self, metadata_extracted: bool | None = None, sha256_verified: bool | None = None):
        self.metadata_extracted = metadata_extracted
        self.sha256_verified = sha256_verified


class EvidenceResponse:
    """Schema for evidence API response."""
    def __init__(self, id: int, case_id: int, original_filename: str, 
                 file_hash: str, file_size: int, mime_type: str, 
                 storage_path: str, sha256_verified: bool, 
                 metadata_extracted: bool, uploaded_at: datetime,
                 uploaded_by_id: int):
        self.id = id
        self.case_id = case_id
        self.original_filename = original_filename
        self.file_hash = file_hash
        self.file_size = file_size
        self.mime_type = mime_type
        self.storage_path = storage_path
        self.sha256_verified = sha256_verified
        self.metadata_extracted = metadata_extracted
        self.uploaded_at = uploaded_at
        self.uploaded_by_id = uploaded_by_id