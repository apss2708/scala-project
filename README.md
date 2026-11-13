PROJECT NEXUS AI
AI-Powered Digital Forensic Investigation and Evidence Intelligence Platform

<p align="center">
<strong>Bridging Artificial Intelligence, Cybersecurity and Digital Forensic Science</strong>
</p>

<p align="center">
<img src="https://img.shields.io/badge/Project-Academic%20Minor%20Project-blue" alt="Academic Project">
<img src="https://img.shields.io/badge/AI-Google%20Gemini-orange" alt="Google Gemini">
<img src="https://img.shields.io/badge/Domain-Digital%20Forensics-purple" alt="Digital Forensics">
<img src="https://img.shields.io/badge/Status-In%20Development-yellow" alt="In Development">
</p>

Overview

PROJECT NEXUS AI is an AI-assisted digital forensic investigation platform designed to support evidence analysis, investigative gap discovery, multi-scenario incident reconstruction, and uncertainty-aware temporal analysis.

The platform combines digital forensic workflows with artificial intelligence to help investigators organize evidence, identify missing information, compare alternative incident explanations, and interpret complex event timelines.

It integrates four interconnected investigation modules into a unified case management environment.

The project aims to explore how AI can assist digital forensic investigations while maintaining evidence traceability, transparency, data integrity, and human oversight.

Core Modules
1. ECHO — Evidence Gap Discovery Engine

Identifies missing evidence, incomplete investigative information, unsupported claims, and relationships between available evidence.

Key features:

Evidence inventory.
Claim and observation mapping.
Missing information identification.
Evidence relationship visualization.
Investigative gap suggestions.
Source-linked findings.
2. MOSAIC — Multi-Scenario Reconstruction Engine

Develops and compares multiple possible explanations of an incident using available evidence.

Key features:

Alternative incident hypotheses.
Supporting and contradicting evidence.
Scenario comparison.
Assumption identification.
Evidence-linked reasoning.
Scenario version management.
3. TIMEGLASS — Temporal Uncertainty Analysis

Analyzes timestamps, timezone ambiguity, clock differences, and uncertain event sequences.

Key features:

Timestamp extraction.
Timezone interpretation.
Temporal uncertainty intervals.
Chronological event visualization.
Conflicting timestamp identification.
Alternative event ordering.
4. NEXUS AI — Intelligent Forensic Assistant

A case-aware AI chatbot powered by the Google Gemini API.

Key features:

Case-specific question answering.
Evidence-grounded responses.
Evidence source references.
Investigative assistance.
Scenario explanations.
Missing evidence discussions.
Forensic report assistance.

The AI assistant is designed to distinguish observations, hypotheses, assumptions, and unknown information.

Technology Stack
Layer	Technologies
Frontend	React, TypeScript, Vite
Styling	Tailwind CSS, shadcn/ui
Backend	Python, FastAPI
Database	PostgreSQL / SQLite
ORM	SQLAlchemy
AI Integration	Google Gemini API
Visualization	React Flow, Recharts
File Processing	Pillow, PyMuPDF, OpenCV
Security	Argon2id, RBAC, SHA-256
Deployment	Docker, Docker Compose

The technology list describes the intended architecture. Actual implemented components will be documented as development progresses.

Key Features
Secure user authentication.
Investigation case management.
Digital evidence repository.
SHA-256 evidence integrity verification.
Metadata extraction.
Evidence gap identification.
Interactive evidence relationship mapping.
Multi-scenario reconstruction.
Uncertainty-aware event timelines.
AI-powered forensic chatbot.
Chain-of-custody records.
Investigation report generation.
Role-based access control.
Privacy-conscious AI processing.
Audit logging.
System Architecture
text
             PROJECT NEXUS AI
                     |
             Investigation Case
                     |
              Evidence Repository
                     |
             Evidence Processing
                     |
        Structured Observation Registry
                     |
          +----------+----------+
          |          |          |
        ECHO      TIMEGLASS   MOSAIC
          |          |          |
          +----------+----------+
                     |
              NEXUS AI Assistant
                     |
              Investigator Review
                     |
              Forensic Reports

