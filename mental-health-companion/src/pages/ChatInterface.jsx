import { useState } from 'react';

import ChatInput from '../components/ChatInput';
import ChatWindow from '../components/ChatWindow';

export default function ChatInterface() {
    const [messages, setMessages] = useState([]);

    const handleSend = (text) => {
        const newMessage = {
            id: Date.now(),
            role: 'user',
            content: text,
        };
        setMessages((prev) => [...prev, newMessage]);

        // Simulate assistant reply
        setTimeout(() => {
            const assistantMessage = {
                id: Date.now() + 1,
                role: 'assistant',
                content: `Echo: ${text}`,
            };
            setMessages((prev) => [...prev, assistantMessage]);
        }, 1000);
    };

    return (
        <div className="flex flex-col md:h-screen  h-[calc(100vh-72.3px)] md:w-auto w-[calc(100vw-2.1px)]" style={{ boxSizing: 'border-box' }}>
            {/* Chat Window */}
            <ChatWindow messages={messages} />

            {/* Chat Input */}
            <ChatInput onSend={handleSend} />
        </div>
    );
}
