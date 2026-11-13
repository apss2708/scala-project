PROJECT NEXUS AI
Intelligent Digital Forensic Investigation & Evidence Intelligence Platform

<p align="center">
<img src="https://img.shields.io/badge/PROJECT-NEXUS%20AI-0D9488?style=for-the-badge" alt="Project Nexus AI">
<img src="https://img.shields.io/badge/DOMAIN-Digital%20Forensics-1E40AF?style=for-the-badge" alt="Digital Forensics">
<img src="https://img.shields.io/badge/POWERED%20BY-Google%20Gemini-4285F4?style=for-the-badge" alt="Google Gemini">
</p>

<p align="center">
<img src="https://img.shields.io/badge/Project-Academic%20Minor%20Project-8B5CF6">
<img src="https://img.shields.io/badge/Development-In%20Progress-orange">
<img src="https://img.shields.io/badge/License-MIT-green">
<img src="https://img.shields.io/badge/Focus-AI%20%2B%20Cybersecurity-blue">
</p>

<p align="center">
<b>Connecting Artificial Intelligence, Cybersecurity and Digital Forensic Science.</b>
</p>

01. About The Project

PROJECT NEXUS AI is an AI-assisted digital forensic investigation and evidence intelligence platform developed to explore the integration of Artificial Intelligence, Cybersecurity and Digital Forensic Science.

Traditional digital forensic investigations often involve examining multiple evidence sources, identifying missing information, correlating events, reconstructing incident sequences and documenting investigative findings.

PROJECT NEXUS AI aims to bring these processes into one integrated investigation environment.

The platform combines evidence intelligence, alternative incident reconstruction, temporal uncertainty analysis and an intelligent AI assistant to support structured, transparent and traceable forensic investigations.

Rather than generating unsupported conclusions, NEXUS AI emphasizes evidence references, investigative uncertainty, alternative explanations and human verification.

Core Vision: Transform fragmented digital evidence into structured, traceable and intelligence-assisted investigative insights.
02. Core Investigation Architecture

PROJECT NEXUS AI is built around four interconnected investigation engines.

01 — ECHO

Evidence Gap Discovery Engine

ECHO focuses on identifying missing information, incomplete evidence relationships and investigative gaps.

Key capabilities:

Digital evidence inventory.
Evidence-to-claim relationship mapping.
Identification of missing investigative information.
Detection of unsupported claims.
Identification of incomplete or contradictory observations.
Interactive evidence relationship visualization.
Evidence-linked investigative suggestions.

Objective: Understand what is known, what is missing and what requires further verification.

02 — MOSAIC

Multi-Scenario Incident Reconstruction Engine

MOSAIC explores multiple possible explanations of an incident using available evidence.

Key capabilities:

Alternative incident hypothesis generation.
Multiple scenario reconstruction.
Supporting evidence identification.
Contradictory evidence identification.
Scenario comparison.
Assumption and uncertainty tracking.
Scenario version management.

Objective: Compare different possible incident explanations without treating any unverified hypothesis as established fact.

03 — TIMEGLASS

Temporal Uncertainty Analysis Engine

TIMEGLASS focuses on timestamp interpretation, temporal inconsistencies and uncertainty-aware event reconstruction.

Key capabilities:

Timestamp extraction.
Timezone identification.
Clock-offset assumptions.
Temporal uncertainty intervals.
Chronological event reconstruction.
Conflicting timestamp identification.
Alternative event ordering.
Interactive timeline visualization.

Objective: Reconstruct event sequences while preserving uncertainty and avoiding unsupported timestamp assumptions.

04 — NEXUS AI

Context-Aware AI Forensic Assistant

NEXUS AI is an intelligent conversational assistant powered by Google's Gemini API.

Unlike a generic chatbot, the assistant is designed to work with the context of a selected investigation case.

Key capabilities:

Case-aware question answering.
Evidence-grounded explanations.
Source-referenced responses.
Evidence gap explanations.
Scenario comparison assistance.
Temporal analysis explanations.
Investigative documentation assistance.
Forensic report assistance.

