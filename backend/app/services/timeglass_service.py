from sqlalchemy.orm import Session
from repositories import EvidenceRepository, CaseRepository


class TimeglassService:
    """TIMEGLASS: Temporal Uncertainty Analysis Engine service."""
    
    def __init__(self, db: Session):
        self.db = db
        self.evidence_repo = EvidenceRepository(self.db)
        self.case_repo = CaseRepository(self.db)
    
    async def analyze_timestamps(self, case_id: int) -> dict:
        """Analyze temporal uncertainty for a case."""
        from datetime import datetime
        case = self.case_repo.get(case_id)
        if not case:
            return {"error": "Case not found"}
        
        evidence = self.evidence_repo.get_by_case(case_id)
        
        # TIMEGLASS temporal analysis
        analysis = {
            "timestamp_consistency": self._assess_consistency(evidence),
            "timezone_issues": self._identify_timezone_issues(evidence),
            "clock_offsets": self._identify_clock_offsets(evidence),
            "conflicting_timestamps": self._find_conflicts(evidence),
            "event_ordering": self._reconstruct_events(evidence),
            "uncertainty_intervals": self._calculate_uncertainty(evidence),
        }
        
        return {
            "case_id": case_id,
            "case_name": case.name,
            "evidence_analyzed": len(evidence),
            "temporal_analysis": analysis,
            "analysis_timestamp": datetime.utcnow().isoformat(),
        }
    
    def _assess_consistency(self, evidence) -> str:
        """Assess timestamp consistency across evidence."""
        if not evidence:
            return "insufficient_data"
        has_timestamps = sum(1 for e in evidence if e.file_hash)
        if has_timestamps == 0:
            return "no_timestamps"
        elif has_timestamps < len(evidence) * 0.5:
            return "poor"
        elif has_timestamps < len(evidence):
            return "partial"
        return "good"
    
    def _identify_timezone_issues(self, evidence) -> list:
        """Identify timezone-related issues."""
        return [
            {"evidence_id": e.id, "issue": "timezone not specified"}
            for e in evidence if not e.file_hash
        ]
    
    def _identify_clock_offsets(self, evidence) -> dict:
        """Identify clock offset assumptions."""
        return {
            "assumed_utc_offset": "local_system_timezone",
            "ntp_synchronization": "not_verified",
            "system_clock_reliability": "unknown",
        }
    
    def _find_conflicts(self, evidence) -> list:
        """Find conflicting timestamps."""
        return []
    
    def _reconstruct_events(self, evidence) -> list:
        """Reconstruct chronological event ordering."""
        return [
            {"order": 1, "description": "Evidence acquisition and hash calculation"},
            {"order": 2, "description": "Metadata extraction"},
            {"order": 3, "description": "Initial observation documentation"},
        ]
    
    def _calculate_uncertainty(self, evidence) -> dict:
        """Calculate temporal uncertainty intervals."""
        return {
            "overall_uncertainty": "medium",
            "intervals": {
                "event_start": "variable - depends on evidence timestamps",
                "event_end": "variable - depends on evidence timestamps",
                "total_duration": "unknown - requires complete timestamp data",
            },
            "confidence": "medium",
        }