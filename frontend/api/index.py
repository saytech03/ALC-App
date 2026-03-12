from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os

app = FastAPI()

# Enable CORS for your website
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- GET API KEY ---
# ⚠️ SECURITY WARNING: You posted your real API key in the chat. 
# ⚠️ Please go to Google AI Studio and regenerate it immediately after this.
# It is better to use os.environ.get("GOOGLE_API_KEY") for security.
api_key = "AIzaSyAbcnNEwFsBEf0p9LhVov9pM5vDUH2gOYo" 

if not api_key:
    print("CRITICAL: GOOGLE_API_KEY is missing!")

genai.configure(api_key=api_key)

# ✅ FIX: Change 2.5 to 1.5
model = genai.GenerativeModel("gemini-1.5-flash")

@app.post("/api/chat")
async def chat_endpoint(
    user_message: str = Form(None), # Changed to Form(None) to prevent validation error if empty
    file: UploadFile | None = File(None)
):
    try:
        parts = []
        
        # System Instruction
        system_text = "You are ManjuLex, an Art Law AI. Answer legally and concisely."
        parts.append(system_text)

        # Handle File
        if file:
            content = await file.read()
            parts.append({
                "mime_type": file.content_type,
                "data": content
            })

        # Handle Text
        if user_message:
            parts.append(user_message)
        
        # Handle case where user sends nothing (prevents crash)
        if not user_message and not file:
             return {"reply": "Please provide a message or a file."}

        # Generate Response
        response = model.generate_content(parts)
        
        return {"reply": response.text}

    except Exception as e:
        print(f"Server Error: {e}")
        # This print will show up in Vercel Logs if it fails again
        raise HTTPException(status_code=500, detail=str(e))