Objective: Make complex forensic information easier to examine, understand and document.

03. How The System Works

The four modules operate through a shared investigation workflow.

mermaid
flowchart TD
    A[Investigation Case] --> B[Digital Evidence Repository]
    B --> C[Evidence Processing Engine]
    C --> D[Structured Observations]

    D --> E[ECHO - Evidence Gap Discovery]
    D --> F[TIMEGLASS - Temporal Analysis]

    E --> G[MOSAIC - Scenario Reconstruction]
    F --> G

    E --> H[NEXUS AI Assistant]
    F --> H
    G --> H

    H --> I[Investigator Review]
    I --> J[Forensic Investigation Report]


Every module uses shared case identifiers, evidence identifiers and traceable observations.

The platform aims to maintain a clear distinction between:

Original evidence.
Extracted observations.
Deterministic analytical results.
AI-generated interpretations.
Investigator-verified findings.
04. Key Platform Features
Category	Capabilities
Case Management	Investigation creation and management
Evidence Management	Secure uploads and evidence inventory
Evidence Integrity	SHA-256 hash calculation and verification
Metadata Analysis	File and document metadata extraction
ECHO	Missing evidence and investigative gap discovery
MOSAIC	Alternative incident scenario reconstruction
TIMEGLASS	Timestamp uncertainty and event analysis
AI Assistant	Gemini-powered forensic chatbot
Evidence Mapping	Interactive relationship visualization
Timeline Analysis	Chronological event visualization
Chain of Custody	Evidence handling records
Reporting	Structured forensic report generation
Security	Authentication and role-based access
Privacy	Data minimization and controlled AI processing
05. Technology Stack

The platform follows a modular full-stack architecture.

Frontend
React.js
TypeScript
Vite
Tailwind CSS
shadcn/ui
Lucide Icons
React Flow
Recharts
Backend
Python
FastAPI
Pydantic
SQLAlchemy
Alembic
Database
PostgreSQL
SQLite (development configuration)
Artificial Intelligence
Google Gemini API
Google AI Studio
Retrieval-Augmented Generation (RAG)
Structured AI responses
Digital Evidence Processing
Python hashlib
Pillow
OpenCV
PyMuPDF
Pandas
Python email parsing libraries
Security and Deployment
SHA-256
Argon2id
Role-Based Access Control
PostgreSQL Row Level Security
Docker
Docker Compose

Technology implementation and versions are subject to the current development status.

06. Security, Privacy & Evidence Integrity

Digital evidence requires careful handling.

PROJECT NEXUS AI is designed around the following principles:

Evidence Integrity

SHA-256 evidence hashing.
Preservation of original uploaded files.
Separate analysis copies.
Processing history.
Hash verification.

Access Security

Secure authentication.
Role-based permissions.
Case-level authorization.
Protected API endpoints.
Server-side API key management.

Privacy Protection

Data minimization.
Controlled external AI processing.
Configurable consent preferences.
Secure file storage.
Account and data deletion workflows.

AI Transparency

Evidence-linked responses.
Explicit uncertainty.
Separation of facts and hypotheses.
Human review of AI-generated findings.
07. Installation & Local Development
Prerequisites

Before starting, install:

Python 3.11 or compatible version.
Node.js LTS.
npm.
Git.
PostgreSQL (for production configuration).
Google AI Studio API key.
Step 1 — Clone the Repository
bash
git clone https://github.com/YOUR-USERNAME/project-nexus-ai.git

cd project-nexus-ai

Step 2 — Backend Setup
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


Install backend dependencies:

bash
pip install -r requirements.txt

Step 3 — Configure Environment Variables

Create a .env file using the provided .env.example.

env
APP_ENV=development

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_supported_gemini_model

DATABASE_URL=sqlite:///./nexus.db

SECRET_KEY=your_secure_random_secret

FRONTEND_URL=http://localhost:5173


IMPORTANT: Never expose your Gemini API key in frontend code or upload your actual .env file to GitHub.

