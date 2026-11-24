from sqlalchemy.orm import Session
from repositories import EvidenceRepository, CaseRepository


class MosaicService:
    """MOSAIC: Multi-Scenario Incident Reconstruction Engine service."""
    
    def __init__(self, db: Session):
        self.db = db
        self.evidence_repo = EvidenceRepository(self.db)
        self.case_repo = CaseRepository(self.db)
    
    async def reconstruct_scenarios(self, case_id: int) -> dict:
        """Generate alternative incident scenarios for a case."""
        from datetime import datetime
        case = self.case_repo.get(case_id)
        if not case:
            return {"error": "Case not found"}
        
        evidence = self.evidence_repo.get_by_case(case_id)
        
        # MOSAIC scenario generation
        scenarios = []
        
        # Generate primary scenario
        primary = self._build_primary_scenario(evidence)
        scenarios.append(primary)
        
        # Generate alternative scenarios if enough evidence
        if len(evidence) >= 3:
            alternative = self._build_alternative_scenario(evidence)
            scenarios.append(alternative)
        
        return {
            "case_id": case_id,
            "case_name": case.name,
            "total_evidence": len(evidence),
            "scenarios": scenarios,
            "scenario_count": len(scenarios),
            "reconstruction_timestamp": datetime.utcnow().isoformat(),
        }
    
    def _build_primary_scenario(self, evidence) -> dict:
        """Build the primary most-likely scenario."""
        return {
            "id": 1,
            "title": "Primary Scenario",
            "description": "Most likely sequence of events based on available digital evidence",
            "probability": self._calculate_primary_probability(evidence),
            "supporting_evidence": self._identify_supporting_evidence(evidence),
            "assumptions": self._identify_assumptions(evidence),
            "confidence": self._calculate_confidence(evidence),
        }
    
    def _build_alternative_scenario(self, evidence) -> dict:
        """Build an alternative scenario."""
        return {
            "id": 2,
            "title": "Alternative Scenario",
            "description": "Alternative interpretation of events considering different evidence combinations",
            "probability": round(0.3 * len(evidence) / max(1, len(evidence)), 2),
            "supporting_evidence": [],
            "assumptions": ["Alternative interpretation of timestamp data"],
            "confidence": "medium",
        }
    
    def _calculate_primary_probability(self, evidence) -> float:
        """Calculate probability for primary scenario."""
        base = 0.5
        evidence_bonus = min(0.4, len(evidence) * 0.05)
        return round(base + evidence_bonus, 2)
    
    def _identify_supporting_evidence(self, evidence) -> list:
        """Identify evidence supporting the primary scenario."""
        return [ev.original_filename for ev in evidence[:3]]
    
    def _identify_assumptions(self, evidence) -> list:
        """Identify assumptions in the primary scenario."""
        return [
            "Timestamps are accurate and properly calibrated",
            "Evidence sources are intact and unmodified",
            "No metadata has been altered or corrupted",
        ]
    
    def _calculate_confidence(self, evidence) -> str:
        """Calculate confidence level for the scenario."""
        if len(evidence) >= 5:
            return "high"
        elif len(evidence) >= 2:
            return "medium"
        return "low"