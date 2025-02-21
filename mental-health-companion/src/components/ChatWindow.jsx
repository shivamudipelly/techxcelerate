import PropTypes from 'prop-types';

const ChatWindow = ({ messages }) => (
  <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
    <div className="flex flex-col space-y-4">
      {messages.map((msg, index) => (
        <div
          key={msg.id || index}
          className={`p-3 rounded shadow max-w-md ${
            msg.role === 'assistant' ? 'self-start bg-white' : 'self-end bg-blue-500 text-white'
          }`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  </div>
);

ChatWindow.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.oneOf(['assistant', 'user']).isRequired,
      content: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};

export default ChatWindow;
