import { useState, useRef, useEffect, useCallback } from 'react';
import personas from './data/personas';
import { sendMessage } from './services/api';
import './index.css';

// ============================================================
// Scaler Persona Chat — Main Application
// ============================================================

function App() {
  const [activePersona, setActivePersona] = useState('anshuman');
  const [conversations, setConversations] = useState({
    anshuman: [],
    abhimanyu: [],
    kshitij: [],
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const persona = personas[activePersona];
  const messages = conversations[activePersona];

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when persona switches
  useEffect(() => {
    inputRef.current?.focus();
  }, [activePersona]);

  // Switch persona and reset conversation
  const handlePersonaSwitch = useCallback((personaId) => {
    if (personaId === activePersona) return;
    setActivePersona(personaId);
    setConversations((prev) => ({
      ...prev,
      [personaId]: [],
    }));
    setError(null);
    setInputValue('');
  }, [activePersona]);

  // Send a message
  const handleSend = useCallback(async (messageText) => {
    const text = (messageText || inputValue).trim();
    if (!text || isLoading) return;

    setInputValue('');
    setError(null);

    // Add user message
    const userMessage = { role: 'user', content: text };
    setConversations((prev) => ({
      ...prev,
      [activePersona]: [...prev[activePersona], userMessage],
    }));

    setIsLoading(true);

    try {
      const currentMessages = [...conversations[activePersona], userMessage];
      const response = await sendMessage(persona.systemPrompt, currentMessages);

      const assistantMessage = { role: 'assistant', content: response };
      setConversations((prev) => ({
        ...prev,
        [activePersona]: [...prev[activePersona], assistantMessage],
      }));
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, activePersona, conversations, persona]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  // Handle textarea key press (Enter to send, Shift+Enter for newline)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle suggestion chip click
  const handleSuggestion = (suggestion) => {
    handleSend(suggestion);
  };

  // Retry last failed message
  const handleRetry = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      // Remove the last user message to re-send
      setConversations((prev) => ({
        ...prev,
        [activePersona]: prev[activePersona].slice(0, -1),
      }));
      handleSend(lastUserMsg.content);
    }
  };

  // CSS custom properties for accent color
  const accentStyles = {
    '--accent-color': persona.accentColor,
    '--accent-bg': `${persona.accentColor}15`,
    '--accent-border': `${persona.accentColor}33`,
    '--accent-glow': `${persona.accentColor}25`,
  };

  return (
    <div className="app" style={accentStyles}>
      {/* Background gradient */}
      <div className="app-bg" />

      {/* Header */}
      <header className="header" id="app-header">
        <div className="header__brand">
          <div className="header__logo">S</div>
          <div>
            <div className="header__title">Persona Based AI Chatbot by Kiran Nagaraj</div>
          </div>
        </div>
        <div className="active-persona-badge" id="active-persona-badge">
          <span className="active-persona-badge__dot" />
          <span>Chatting with {persona.name}</span>
        </div>
      </header>

      {/* Persona Switcher Tabs */}
      <nav className="persona-switcher" id="persona-switcher" role="tablist" aria-label="Select persona">
        {Object.values(personas).map((p) => (
          <button
            key={p.id}
            id={`persona-tab-${p.id}`}
            className={`persona-tab ${activePersona === p.id ? 'persona-tab--active' : ''}`}
            onClick={() => handlePersonaSwitch(p.id)}
            role="tab"
            aria-selected={activePersona === p.id}
            style={activePersona === p.id ? {
              '--accent-color': p.accentColor,
              '--accent-bg': `${p.accentColor}15`,
              '--accent-glow': `${p.accentColor}25`,
              borderColor: p.accentColor,
            } : {}}
          >
            <img
              className="persona-tab__avatar"
              src={p.avatar}
              alt={p.name}
              style={activePersona === p.id ? { borderColor: p.accentColor } : {}}
            />
            <div className="persona-tab__info">
              <span className="persona-tab__name">{p.name}</span>
              <span className="persona-tab__role">{p.role}</span>
            </div>
          </button>
        ))}
      </nav>

      {/* Chat Container */}
      <div className="chat-container" id="chat-container">
        <div className="messages" id="messages-area">
          {messages.length === 0 && !isLoading ? (
            /* Welcome Screen */
            <div className="welcome" id="welcome-screen">
              <img
                className="welcome__avatar"
                src={persona.avatar}
                alt={persona.name}
                style={{ borderColor: persona.accentColor, boxShadow: `0 0 30px ${persona.accentColor}33` }}
              />
              <h1 className="welcome__greeting">Chat with {persona.name}</h1>
              <p className="welcome__tagline">{persona.tagline}. Ask me anything about tech, education, career, or my journey.</p>
              <div className="welcome__suggestions" id="suggestion-chips">
                {persona.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="suggestion-chip"
                    id={`suggestion-${activePersona}-${index}`}
                    onClick={() => handleSuggestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages */
            <>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message message--${msg.role}`}
                  id={`message-${index}`}
                >
                  {msg.role === 'assistant' ? (
                    <img
                      className="message__avatar"
                      src={persona.avatar}
                      alt={persona.name}
                    />
                  ) : (
                    <div className="message__user-icon">👤</div>
                  )}
                  <div
                    className="message__bubble"
                    style={msg.role === 'user' ? { background: persona.accentColor } : {}}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="typing-indicator" id="typing-indicator">
                  <img
                    className="message__avatar"
                    src={persona.avatar}
                    alt={`${persona.name} is typing`}
                  />
                  <div className="typing-indicator__bubble">
                    <span className="typing-indicator__dot" />
                    <span className="typing-indicator__dot" />
                    <span className="typing-indicator__dot" />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="error-message" id="error-message">
                  <span className="error-message__icon">⚠️</span>
                  <span>{error}</span>
                  <button className="error-message__retry" onClick={handleRetry}>
                    Retry
                  </button>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area" id="input-area">
          <form className="input-area__form" onSubmit={handleSubmit}>
            <div className="input-area__wrapper">
              <textarea
                ref={inputRef}
                id="message-input"
                className="input-area__input"
                placeholder={`Ask ${persona.name} something...`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={isLoading}
                aria-label="Type your message"
              />
            </div>
            <button
              type="submit"
              className="input-area__send"
              id="send-button"
              disabled={isLoading || !inputValue.trim()}
              style={{ background: persona.accentColor }}
              aria-label="Send message"
            >
              ➤
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
