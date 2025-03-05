import React, { useState } from 'react';

function DeepSeekComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const API_KEY = "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";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    
    setLoading(true);
    const timestamp = new Date().toLocaleTimeString();
    setMessages(prev => [...prev, { role: 'user', content: input, timestamp }]);
    setInput('');

    try {
      const apiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'My React App',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat',
          messages: [{ role: 'user', content: input }],
          stream: false,
        }),
      });

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        throw new Error(`API request failed: ${apiResponse.status} - ${errorText}`);
      }

      const data = await apiResponse.json();
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.choices[0].message.content,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } catch (error) {
      console.error('Error Details:', error.message);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${error.message}`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>Chat</h2>
        <button 
          onClick={clearChat}
          style={{
            padding: '6px 12px',
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Clear Chat
        </button>
      </div>
      
      <div style={{
        width: '100%',
        height: '400px',
        overflowY: 'auto',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '15px',
        backgroundColor: '#fafafa',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              margin: '12px 0',
              display: 'flex',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-start'
            }}
          >
            <div style={{
              maxWidth: '70%',
            }}>
              <div style={{
                fontSize: '12px',
                color: '#666',
                marginBottom: '4px',
                textAlign: msg.role === 'user' ? 'right' : 'left'
              }}>
                {msg.role === 'user' ? 'You' : 'Assistant'} • {msg.timestamp}
              </div>
              <div style={{
                padding: '10px 15px',
                backgroundColor: msg.role === 'user' ? '#007bff' : '#ffffff',
                color: msg.role === 'user' ? 'white' : '#333',
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: msg.role === 'assistant' ? '1px solid #ddd' : 'none'
              }}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && <p style={{ textAlign: 'center', color: '#666', margin: '10px 0' }}>Loading...</p>}
      
      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        marginTop: '15px', 
        gap: '10px' 
      }}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          disabled={loading}
          placeholder="Type your message..."
          style={{ 
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{ 
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default DeepSeekComponent;