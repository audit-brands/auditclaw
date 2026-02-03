#!/usr/bin/env python3
"""
Risk Assessment Utilities

Helper functions for risk scoring and classification.
Can be invoked by the agent or used standalone.

Usage:
    python risk_utils.py score 4 3           # Calculate risk score
    python risk_utils.py classify 12         # Classify risk level
    python risk_utils.py residual 12 partial # Calculate residual after controls
"""

import sys
import json
from typing import Literal

# Risk level thresholds (moderate risk appetite)
THRESHOLDS = {
    "critical": 16,
    "high": 10,
    "medium": 5,
    "low": 1
}

# Control effectiveness reduction factors
CONTROL_EFFECTIVENESS = {
    "effective": 2,      # Reduce by 2 levels
    "partial": 1,        # Reduce by 1 level
    "ineffective": 0,    # No reduction
    "missing": 0         # No reduction
}


def calculate_risk_score(likelihood: int, impact: int) -> int:
    """
    Calculate inherent risk score.
    
    Args:
        likelihood: Score 1-5
        impact: Score 1-5
    
    Returns:
        Risk score (1-25)
    """
    if not (1 <= likelihood <= 5):
        raise ValueError(f"Likelihood must be 1-5, got {likelihood}")
    if not (1 <= impact <= 5):
        raise ValueError(f"Impact must be 1-5, got {impact}")
    
    return likelihood * impact


def classify_risk(score: int) -> str:
    """
    Classify risk level based on score.
    
    Args:
        score: Risk score (1-25)
    
    Returns:
        Risk level: "Critical", "High", "Medium", or "Low"
    """
    if score >= THRESHOLDS["critical"]:
        return "Critical"
    elif score >= THRESHOLDS["high"]:
        return "High"
    elif score >= THRESHOLDS["medium"]:
        return "Medium"
    else:
        return "Low"


def calculate_residual_risk(
    inherent_score: int,
    control_effectiveness: Literal["effective", "partial", "ineffective", "missing"]
) -> tuple[int, str]:
    """
    Calculate residual risk after considering control effectiveness.
    
    Args:
        inherent_score: Inherent risk score (1-25)
        control_effectiveness: Level of control effectiveness
    
    Returns:
        Tuple of (residual_score, risk_level)
    """
    reduction = CONTROL_EFFECTIVENESS.get(control_effectiveness.lower(), 0)
    
    # Reduce score by effectiveness factor, minimum 1
    residual = max(1, inherent_score - (reduction * 3))
    
    return residual, classify_risk(residual)


def generate_risk_id(sequence: int) -> str:
    """Generate a risk ID in standard format."""
    return f"R-{sequence:03d}"


def format_risk_register_row(
    risk_id: str,
    statement: str,
    category: str,
    likelihood: int,
    impact: int,
    controls: str,
    effectiveness: str,
    actions: str,
    owner: str = ""
) -> dict:
    """
    Generate a complete risk register row with all calculations.
    
    Returns:
        Dictionary with all risk register fields
    """
    inherent = calculate_risk_score(likelihood, impact)
    residual, level = calculate_residual_risk(inherent, effectiveness)
    
    return {
        "id": risk_id,
        "statement": statement,
        "category": category,
        "likelihood": likelihood,
        "impact": impact,
        "inherent_score": inherent,
        "controls": controls,
        "effectiveness": effectiveness,
        "residual_score": residual,
        "level": level,
        "actions": actions,
        "owner": owner
    }


def main():
    """CLI interface for risk utilities."""
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    
    command = sys.argv[1].lower()
    
    if command == "score":
        if len(sys.argv) != 4:
            print("Usage: python risk_utils.py score <likelihood> <impact>")
            sys.exit(1)
        likelihood = int(sys.argv[2])
        impact = int(sys.argv[3])
        score = calculate_risk_score(likelihood, impact)
        level = classify_risk(score)
        print(json.dumps({
            "likelihood": likelihood,
            "impact": impact,
            "score": score,
            "level": level
        }, indent=2))
    
    elif command == "classify":
        if len(sys.argv) != 3:
            print("Usage: python risk_utils.py classify <score>")
            sys.exit(1)
        score = int(sys.argv[2])
        level = classify_risk(score)
        print(json.dumps({
            "score": score,
            "level": level
        }, indent=2))
    
    elif command == "residual":
        if len(sys.argv) != 4:
            print("Usage: python risk_utils.py residual <inherent_score> <effectiveness>")
            print("  effectiveness: effective, partial, ineffective, missing")
            sys.exit(1)
        inherent = int(sys.argv[2])
        effectiveness = sys.argv[3]
        residual, level = calculate_residual_risk(inherent, effectiveness)
        print(json.dumps({
            "inherent_score": inherent,
            "control_effectiveness": effectiveness,
            "residual_score": residual,
            "level": level
        }, indent=2))
    
    else:
        print(f"Unknown command: {command}")
        print(__doc__)
        sys.exit(1)


if __name__ == "__main__":
    main()
