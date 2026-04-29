// ============================================================
// OpenRouter API Service (OpenAI-compatible)
// Handles all LLM communication with error handling
// ============================================================

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * Send a chat message to OpenRouter API
 * @param {string} systemPrompt - The persona's system prompt
 * @param {Array} messages - Conversation history [{role, content}]
 * @returns {Promise<string>} - The assistant's response text
 */
export async function sendMessage(systemPrompt, messages) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
    throw new Error(
      'API key not configured. Please set VITE_OPENROUTER_API_KEY in your .env file.'
    );
  }

  const payload = {
    model: 'openai/gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    max_tokens: 500,
    temperature: 0.7,
    top_p: 0.9,
  };

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Scaler Persona Chatbot',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.error?.message || `API returned status ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response received from the AI. Please try again.');
    }

    return data.choices[0].message.content;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection and try again.');
    }
    throw error;
  }
}
