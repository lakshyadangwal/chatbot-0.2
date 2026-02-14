# 🤖 AI Chatbot Website

<div align="center">

![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Ollama](https://img.shields.io/badge/Ollama-Compatible-orange.svg)

**A beautiful, modern, and powerful AI chatbot with a sleek dark UI**

Built with FastAPI, vanilla JavaScript, and Ollama for completely free local AI

[Features](#-features) • [Quick Start](#-quick-start) • [Demo](#-demo) • [Documentation](#-documentation) • [Deployment](#-deployment)

</div>

---

## ✨ Features

### 🎨 Beautiful User Interface
- **Modern Dark Theme** - Eye-friendly gradient design with smooth animations
- **Responsive Layout** - Perfect on desktop, tablet, and mobile devices
- **Real-time Typing Effect** - Watch AI responses stream in character by character
- **Smart Suggestions** - Quick-start buttons for common queries

### 🚀 Powerful Functionality
- **Streaming Responses** - See answers as they're generated (no waiting!)
- **Conversation Memory** - Maintains full context throughout your chat
- **Code Highlighting** - Automatically formats code blocks beautifully
- **Error Handling** - Graceful error messages and retry logic

### 🔒 Privacy & Performance
- **100% Free** - No API costs, runs completely on your machine
- **Fully Private** - Your conversations never leave your computer
- **Fast & Lightweight** - Pure vanilla JS, no bloated frameworks
- **Offline Capable** - Works without internet (after setup)

---

## 🎯 Quick Start

### Prerequisites

- **Python 3.11+** installed
- **Linux Mint / Ubuntu** (or any Linux distribution)
- **4GB+ RAM** recommended for running AI models

### Installation (5 Minutes)

#### Step 1: Install Ollama

```bash
# Download and install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Verify installation
ollama --version
```

#### Step 2: Download AI Model

```bash
# Download llama3.2 (2GB - takes 2-5 minutes)
ollama pull llama3.2

# For faster/smaller model (1GB):
# ollama pull llama3.2:1b

# For better quality (4GB):
# ollama pull llama3.1
```

#### Step 3: Set Up Project

```bash
# Clone or download project
cd ~/Documents
mkdir ai-chatbot && cd ai-chatbot

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Create requirements.txt
cat > requirements.txt << 'EOF'
fastapi==0.115.5
uvicorn[standard]==0.34.0
python-dotenv==1.0.1
pydantic==2.10.3
requests==2.31.0
EOF

# Install dependencies
pip install -r requirements.txt
```

#### Step 4: Create Project Structure

```bash
# Create folders
mkdir -p static/css static/js templates

# Download the project files from the conversation above
# Or create them manually following the structure
```

#### Step 5: Run the Application

```bash
# Terminal 1: Start Ollama (if not running as service)
ollama serve

# Terminal 2: Run the chatbot
cd ~/Documents/ai-chatbot
source venv/bin/activate
python3 app.py
```

#### Step 6: Open in Browser

```
http://localhost:8000
```

**🎉 Done! Start chatting with your AI!**

---

## 📂 Project Structure

```
ai-chatbot/
├── 📄 app.py                    # FastAPI backend server
├── 📄 requirements.txt          # Python dependencies
├── 📄 .env                      # Environment variables (optional)
├── 📄 .gitignore               # Git ignore rules
├── 📄 README.md                # This file
│
├── 📁 templates/               # HTML templates
│   └── 📄 index.html          # Main chat interface
│
├── 📁 static/                  # Static assets
│   ├── 📁 css/
│   │   └── 📄 style.css       # Beautiful dark theme
│   └── 📁 js/
│       └── 📄 script.js       # Chat functionality
│
└── 📁 venv/                    # Virtual environment (auto-created)
```

---

## 🎮 Demo

### Chat Interface

```
┌────────────────────────────────────────────────────────┐
│  🤖 AI Chatbot              Ask me anything!  [Clear]  │
├────────────────────────────────────────────────────────┤
│                                                         │
│  👋 Welcome to AI Chatbot!                             │
│  I'm here to help you with any questions.              │
│                                                         │
│  [What can you help me with?]                          │
│  [Explain quantum computing]                           │
│  [Code example]                                        │
│                                                         │
├────────────────────────────────────────────────────────┤
│  Type your message here...                        [▶]  │
│  ☑ Stream responses                                    │
└────────────────────────────────────────────────────────┘
```

### Example Conversations

**User:** "Explain recursion with a Python example"

**AI:** "Recursion is when a function calls itself! Here's a simple example:

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # Output: 120
```

The function keeps calling itself until it reaches the base case (n <= 1)."

---

## 🛠️ Configuration

### Change AI Model

Edit `app.py` and modify:

```python
"model": "llama3.2"  # Change to any Ollama model
```

Available models:
- `llama3.2` - Balanced (2GB) ⭐ Recommended
- `llama3.2:1b` - Faster, smaller (1GB)
- `llama3.1` - Better quality (4GB)
- `mistral` - Alternative model (4GB)
- `codellama` - Code-focused (4GB)

### Customize System Prompt

Make your chatbot specialized:

```python
# In app.py, modify the prompt:
conversation = f"""You are a Python expert assistant.
You provide clear code examples and best practices.

{conversation}"""
```

### Adjust Response Style

```python
# Make responses shorter/longer
"model": "llama3.2",
"temperature": 0.7,  # Lower = more focused, Higher = more creative
"max_tokens": 500,   # Limit response length
```

---

## 🎨 Customization

### Change Theme Colors

Edit `static/css/style.css`:

```css
:root {
    --primary-color: #6366f1;     /* Purple - change to your color */
    --secondary-color: #ec4899;   /* Pink accent */
    --bg-color: #0f172a;          /* Dark background */
}
```

**Popular themes:**

**Blue Theme:**
```css
--primary-color: #3b82f6;
--secondary-color: #06b6d4;
```

**Green Theme:**
```css
--primary-color: #10b981;
--secondary-color: #34d399;
```

**Red Theme:**
```css
--primary-color: #ef4444;
--secondary-color: #f97316;
```

### Add Custom Features

**1. Voice Input:**
```javascript
// Add Web Speech API in script.js
const recognition = new webkitSpeechRecognition();
recognition.onresult = (e) => {
    userInput.value = e.results[0][0].transcript;
};
```

**2. Export Chat:**
```javascript
function exportChat() {
    const chatText = conversationHistory
        .map(m => `${m.role}: ${m.content}`)
        .join('\n\n');
    
    const blob = new Blob([chatText], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    // Download link...
}
```

---

## 🌐 Deployment

### Run as System Service (Auto-start on boot)

```bash
# Create systemd service
sudo nano /etc/systemd/system/chatbot.service
```

Add:
```ini
[Unit]
Description=AI Chatbot
After=network.target ollama.service

[Service]
Type=simple
User=YOUR_USERNAME
WorkingDirectory=/home/YOUR_USERNAME/ai-chatbot
Environment="PATH=/home/YOUR_USERNAME/ai-chatbot/venv/bin"
ExecStart=/home/YOUR_USERNAME/ai-chatbot/venv/bin/python3 app.py
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable chatbot
sudo systemctl start chatbot
sudo systemctl status chatbot
```

### Docker Deployment

**Dockerfile:**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Build and run:**
```bash
docker build -t ai-chatbot .
docker run -d -p 8000:8000 --name chatbot ai-chatbot
```

### Access from Other Devices

```bash
# Find your local IP
hostname -I

# Access from phone/tablet on same network:
# http://YOUR_IP:8000
# Example: http://192.168.1.100:8000
```

---

## 🔧 Advanced Usage

### Using Different AI Providers

#### OpenAI (ChatGPT)

```python
import openai

client = openai.OpenAI(api_key="your-key")

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": message}]
)
```

#### Anthropic (Claude)

```python
import anthropic

client = anthropic.Anthropic(api_key="your-key")

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[{"role": "user", "content": message}]
)
```

#### Google (Gemini)

```python
import google.generativeai as genai

genai.configure(api_key="your-key")
model = genai.GenerativeModel('gemini-pro')
response = model.generate_content(message)
```

### Add Custom Knowledge (RAG)

```python
# Load your documents
knowledge_base = """
Company: TechCorp
Founded: 2020
Products: AI Tools, Cloud Services
"""

# Inject into prompts
prompt = f"""Context: {knowledge_base}

{conversation}
Assistant: """
```

### Add Rate Limiting

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/api/chat")
@limiter.limit("10/minute")
async def chat(request: ChatRequest):
    # ... your code
```

---

## 🐛 Troubleshooting

### Common Issues

**Problem: "Ollama is not running"**
```bash
# Check if Ollama is running
curl http://localhost:11434

# If not, start it
ollama serve
```

**Problem: "Model not found"**
```bash
# List installed models
ollama list

# Download missing model
ollama pull llama3.2
```

**Problem: "Port 8000 already in use"**
```bash
# Find what's using the port
sudo lsof -i :8000

# Kill the process or change port in app.py
uvicorn.run(app, port=8001)
```

**Problem: "Slow responses"**
```bash
# Use a smaller, faster model
ollama pull llama3.2:1b

# Or reduce max_tokens in app.py
```

**Problem: "Out of memory"**
```bash
# Check available RAM
free -h

# Use smaller model or close other apps
```

### Enable Debug Mode

```python
# In app.py
import logging

logging.basicConfig(level=logging.DEBUG)

# Run with verbose output
uvicorn app:app --log-level debug
```

---

## 📚 Documentation

### API Endpoints

#### `GET /`
Returns the main chat interface (HTML page)

#### `POST /api/chat`
Send messages and receive AI responses

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "Hello!"}
  ],
  "stream": true
}
```

**Response (streaming):**
```
data: {"text": "Hi"}
data: {"text": " there"}
data: {"text": "!"}
data: [DONE]
```

**Response (non-streaming):**
```json
{
  "response": "Hi there!",
  "model": "llama3.2"
}
```

### Keyboard Shortcuts

- `Enter` - Send message
- `Shift + Enter` - New line
- `Ctrl + L` - Clear chat (when implemented)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - feel free to use it for personal or commercial projects!

```
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **FastAPI** - Modern, fast web framework for Python
- **Ollama** - Amazing tool for running LLMs locally
- **Llama 3.2** - Meta's open-source language model
- **TailwindCSS principles** - For design inspiration

---

## 📞 Support

Having issues? Here's how to get help:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing issues on GitHub
3. Open a new issue with:
   - Your OS and Python version
   - Error messages (full output)
   - Steps to reproduce

---

## 🚀 What's Next?

Planned features:

- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Image generation integration
- [ ] Chat export (PDF, TXT)
- [ ] User authentication
- [ ] Multiple chat sessions
- [ ] Plugin system
- [ ] Mobile app

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ using FastAPI and Ollama

[Report Bug](https://github.com/yourusername/ai-chatbot/issues) · [Request Feature](https://github.com/yourusername/ai-chatbot/issues)

</div>