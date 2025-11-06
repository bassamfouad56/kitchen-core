// Configure Ollama to use your Mac mini endpoint
const OLLAMA_BASE_URL = process.env.OLLAMA_API_URL || 'http://100.111.21.66:11434';

// Available models on your Mac mini (configure as needed)
export const AI_MODELS = {
  chat: 'llama3.3', // For chat/assistant features
  embeddings: 'nomic-embed-text', // For semantic search
  vision: 'llava', // For image analysis
  code: 'deepseek-coder', // For code generation
} as const;

// Helper function to check Ollama connectivity
export async function checkOllamaConnection() {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
    if (!response.ok) throw new Error('Ollama is not reachable');
    const data = await response.json();
    return { connected: true, models: data.models || [] };
  } catch (error) {
    console.error('Ollama connection failed:', error);
    return { connected: false, models: [] };
  }
}

// Generate embeddings for semantic search
export async function generateEmbedding(text: string) {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: AI_MODELS.embeddings,
        prompt: text
      })
    });

    if (!response.ok) throw new Error('Failed to generate embedding');
    const data = await response.json();
    return data.embedding;
  } catch (error) {
    console.error('Embedding generation failed:', error);
    throw error;
  }
}

// Chat with AI
export async function chatWithAI(messages: Array<{ role: string; content: string }>) {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: AI_MODELS.chat,
        messages,
        stream: false
      })
    });

    if (!response.ok) throw new Error('Failed to chat with AI');
    const data = await response.json();
    return data.message.content;
  } catch (error) {
    console.error('Chat with AI failed:', error);
    throw error;
  }
}

// Generate content (for blog posts, descriptions, etc.)
export async function generateContent(prompt: string) {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: AI_MODELS.chat,
        prompt,
        stream: false
      })
    });

    if (!response.ok) throw new Error('Failed to generate content');
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Content generation failed:', error);
    throw error;
  }
}

// Analyze image (for alt text generation, etc.)
export async function analyzeImage(imageBase64: string, prompt: string = "Describe this image in detail") {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: AI_MODELS.vision,
        prompt,
        images: [imageBase64],
        stream: false
      })
    });

    if (!response.ok) throw new Error('Failed to analyze image');
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Image analysis failed:', error);
    throw error;
  }
}