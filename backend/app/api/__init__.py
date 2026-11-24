from .v1.echo import router as echo_router
from .v1.mosaic import router as mosaic_router
from .v1.timeglass import router as timeglass_router
from .v1.chatbot import router as chatbot_router
from .v1.evidence import router as evidence_router
from .v1.reports import router as reports_router
from .v1.auth import router as auth_router

def register_routers(app):
    """Register all API routers with the FastAPI app."""
    app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
    app.include_router(echo_router, prefix="/api/v1/echo", tags=["echo"])
    app.include_router(mosaic_router, prefix="/api/v1/mosaic", tags=["mosaic"])
    app.include_router(timeglass_router, prefix="/api/v1/timeglass", tags=["timeglass"])
    app.include_router(chatbot_router, prefix="/api/v1/chatbot", tags=["chatbot"])
    app.include_router(evidence_router, prefix="/api/v1/evidence", tags=["evidence"])
    app.include_router(reports_router, prefix="/api/v1/reports", tags=["reports"])