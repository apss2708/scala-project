from datetime import datetime
from . import __all__


class CaseCreate:
    """Schema for creating a new case."""
    def __init__(self, name: str, description: str = "", investigator_id: int | None = None):
        self.name = name
        self.description = description
        self.investigator_id = investigator_id


class CaseUpdate:
    """Schema for updating a case."""
    def __init__(self, name: str | None = None, description: str | None = None, status: str | None = None):
        self.name = name
        self.description = description
        self.status = status


class CaseResponse:
    """Schema for case API response."""
    def __init__(self, id: int, name: str, description: str, status: str, 
                 created_at: datetime, updated_at: datetime, evidence_count: int = 0):
        self.id = id
        self.name = name
        self.description = description
        self.status = status
        self.created_at = created_at
        self.updated_at = updated_at
        self.evidence_count = evidence_count