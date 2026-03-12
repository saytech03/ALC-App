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
# Use the Vercel Environment Variable
api_key = "AIzaSyAbcnNEwFsBEf0p9LhVov9pM5vDUH2gOYo"

# Safety check: If key is missing, print a warning to logs
if not api_key:
    print("CRITICAL: GOOGLE_API_KEY is missing from Vercel Settings!")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

@app.post("/api/chat")
async def chat_endpoint(
    user_message: str = Form(...), # Expect Form data, not JSON
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

        # Generate Response
        response = model.generate_content(parts)
        
        return {"reply": response.text}

    except Exception as e:
        print(f"Server Error: {e}")
        # Return the actual error to the frontend so we can debug
        raise HTTPException(status_code=500, detail=str(e))