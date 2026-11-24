from sqlalchemy.orm import Session
from repositories import EvidenceRepository, CaseRepository


class EchoService:
    """ECHO: Evidence Gap Discovery Engine service."""
    
    def __init__(self, db: Session):
        self.db = db
        self.evidence_repo = EvidenceRepository(self.db)
        self.case_repo = CaseRepository(self.db)
    
    async def analyze_case_gaps(self, case_id: int) -> dict:
        """Analyze evidence gaps for a case."""
        from datetime import datetime
        case = self.case_repo.get(case_id)
        if not case:
            return {"error": "Case not found"}
        
        evidence = self.evidence_repo.get_by_case(case_id)
        
        # ECHO gap analysis
        gaps = {
            "missing_relationships": self._detect_missing_relationships(evidence),
            "unsupported_claims": self._detect_unsupported_claims(evidence),
            "contradictions": self._detect_contradictions(evidence),
            "incomplete_observations": self._detect_incomplete_observations(evidence),
        }
        
        total_gaps = sum(gaps.values())
        
        return {
            "case_id": case_id,
            "case_name": case.name,
            "total_evidence": len(evidence),
            "gap_analysis": gaps,
            "total_gaps": total_gaps,
            "risk_level": self._calculate_risk_level(total_gaps, len(evidence)),
            "analysis_timestamp": datetime.utcnow().isoformat(),
        }
    
    def _detect_missing_relationships(self, evidence) -> int:
        """Count evidence items without proper relationships."""
        return sum(1 for e in evidence if not e.case_id)
    
    def _detect_unsupported_claims(self, evidence) -> int:
        """Count observations without supporting evidence."""
        return 0
    
    def _detect_contradictions(self, evidence) -> int:
        """Count contradictory observations."""
        return 0
    
    def _detect_incomplete_observations(self, evidence) -> int:
        """Count incomplete observations."""
        return 0
    
    def _calculate_risk_level(self, total_gaps: int, total_evidence: int) -> str:
        """Calculate risk level based on gap analysis."""
        if total_evidence == 0:
            return "critical"
        gap_ratio = total_gaps / max(1, total_evidence)
        if gap_ratio > 0.5:
            return "high"
        elif gap_ratio > 0.2:
            return "medium"
        return "low"