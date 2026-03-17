from http.server import BaseHTTPRequestHandler
import json
import os
import cgi
import io
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

try:
    from langchain_google_genai import ChatGoogleGenerativeAI
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
    LANGCHAIN_OK = True
except ImportError as e:
    LANGCHAIN_OK = False
    LANGCHAIN_ERROR = str(e)

try:
    import PyPDF2
    PDF_SUPPORT = True
except ImportError:
    PDF_SUPPORT = False

try:
    import docx
    DOCX_SUPPORT = True
except ImportError:
    DOCX_SUPPORT = False


def get_llm():
    api_key = os.getenv("GOOGLE_API_KEY")
    return ChatGoogleGenerativeAI(
        model="models/gemini-2.5-flash",
        google_api_key=api_key,
        temperature=0.3
    )


def extract_text_from_file(filename, file_bytes):
    content = ""
    try:
        if filename.lower().endswith('.pdf') and PDF_SUPPORT:
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
            for page in pdf_reader.pages:
                content += page.extract_text() + "\n"
        elif filename.lower().endswith('.docx') and DOCX_SUPPORT:
            doc = docx.Document(io.BytesIO(file_bytes))
            for para in doc.paragraphs:
                content += para.text + "\n"
        elif filename.lower().endswith('.txt'):
            content = file_bytes.decode('utf-8')
        else:
            try:
                content = file_bytes.decode('utf-8')
            except:
                return f"[File '{filename}' uploaded but text could not be extracted]"
        if len(content) > 15000:
            content = content[:15000] + "\n\n[Document truncated due to length...]"
        return content
    except Exception as e:
        return f"[Error reading {filename}: {str(e)}]"


def handle_chat(body_bytes, content_type):
    user_message = ""
    file_context = ""

    if content_type and "multipart/form-data" in content_type:
        environ = {
            'REQUEST_METHOD': 'POST',
            'CONTENT_TYPE': content_type,
            'CONTENT_LENGTH': len(body_bytes),
        }
        fp = io.BytesIO(body_bytes)
        form = cgi.FieldStorage(fp=fp, environ=environ, keep_blank_values=True)

        if 'user_message' in form:
            user_message = form['user_message'].value or ""

        if 'file' in form:
            file_field = form['file']
            if file_field.filename:
                file_bytes = file_field.file.read()
                file_text = extract_text_from_file(file_field.filename, file_bytes)
                file_context = f"\n\n[Document Content from {file_field.filename}]:\n{file_text}"
                if not user_message:
                    file_context += "\n\nPlease analyze this document and provide insights."

    elif content_type and "application/json" in content_type:
        body = json.loads(body_bytes.decode('utf-8'))
        user_message = body.get("user_message", "") or body.get("message", "")

    full_context = user_message + file_context

    if not full_context.strip():
        return {"reply": "Please provide a message or upload a document."}

    if not LANGCHAIN_OK:
        return {"reply": f"LangChain import error: {LANGCHAIN_ERROR}"}

    llm = get_llm()
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are ManjuLex, an expert Art Law Consultant. Analyze documents carefully and provide clear legal insights. Be professional and concise."),
        ("human", "{user_message}")
    ])
    chain = prompt | llm | StrOutputParser()
    response = chain.invoke({"user_message": full_context})
    return {"reply": response}


def handle_review_contract(body_bytes):
    body = json.loads(body_bytes.decode('utf-8'))
    contract_text = body.get("contract_text", "")

    if not LANGCHAIN_OK:
        return {"risk_score": 0, "summary": f"Import error: {LANGCHAIN_ERROR}", "dangerous_clauses": [], "missing_clauses": []}

    llm = get_llm()
    parser = JsonOutputParser()
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
    chain = prompt | llm | parser
    return chain.invoke({"contract_text": contract_text})


class handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        content_type = self.headers.get('Content-Type', '')
        body_bytes = self.rfile.read(content_length)

        try:
            if self.path.startswith('/api/chat'):
                result = handle_chat(body_bytes, content_type)
            elif self.path.startswith('/api/agent/review-contract'):
                result = handle_review_contract(body_bytes)
            else:
                result = {"error": "Unknown endpoint"}

            self.send_response(200)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode('utf-8'))

        except Exception as e:
            self.send_response(500)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))

    def do_GET(self):
        self.send_response(200)
        self._send_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"status": "ManjuLex API is running"}).encode('utf-8'))

    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def log_message(self, format, *args):
        pass