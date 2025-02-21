import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Mic, Send, Smile } from "lucide-react"; // Icons for better UX

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const newRecognition =
        "SpeechRecognition" in window
          ? new window.SpeechRecognition()
          : new window.webkitSpeechRecognition();

      newRecognition.continuous = true; // Keep listening until stopped
      newRecognition.interimResults = true; // Show results while speaking
      newRecognition.lang = "en-US";

      newRecognition.onresult = (event) => {
        let finalTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
        setText(finalTranscript.trim());
      };

      newRecognition.onerror = (err) => {
        console.error("Speech recognition error:", err);
        setIsListening(false);
      };

      setRecognition(newRecognition);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const handleVoiceInput = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognition.start();
    }
  };

  return (
    <div className="p-3 bg-white border-t border-gray-300 flex items-center">
      <form className="flex flex-1 items-center bg-gray-100 rounded-full px-3 py-2 shadow-md">
        {/* Emoji Button (optional) */}
        <button type="button" className="text-gray-500 hover:text-gray-700 p-2">
          <Smile size={20} />
        </button>

        {/* Text Input */}
        <input
          type="text"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-transparent px-3 py-2 focus:outline-none text-sm"
        />

        {/* Microphone Button (Always Active Until Stopped) */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`p-2 rounded-full transition ${
            isListening ? "bg-red-500 text-white animate-pulse" : "text-gray-500 hover:bg-gray-200"
          }`}
        >
          <Mic size={20} />
        </button>
      </form>

      {/* Send Button (only appears when text is entered) */}
      {text && (
        <button
          type="submit"
          onClick={handleSubmit}
          className="ml-2 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600"
        >
          <Send size={20} />
        </button>
      )}
    </div>
  );
};

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default ChatInput;