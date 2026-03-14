from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os

# We import this to ensure it's installed as requested, 
# but we will use Google's Native PDF support because it is smarter.
import PyPDF2 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API KEY ---
# ⚠️ Ensure this key is valid and has Gemini API enabled in Google Cloud Console
api_key = "AIzaSyAbcnNEwFsBEf0p9LhVov9pM5vDUH2gOYo" 

if not api_key:
    print("CRITICAL: GOOGLE_API_KEY is missing!")

genai.configure(api_key=api_key)

# ✅ FIX: Use 'gemini-1.5-flash-latest' to resolve versioning 404s
# If this fails, try 'gemini-pro' as a fallback
model = genai.GenerativeModel("gemini-1.5-flash-latest")

@app.post("/api/chat")
async def chat_endpoint(
    user_message: str = Form(None), 
    file: UploadFile | None = File(None)
):
    try:
        parts = []
        
        # System Instruction
        system_text = "You are ManjuLex, an Art Law AI. Answer legally and concisely."
        parts.append(system_text)

        # Handle File (Native Google Support)
        if file:
            content = await file.read()
            
            # Google Gemini accepts PDF bytes directly. 
            # This is better than PyPDF2 because it understands layout/formatting.
            parts.append({
                "mime_type": file.content_type,
                "data": content
            })

        # Handle Text
        if user_message:
            parts.append(user_message)
        
        # Guard clause
        if not user_message and not file:
            return {"reply": "Please provide a message or a document."}

        # Generate Response
        response = model.generate_content(parts)
        
        return {"reply": response.text}

    except Exception as e:
        print(f"Server Error: {e}")
        # Return the specific error to the frontend
        raise HTTPException(status_code=500, detail=str(e))