from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .api import register_routers

app = FastAPI(
    title="Project Nexus AI",
    description="AI-assisted digital forensic investigation and evidence intelligence platform",
    version="0.1.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all API routers
register_routers(app)

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "nexus-ai-backend"}

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Project Nexus AI Backend API"}