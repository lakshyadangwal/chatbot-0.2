// Chat state
let conversationHistory = [];

// DOM elements
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const streamToggle = document.getElementById('streamToggle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    adjustTextareaHeight();
});

function setupEventListeners() {
    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send message on Enter (Shift+Enter for new line)
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    userInput.addEventListener('input', adjustTextareaHeight);

    // Clear chat
    clearBtn.addEventListener('click', clearChat);

    // Suggestion buttons
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            userInput.value = btn.dataset.prompt;
            sendMessage();
        });
    });
}

function adjustTextareaHeight() {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
}

async function sendMessage() {
    const message = userInput.value.trim();
    
    if (!message) return;

    // Disable input while processing
    setInputState(false);

    // Hide welcome message
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }

    // Add user message to UI
    addMessage(message, 'user');
    
    // Add to conversation history
    conversationHistory.push({
        role: 'user',
        content: message
    });

    // Clear input
    userInput.value = '';
    adjustTextareaHeight();

    // Get bot response
    const useStreaming = streamToggle.checked;
    
    if (useStreaming) {
        await streamBotResponse();
    } else {
        await getBotResponse();
    }

    // Re-enable input
    setInputState(true);
    userInput.focus();
}

async function getBotResponse() {
    // Show loading indicator
    const loadingDiv = createLoadingIndicator();
    chatContainer.appendChild(loadingDiv);
    scrollToBottom();

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: conversationHistory,
                stream: false
            })
        });

        loadingDiv.remove();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const botMessage = data.response;

        // Add bot message to UI and history
        addMessage(botMessage, 'bot');
        conversationHistory.push({
            role: 'assistant',
            content: botMessage
        });

    } catch (error) {
        loadingDiv.remove();
        addMessage('Sorry, I encountered an error. Please try again.', 'bot', true);
        console.error('Error:', error);
    }
}

async function streamBotResponse() {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: conversationHistory,
                stream: true
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Create message element for streaming
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        messageDiv.appendChild(contentDiv);
        chatContainer.appendChild(messageDiv);

        let fullResponse = '';
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    
                    if (data === '[DONE]') {
                        break;
                    }

                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.text) {
                            fullResponse += parsed.text;
                            contentDiv.innerHTML = formatMessage(fullResponse);
                            scrollToBottom();
                        }
                    } catch (e) {
                        // Skip invalid JSON
                    }
                }
            }
        }

        // Add to conversation history
        conversationHistory.push({
            role: 'assistant',
            content: fullResponse
        });

    } catch (error) {
        addMessage('Sorry, I encountered an error. Please try again.', 'bot', true);
        console.error('Error:', error);
    }
}

function addMessage(text, sender, isError = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (isError) {
        contentDiv.style.background = '#ef4444';
        contentDiv.style.color = 'white';
    }
    
    contentDiv.innerHTML = formatMessage(text);
    
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    
    scrollToBottom();
}

function formatMessage(text) {
    // Basic markdown-like formatting
    let formatted = text
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
    
    return formatted;
}

function createLoadingIndicator() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot';
    loadingDiv.innerHTML = `
        <div class="message-content">
            <div class="loading-dots" style="display: flex;">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    return loadingDiv;
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function setInputState(enabled) {
    userInput.disabled = !enabled;
    sendBtn.disabled = !enabled;
}

function clearChat() {
    if (confirm('Are you sure you want to clear the chat?')) {
        conversationHistory = [];
        chatContainer.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon">👋</div>
                <h2>Welcome to AI Chatbot!</h2>
                <p>I'm here to help you with any questions you have. Just type your message below to get started.</p>
                <div class="suggestions">
                    <button class="suggestion-btn" data-prompt="What can you help me with?">What can you help me with?</button>
                    <button class="suggestion-btn" data-prompt="Explain quantum computing in simple terms">Explain quantum computing</button>
                    <button class="suggestion-btn" data-prompt="Write a Python function to reverse a string">Code example</button>
                </div>
            </div>
        `;
        
        // Re-attach suggestion button listeners
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                userInput.value = btn.dataset.prompt;
                sendMessage();
            });
        });
    }
}