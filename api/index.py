from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import uvicorn
import json

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = "AIzaSyAbcnNEwFsBEf0p9LhVov9pM5vDUH2gOYo"
if not api_key:
    print("🚨 CRITICAL: GOOGLE_API_KEY missing in Vercel Settings!")
    api_key = "AIza-placeholder"  # This will fail gracefully

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-pro")  # Stable model

@app.post("/api/chat")
async def chat_endpoint(request: Request):
    try:
        # AUTO-DETECT JSON vs FormData
        content_type = request.headers.get('content-type', '').lower()
        
        user_message = ""
        file_content = None
        
        if 'application/json' in content_type:
            # Handle JSON (text-only chat)
            body = await request.body()
            data = json.loads(body)
            user_message = data.get('user_message', '')
        else:
            # Handle FormData (text + file)
            form = await request.form()
            user_message = form.get('user_message', '')
            uploaded_file = form.get('file')
            if uploaded_file:
                # Read file bytes for Gemini
                file_bytes = await uploaded_file.read()
                file_content = {
                    "mime_type": uploaded_file.content_type or "application/octet-stream",
                    "data": file_bytes
                }
        
        # Prepare prompt for Gemini
        parts = ["You are ManjuLex, an Art Law AI. Answer legally and concisely."]
        
        if file_content:
            parts.append(file_content)
            if not user_message:
                user_message = "Analyze this document for legal issues."
        
        if user_message:
            parts.append(user_message)
        
        if not user_message and not file_content:
            return {"reply": "Please provide a message."}
        
        # Call Gemini
        response = model.generate_content(parts)
        
        return {"reply": response.text}
        
    except Exception as e:
        print(f"🚨 Server Error: {e}")
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)