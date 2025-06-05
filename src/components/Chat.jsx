import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { targetId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetId,
      text: input,
    });
    setInput("");
  };

  useEffect(() => {
    if (!user) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName: user.firstName, userId, targetId });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + " " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetId]);

  return (
    <div className="w-1/2 mx-auto my-10 border border-gray-600 rounded-2xl shadow-md bg-base-100 flex flex-col h-[70vh]">
      <h1 className="p-4 border-b text-xl font-semibold bg-base-200 rounded-t-2xl border-gray-600">
        Chat
      </h1>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => {
          return (
            <div className="chat chat-start" key={index}>
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50 ml-2">2 hours ago</time>
              </div>
              <div className="chat-bubble"> {msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>

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
