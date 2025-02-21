import { useState } from 'react';
import ChatInput from '../components/ChatInput';
import ChatWindow from '../components/ChatWindow';

export default function ChatInterface() {
    const [messages, setMessages] = useState([]);

    // Handle sending a new message
    const handleSend = async (text) => {
        // Add user's message to chat
        const newMessage = {
            id: Date.now(),
            role: 'user',
            content: text,
        };
        setMessages((prev) => [...prev, newMessage]);

        try {
            // Call backend to get AI's response (Gemini API)
            const response = await fetch(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDpnXmJABjnKonL8EIUaV66aytm16Hwdkk', // Adjust URL as needed
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [{ text: text }],
                            },
                        ],
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                const assistantMessage = {
                    id: Date.now() + 1,
                    role: 'assistant',
                    content: data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.',
                };

                // Add assistant's message to chat
                setMessages((prev) => [...prev, assistantMessage]);
            } else {
                console.error('Error from AI service');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col md:h-screen h-[calc(100vh-72.3px)] md:w-auto w-[calc(100vw-2.1px)]" style={{ boxSizing: 'border-box' }}>
            {/* Chat Window */}
            <ChatWindow messages={messages} />

            {/* Chat Input */}
            <ChatInput onSend={handleSend} />
        </div>
    );
}