Project Structure
text
project-nexus-ai/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── features/
│       │   ├── dashboard/
│       │   ├── cases/
│       │   ├── evidence/
│       │   ├── echo/
│       │   ├── mosaic/
│       │   ├── timeglass/
│       │   └── chatbot/
│       ├── services/
│       └── utils/
│
├── backend/
│   └── app/
│       ├── api/
│       ├── core/
│       ├── models/
│       ├── schemas/
│       ├── services/
│       ├── modules/
│       ├── integrations/
│       └── security/
│
├── documentation/
├── scripts/
├── tests/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── LICENSE
└── README.md

Installation and Setup
Prerequisites
Python 3.11 or compatible version.
Node.js LTS.
npm.
Git.
PostgreSQL (for production configuration).
Google AI Studio API key.
1. Clone the repository
bash
git clone https://github.com/YOUR-USERNAME/project-nexus-ai.git

cd project-nexus-ai

2. Configure environment variables

Create a .env file using .env.example.

env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_supported_gemini_model

DATABASE_URL=sqlite:///./nexus.db

SECRET_KEY=your_random_secret
APP_ENV=development


Never upload your actual .env file to GitHub.

3. Backend setup
bash
cd backend

python -m venv venv


Activate the environment.

Windows:

bash
venv\Scripts\activate


Linux/macOS:

bash
source venv/bin/activate


Install dependencies:

bash
pip install -r requirements.txt


Start the backend:

bash
uvicorn app.main:app --reload

4. Frontend setup

Open another terminal:

bash
cd frontend

npm install

npm run dev

5. API documentation

Once the backend is running, visit:

text
http://localhost:8000/docs


Adjust commands if the actual project structure or entry-point differs.

AI Integration

PROJECT NEXUS AI uses Google's Gemini API for case-aware conversational assistance and AI-supported forensic interpretation.

Official API documentation:

https://ai.google.dev/gemini-api/docs

The application is designed to:

Retrieve relevant case information.
Generate evidence-grounded responses.
Provide source references.
Identify uncertainty.
Distinguish evidence from hypotheses.

Core evidence processing should remain functional even when the AI service is unavailable.

Security and Evidence Integrity

The project emphasizes:

SHA-256 evidence hashing.
Preservation of original uploaded files.
Separate analysis copies.
Role-based access control.
Case-level authorization.
Secure API key handling.
Audit logging.
Privacy-aware AI processing.
Evidence source traceability.

The application is a research and investigation support prototype and does not independently establish forensic admissibility.

Academic Purpose

This project is developed as a B.Sc. Forensic Science minor project exploring the integration of Artificial Intelligence, Cybersecurity and Digital Forensic Science.

It demonstrates the potential of AI-assisted approaches to evidence organization, investigative reasoning, event reconstruction and uncertainty analysis.

Project Status

Current status: In Development

Features will be marked as completed only after implementation and testing.

Roadmap
Project architecture and setup.
Authentication and case management.
Evidence repository.
SHA-256 integrity verification.
Metadata extraction.
ECHO implementation.
MOSAIC implementation.
TIMEGLASS implementation.
Gemini AI integration.
Case-aware chatbot.
Chain-of-custody management.
Report generation.
Security testing.
Accessibility testing.
Deployment.
Disclaimer

PROJECT NEXUS AI is an academic research and software development project.

It is intended to assist with digital forensic evidence organization and investigation workflows.

AI-generated outputs are suggestions and must be independently reviewed by qualified personnel.

The platform does not replace professional forensic examination, validated forensic acquisition tools, legal procedures, or expert judgment.

Do not upload unauthorized, confidential, or personally identifiable forensic evidence to external AI services.

License

See the LICENSE file for licensing information.

Acknowledgements
Google AI Studio and Gemini API.
Open-source software communities.
Digital forensic science and cybersecurity research communities.

PROJECT NEXUS AI — Making Digital Forensic Investigations More Traceable, Intelligent and Transparent.
