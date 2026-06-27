import io
import json
import os
import urllib.request
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Load environment variables from .env file
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

try:
    import PyPDF2

    PDF_SUPPORT = True
except ImportError:
    PDF_SUPPORT = False
    print("⚠️ PyPDF2 not installed. PDF text extraction disabled.")

try:
    import docx

    DOCX_SUPPORT = True
except ImportError:
    DOCX_SUPPORT = False

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def extract_text_from_file(file: UploadFile) -> str:
    """Extract text from PDF, DOCX, or TXT files."""
    filename = file.filename.lower()
    content = ""

    try:
        file_bytes = file.file.read()

        if filename.endswith(".pdf") and PDF_SUPPORT:
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
            for page in pdf_reader.pages:
                content += page.extract_text() + "\n"

        elif filename.endswith(".docx") and DOCX_SUPPORT:
            doc = docx.Document(io.BytesIO(file_bytes))
            for para in doc.paragraphs:
                content += para.text + "\n"

        elif filename.endswith(".txt"):
            content = file_bytes.decode("utf-8")

        else:
            try:
                content = file_bytes.decode("utf-8")
            except Exception:
                return f"[File '{file.filename}' uploaded but text could not be extracted]"

        if len(content) > 15000:
            content = content[:15000] + "\n\n[Document truncated due to length...]"

        return content

    except Exception as exc:
        return f"[Error reading {file.filename}: {str(exc)}]"


def call_gemini(prompt: str) -> str:
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        return "Google API key is not configured."

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": prompt}],
            }
        ]
    }

    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            data = json.loads(response.read().decode("utf-8"))
    except Exception as exc:
        return f"Gemini request failed: {exc}"

    try:
        return data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError, TypeError):
        return json.dumps(data)


@app.post("/api/chat")
async def chat_endpoint(
    request: Request,
    user_message: Optional[str] = Form(""),
    file: Optional[UploadFile] = File(None),
):
    try:
        full_context = user_message or ""

        if file:
            file_text = extract_text_from_file(file)
            full_context += f"\n\n[Document Content from {file.filename}]:\n{file_text}"

            if not user_message:
                full_context += "\n\nPlease analyze this document and provide insights."

        if not full_context.strip():
            return {"reply": "Please provide a message or upload a document."}

        system_prompt = (
            "You are ManjuLex, an expert Art Law Consultant. Analyze documents carefully and "
            "provide clear legal insights. Be professional and concise."
        )
        response = call_gemini(f"{system_prompt}\n\n{full_context}")
        return {"reply": response}

    except Exception as exc:
        print(f"Chat Error: {exc}")
        raise HTTPException(status_code=500, detail=str(exc))


class ContractInput(BaseModel):
    contract_text: str


@app.post("/api/agent/review-contract")
async def review_contract(contract_input: ContractInput):
    try:
        prompt = (
            "You are an AI Legal Auditor. Return STRICT JSON with this structure: "
            "{\"risk_score\": 0-100, \"summary\": \"brief summary\", "
            "\"dangerous_clauses\": [], \"missing_clauses\": []}. Analyze this contract:\n\n"
            f"{contract_input.contract_text}"
        )
        response_text = call_gemini(prompt)
        return json.loads(response_text)
    except Exception:
        return {
            "risk_score": 0,
            "summary": "Unable to analyze contract right now.",
            "dangerous_clauses": [],
            "missing_clauses": [],
        }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)