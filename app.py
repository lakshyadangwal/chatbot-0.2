from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
import requests
import json
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    stream: Optional[bool] = False

@app.get("/", response_class=HTMLResponse)
async def home():
    with open("templates/index.html", "r") as f:
        return f.read()

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        conversation = ""
        for msg in request.messages:
            if msg.role == "user":
                conversation += f"User: {msg.content}\n"
            else:
                conversation += f"Assistant: {msg.content}\n"
        
        if request.stream:
            def generate():
                response = requests.post(
                    'http://localhost:11434/api/generate',
                    json={
                        "model": "llama3.2",
                        "prompt": f"{conversation}Assistant: ",
                        "stream": True
                    },
                    stream=True
                )
                
                for line in response.iter_lines():
                    if line:
                        chunk = json.loads(line)
                        if 'response' in chunk:
                            yield f"data: {json.dumps({'text': chunk['response']})}\n\n"
                        if chunk.get('done', False):
                            yield "data: [DONE]\n\n"
                            break
            
            return StreamingResponse(generate(), media_type="text/event-stream")
        else:
            response = requests.post(
                'http://localhost:11434/api/generate',
                json={
                    "model": "llama3.2",
                    "prompt": f"{conversation}Assistant: ",
                    "stream": False
                }
            )
            
            result = response.json()
            
            return {
                "response": result['response'],
                "model": "llama3.2"
            }
    
    except requests.exceptions.ConnectionError:
        raise HTTPException(
            status_code=503, 
            detail="Cannot connect to Ollama. Make sure Ollama is running"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)