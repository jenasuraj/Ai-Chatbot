'use client'

import React, { useState } from 'react'

const Section1 = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, input])
      setInput("")
    }
  }

  return (
    <>
      <section className="bg-black w-3/5 h-screen flex flex-col">
        {/* Scrollable message area */}
        <div className="flex-1 overflow-y-auto p-4 text-white space-y-2 ">
          {messages.map((msg, index) => (
            <div key={index} className="bg-gray-800 p-2 rounded-md w-fit max-w-xl">
              {msg}
            </div>
          ))}
        </div>

       
        <div className="p-4   flex">
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
