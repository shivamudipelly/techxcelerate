import  { useState, useEffect } from "react";

const ChatInterface = () => {
  const API_KEY = "AIzaSyD4kIwaTbD_QaSBtNYxfSnFtTachMKIOic"; // Replace with your actual Gemini API Key
  const [messages, setMessages] = useState([{ text: "Hello! How are you feeling today?", sender: "bot" }]);
  const [userInput, setUserInput] = useState("");
  const [, setConversationCount] = useState(0);
  const [previousQuestions, setPreviousQuestions] = useState(new Set());
  const [isExited, setIsExited] = useState(false);
  const [isListening, setIsListening] = useState(false); // State to manage microphone listening
  const [recognition, setRecognition] = useState(null); // State to store the recognition object

  useEffect(() => {
    // Initialize speech recognition API if the browser supports it
    if ("webkitSpeechRecognition" in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.lang = "en-US";
      recognitionInstance.interimResults = true;  // Capture intermediate results
      recognitionInstance.maxAlternatives = 1;
      recognitionInstance.continuous = true;  // Keep listening for a long time

      recognitionInstance.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setUserInput(speechResult); // Set the speech result as user input
      };

      recognitionInstance.onerror = (error) => {
        console.error("Speech recognition error", error);
      };

      setRecognition(recognitionInstance);
    } else {
      console.log("Speech recognition not supported in this browser.");
    }
  }, []);

  const getNextQuestion = async (userResponse) => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Analyze the sentiment of the following response and generate a follow-up question but do not display the sentiment and directly display the question without any tags:
              User: "${userResponse}"

              If the response is *positive*, ask an engaging question to continue the positive mood.  
              If the response is *negative*, ask a comforting question that shows empathy and understanding.  
              If the response is *neutral*, ask a question to get more details.  

              If this is the 10th response, instead of a question, give a *short motivational therapy message*.  
              Ensure the question is different from previous ones.
              `,
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      let botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "That sounds interesting. Can you tell me more?";

      // Check if response is repeated
      if (previousQuestions.has(botResponse)) {
        botResponse = "I see. Tell me more about how you're feeling.";
      } else {
        setPreviousQuestions((prev) => new Set(prev).add(botResponse));
      }

      return botResponse;
    } catch (error) {
      console.error("API Error:", error);
      return "I'm here for you. Can you share more about that?";
    }
  };

  const sendMessage = async () => {
    if (isExited || !userInput.trim()) return; // Stop if the conversation has already exited or input is empty

    // Add user message to the chat
    setMessages((prev) => [...prev, { text: userInput.trim(), sender: "user" }]);
    setUserInput("");
    setConversationCount((prev) => prev + 1);

    // Check if the user wants to exit
    if (userInput.trim().toLowerCase() === "exit") {
      setIsExited(true);
      setMessages((prev) => [
        ...prev,
        {
          text: "Thank you for sharing. Remember, it's okay to feel the way you do. Take care of yourself and reach out if you need help. Goodbye!",
          sender: "bot",
        },
      ]);
      return;
    }

    // Get bot response
    const botResponse = await getNextQuestion(userInput.trim());
    setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
  };

  const toggleListening = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
      setIsListening(!isListening);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        AI Mood Detection & Therapy Chatbot
      </h2>
      <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div id="chatbox" className="h-96 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg mb-2 ${message.sender === "bot" ? "bg-blue-500 text-white text-left" : "bg-gray-200 text-black text-right"}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your response here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isExited || isListening}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={isExited}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Send
          </button>
          <button
            onClick={toggleListening}
            className={`px-4 py-2 ${isListening ? 'bg-red-500' : 'bg-green-500'} text-white rounded-lg hover:bg-opacity-80`}
          >
            {isListening ? "Stop Listening" : "Start Listening"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