Step 4 — Start Backend
bash
uvicorn app.main:app --reload


Backend API:

text
http://localhost:8000


API documentation:

text
http://localhost:8000/docs

Step 5 — Frontend Setup

Open another terminal:

bash
cd frontend

npm install

npm run dev


Open the local development URL displayed by Vite.

Installation commands may need adjustment according to the implemented project structure.

08. Project Directory Structure
text
project-nexus-ai/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       └── features/
│           ├── dashboard/
│           ├── authentication/
│           ├── cases/
│           ├── evidence/
│           ├── echo/
│           ├── mosaic/
│           ├── timeglass/
│           ├── chatbot/
│           └── reports/
│
├── backend/
│   └── app/
│       ├── api/
│       ├── core/
│       ├── models/
│       ├── schemas/
│       ├── repositories/
│       ├── services/
│       ├── security/
│       ├── integrations/
│       │   └── gemini/
│       └── modules/
│           ├── evidence/
│           ├── echo/
│           ├── mosaic/
│           ├── timeglass/
│           ├── chatbot/
│           └── reporting/
│
├── documentation/
├── tests/
├── scripts/
├── .env.example
├── .gitignore
├── LICENSE
├── SECURITY.md
├── docker-compose.yml
└── README.md

09. Development Roadmap

PROJECT NEXUS AI is being developed incrementally.

Initial project architecture.
Frontend and backend integration.
Authentication and authorization.
Investigation case management.
Evidence repository.
SHA-256 integrity verification.
Metadata extraction.
ECHO evidence gap engine.
MOSAIC scenario reconstruction.
TIMEGLASS temporal analysis.
Gemini API integration.
NEXUS AI forensic chatbot.
Evidence relationship visualization.
Chain-of-custody management.
PDF report generation.
Privacy and security implementation.
Automated testing.
Deployment.
10. Academic Background & Project Objective

Project Type: B.Sc. Forensic Science — Minor Project

Domain: Digital Forensics, Cybersecurity and Artificial Intelligence

Project Title:

Development of an AI-Assisted Digital Forensic Investigation Platform for Evidence Gap Discovery, Multi-Scenario Reconstruction, Temporal Uncertainty Analysis and Intelligent Forensic Assistance.

The project explores how artificial intelligence and computational techniques can support structured digital forensic investigation workflows.

Its academic objectives include:

Exploring AI-assisted evidence organization.
Identifying investigative information gaps.
Comparing alternative incident explanations.
Understanding timestamp uncertainty.
Developing evidence-grounded AI assistance.
Improving traceability and transparency in investigative documentation.
11. Limitations & Disclaimer

PROJECT NEXUS AI is an academic research and software development project.

It is intended to support evidence organization, investigative analysis and forensic documentation.

The application:

Does not independently establish guilt or criminal responsibility.
Does not replace qualified forensic examiners.
Does not guarantee legal admissibility.
Does not replace validated forensic acquisition procedures.
Does not treat AI-generated hypotheses as established facts.
Requires independent verification of extracted information and analytical findings.

Only authorized and appropriately handled digital evidence should be used.

External AI processing must be subject to appropriate privacy and data protection controls.

12. Future Scope

Potential future enhancements include:

Advanced digital artifact parsers.
Additional forensic file formats.
Pluggable forensic analysis engines.
Advanced graph-based evidence intelligence.
Improved temporal correlation methods.
Local AI model integration.
Multilingual forensic assistance.
Advanced investigation collaboration.
Enhanced forensic report templates.
13. Acknowledgements
Google AI Studio and Gemini API.
Open-source software developers.
Digital forensic science research community.
Cybersecurity research community.
14. License

This project is distributed under the MIT License, subject to the terms in the repository's LICENSE file.

See LICENSE for details.

<p align="center">
<strong>PROJECT NEXUS AI</strong>
</p>

<p align="center">
<i>From Digital Evidence to Intelligent Investigation.</i>
</p>

<p align="center">
Built at the intersection of AI, Cybersecurity and Digital Forensic Science.
</p>
