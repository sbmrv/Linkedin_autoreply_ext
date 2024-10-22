import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import './popup/App.css';

/**
 * Chat message type
 */
interface ChatMessage {
  type: 'user' | 'ai';
  text: string;
}

/**
 * Chat modal component
 * @param onHide Function to hide the modal
 * @param onInsertMessage Function to insert the generated message into the page
 */
const ChatModal = ({ onHide, onInsertMessage }: { onHide: () => void; onInsertMessage: (message: string) => void }) => {
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isRegenerateMode, setIsRegenerateMode] = useState<boolean>(false);

  /**
   * Function to simulate AI message generation
   */
  const generateAISuggestion = () => {
    const userQuery: ChatMessage = { type: 'user', text: userInput };
    const aiSuggestion: ChatMessage = {
      type: 'ai',
      text: "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
    };

    setChatLog((prevChatLog) => [...prevChatLog, userQuery, aiSuggestion]);
    setUserInput('');
    setIsRegenerateMode(true);
    setIsRegenerateMode(true);
  };

  return (
      <div
        style={{
          backgroundColor: 'white',
          padding: '24px', // Equivalent to p-6
          borderRadius: '8px', // Equivalent to rounded-lg
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Equivalent to shadow-lg
          zIndex: 40,
          width: '500px',
          maxHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Chat window with auto-growing height */}
        <div
          style={{
            overflowY: 'auto',
            maxHeight: '400px',
            flexGrow: 1,
          }}
        >
          {chatLog.map((message, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  margin: '8px 0',
                  padding: '8px',
                  borderRadius: '8px',
                  maxWidth: '75%',
                  backgroundColor: message.type === 'user' ? '#E5E7EB' : '#BFDBFE', // bg-gray-100 and bg-blue-100
                  color: message.type === 'user' ? 'black' : 'black',
                  textAlign: message.type === 'user' ? 'right' : 'left',
                  alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input section */}
        <div style={{ marginTop: '16px', display: "flex" }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{
              width: '80%',
              borderRadius: '4px', // rounded-md
              border: 'none',
              padding: '8px',
              color: '#1F2937', // text-gray-900
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // shadow-sm
              borderColor: '#D1D5DB', // ring-inset ring-gray-300
              backgroundColor: 'white',
            }}
            placeholder="Your prompt"
          />
        {chatLog.length > 0 && (
          <button
            onClick={() => {
              setChatLog([]);
            }}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#880000',
              padding: '4px 8px',
              borderRadius: '8px',
              alignItems: 'center',
            }}
          >
            <img
              src={`${browser.runtime.getURL('icon/cross-icon.svg' as any)}`}
              style={{
                marginRight: '4px',
                width: '12px',
                height: '12px',
              }}
            />
            Clear All
          </button>
        )}
        </div>

        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '16px', fontSize: '1.5rem', fontWeight: '600' }}>
          {/* Insert button to send the last AI message back */}
          {chatLog.length > 0 && (
            <button
              onClick={() => {
                onInsertMessage(chatLog[chatLog.length - 1].text);
              }}
              style={{
                backgroundColor: 'white',
                border: '1px solid #6B7280', // ring-inset ring-gray-500
                color: '#A1A1AA', // text-gray-500
                padding: '8px 16px', // px-4 py-2
                borderRadius: '8px', // rounded
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={`${browser.runtime.getURL('icon/insert-icon.svg' as any)}`}
                style={{
                  marginRight: '8px',
                  width: '24px',
                  height: '24px',
                }}
              />
              Insert
            </button>
          )}

          {/* Button section */}
          <button
            onClick={generateAISuggestion}
            disabled={userInput.length < 1}
            style={{
              backgroundColor: userInput.length < 1 ? '#A1A1AA' : '#3B82F6', // disabled:bg-gray-500 and bg-blue-500
              color: 'white',
              padding: '8px 16px', // px-4 py-2
              borderRadius: '8px', // rounded
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.5rem',
              fontWeight: '600',
            }}
          >
            <img
              src={`${browser.runtime.getURL(isRegenerateMode ? 'icon/regenerate-icon.svg' : 'icon/Arrow-icon.svg' as any)}`}
              alt={isRegenerateMode ? 'Regenerate Icon' : 'Generate Icon'}
              style={{
                marginRight: '8px',
                width: '24px',
                height: '24px',
              }}
            />
            {isRegenerateMode ? 'Regenerate' : 'Generate'}
          </button>
        </div>
      </div>

  );
};

export default ChatModal;


