'use client'
import axios from 'axios'
import React, { useState } from 'react'

const Section1 = () => {
  const [input, setInput] = useState("")
  const [messages,setMessages]=useState([])
const handleSend = async () => {
  const userQuery = input.trim();
  if (!userQuery) return;

  setInput("");

  // Step 1: Add user message immediately with a placeholder for AI
  const newMessage = { user: userQuery, ai: "............" };
  setMessages(prev => [...prev, newMessage]);

  try {
    const response = await axios.post('http://127.0.0.1:8000/', { input: userQuery });
    const aiResponse = response.data.result;

    // Step 2: Update the last message's ai field with actual response
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = { ...updated[updated.length - 1], ai: aiResponse };
      return updated;
    });

  } catch (error) {
    console.error("Error:", error);
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = { ...updated[updated.length - 1], ai: "⚠️ Failed to fetch response." };
      return updated;
    });
  }
};


  return (
    <>
      <section className="bg-black w-3/5 h-screen flex flex-col">
      
        <div className="flex-1 overflow-y-auto flex-col  p-4 text-white space-y-2 ">
{messages.map((msg, index) => (
  <React.Fragment key={index}>
    {/* User Message (Right-Aligned) */}
    <div className="flex justify-end">
      <div className="bg-blue-600 p-3 rounded-xl max-w-xl text-white mb-1">
        {msg.user}
      </div>
    </div>

    {/* AI Message (Left-Aligned) */}
    <div className="flex justify-start">
      <div className="bg-gray-700 p-3 rounded-xl max-w-xl text-white mb-4">
        {msg.ai}
      </div>
    </div>
  </React.Fragment>
))}


        </div>

        <div className="p-4 flex">
          <input
            type="text"
            className="flex-1 p-4  py-4   rounded-full bg-gray-800 text-white outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
        </div>

      </section>
    </>
  )
}

export default Section1
