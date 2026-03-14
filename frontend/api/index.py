from fastapi import FastAPI, HTTPException, Form, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser
from typing import List, Optional
import os
import uvicorn
import io
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

# Install these: pip install PyPDF2 python-docx
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

# 1. Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Setup Google Gemini
# Prefer a production environment variable; fall back to the other supported name.
api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")

_llm = None

def get_llm():
    """Return a cached ChatGoogleGenerativeAI client or initialize it.

    This is done lazily so that missing or invalid API keys do not crash
    module import time (helpful for serverless deployments).
    """

    global _llm
    if _llm is not None:
        return _llm

    if not api_key:
        raise RuntimeError(
            "Missing Gemini API key. Set GOOGLE_API_KEY or GEMINI_API_KEY in the environment."
        )

    # NOTE: Use a supported model name for the Gemini Developer API.
    _llm = ChatGoogleGenerativeAI(
        model="models/gemini-2.5-flash",
        google_api_key=api_key,
        temperature=0.3
    )

    return _llm

def extract_text_from_file(file: UploadFile) -> str:
    """Extract text from PDF, DOCX, or TXT files"""
    filename = file.filename.lower()
    content = ""
    
    try:
        file_bytes = file.file.read()
        
        if filename.endswith('.pdf') and PDF_SUPPORT:
            # Extract PDF text
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
            for page in pdf_reader.pages:
                content += page.extract_text() + "\n"
                
        elif filename.endswith('.docx') and DOCX_SUPPORT:
            # Extract DOCX text
            doc = docx.Document(io.BytesIO(file_bytes))
            for para in doc.paragraphs:
                content += para.text + "\n"
                
        elif filename.endswith('.txt'):
            # Plain text
            content = file_bytes.decode('utf-8')
            
        else:
            # Try to decode as text anyway
            try:
                content = file_bytes.decode('utf-8')
            except:
                return f"[File '{file.filename}' uploaded but text could not be extracted]"
        
        # Limit content length to avoid token limits
        if len(content) > 15000:
            content = content[:15000] + "\n\n[Document truncated due to length...]"
            
        return content
        
    except Exception as e:
        return f"[Error reading {file.filename}: {str(e)}]"

@app.post("/api/chat")
async def chat_endpoint(
    request: Request,
    user_message: Optional[str] = Form(""),
    file: Optional[UploadFile] = File(None)  # Changed to single file for simplicity
):
    try:
        full_context = user_message or ""
        
        # Process file if uploaded
        if file:
            file_text = extract_text_from_file(file)
            full_context += f"\n\n[Document Content from {file.filename}]:\n{file_text}"
            
            # If no user message, create a default prompt
            if not user_message:
                full_context += "\n\nPlease analyze this document and provide insights."
        
        if not full_context.strip():
            return {"reply": "Please provide a message or upload a document."}

        # Generate response
        llm = get_llm()
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are ManjuLex, an expert Art Law Consultant. Analyze documents carefully and provide clear legal insights. Be professional and concise."),
            ("human", "{user_message}")
        ])
        chain = prompt | llm | StrOutputParser()

        response = chain.invoke({"user_message": full_context})
        return {"reply": response}

    except Exception as e:
        print(f"Chat Error: {e}")
        return {"reply": "Sorry, I couldn't process your request right now.", "error": str(e)}

# Contract scanner endpoint remains the same
class ContractInput(BaseModel):
    contract_text: str

parser = JsonOutputParser()

@app.post("/api/agent/review-contract")
async def review_contract(contract_input: ContractInput):
    try:
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an AI Legal Auditor. Return STRICT JSON:
            {
                "risk_score": (integer 0-100),
                "summary": "Brief summary",
                "dangerous_clauses": ["clause 1", "clause 2"],
                "missing_clauses": ["protection 1", "protection 2"]
            }"""),
            ("human", "Analyze this contract:\n\n{contract_text}")
        ])
        llm = get_llm()
        chain = prompt | llm | parser
        return chain.invoke({"contract_text": contract_input.contract_text})
    except Exception as e:
        print(f"Contract review error: {e}")
        return {
            "risk_score": 0,
            "summary": f"Error: {str(e)}",
            "dangerous_clauses": [],
            "missing_clauses": []
        }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)