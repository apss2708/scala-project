import os
import google.generativeai as genai
from typing import Optional


class GeminiIntegration:
    """Google Gemini API integration for NEXUS AI forensic assistant."""
    
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY", "")
        if self.api_key:
            genai.configure(api_key=self.api_key)
        
        self.model_name = os.getenv("GEMINI_MODEL", "gemini-pro")
        self.model = genai.GenerativeModel(self.model_name) if self.api_key else None
    
    async def generate_response(
        self,
        model: str,
        prompt: str,
        temperature: float = 0.3,
        top_p: float = 0.9,
        max_output_tokens: int = 2048,
    ) -> str:
        """Generate a response from Gemini AI."""
        if not self.api_key or not self.model:
            return self._fallback_response(prompt)
        
        try:
            # Configure model with parameters
            gen_model = genai.GenerativeModel(
                model_name=model,
                generation_config={
                    "temperature": temperature,
                    "top_p": top_p,
                    "max_output_tokens": max_output_tokens,
                }
            )
            
            response = await gen_model.generate_content_async(prompt)
            return response.text if response else self._fallback_response(prompt)
            
        except Exception as e:
            # Log error and return fallback
            print(f"Gemini API error: {e}")
            return self._fallback_response(prompt)
    
    def _fallback_response(self, prompt: str) -> str:
        """Provide a fallback response when Gemini is unavailable."""
        return f"""[AI Assistant Unavailable - Fallback Mode]

I'm currently unable to access the Gemini AI service. This may be due to:
- Missing or invalid API key
- Network connectivity issues
- API rate limiting

**Forensic Note:** All AI-generated findings must be independently verified by a qualified examiner.

**Prompt Context:** {prompt[:200]}...

**Fallback Guidance:**
- Review evidence manually
- Consult standard forensic procedures
- Document all findings with supporting evidence
- Seek expert human verification

Return to main investigation workflow."""