import  { useState } from 'react';
import PropTypes from 'prop-types';

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div className="p-4 border-t border-gray-300 bg-white">
      <form className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
          Send
        </button>
      </form>
    </div>
  );
};

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default ChatInput;
