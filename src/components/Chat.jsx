import React from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { targetId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([
    { from: "them", text: "Hey there!" },
    { from: "me", text: "Hi, how are you?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { from: "me", text: input }]);
    setInput("");
  };

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetId });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-1/2 mx-auto my-10 border rounded-2xl shadow-md bg-base-100 flex flex-col h-[500px]">
      <div className="p-4 border-b text-xl font-semibold bg-base-200 rounded-t-2xl">
        Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.from === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-xs ${
                msg.from === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-base-200 rounded-b-2xl flex gap-2">
        <input
          type="text"
          className="flex-1 input input-bordered"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

import { useState } from "react";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
