import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Message from "./Message";

const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [username, setUsername] = useState("");
  const [chatActive, setChatActive] = useState(false);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit("sendMessage", { text: messageText });
    setMessageText("");
  };

  return (
    <>
      <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        {chatActive ? (
          <div className="w-screen h-screen flex flex-col justify-between">
            <h1 className="font-bold flex justify-center items-center">
              Chat Room
            </h1>
            <div className="w-full h-5/6 flex flex-col justify-between">
              <div className="w-full h-full flex flex-col justify-end items-center">
                <div className="w-full h-full overflow-y-scroll flex flex-col justify-end items-center">
                  {messages.map((item, index) => (
                    <Message key={index} items={item} />
                  ))}
                </div>
              </div>
              <div className="w-full h-1/6 flex justify-center items-center">
                <input
                  type="text"
                  className="outline-none text-center border-2 rounded-md p-2"
                  value={messageText}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Enter your message..."
                />
                <button
                  onClick={sendMessage}
                  className="ml-2 bg-orange-400 text-white px-4 py-2 rounded-md"
                >
                  Send
                </button>
              </div>
            </div>
            <div className="w-full h-1/6 flex justify-center items-center">
              <p className="text-gray-500">
                You are logged in as{" "}
                <span className="font-bold">{username}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="w-screen h-screen flex justify-center items-center">
            <input
              type="text"
              className="outline-none text-center border-2 rounded-md p-2"
              value={username}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  username.length >= 3 && setChatActive(true);
              }}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username..."
            />
            <button
              onClick={() => username.length >= 3 && setChatActive(true)}
              className="ml-2 bg-orange-400 text-white px-4 py-2 rounded-md"
            >
              Start Chat
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
