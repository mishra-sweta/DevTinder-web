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

  useEffect(() => {
    if (!user) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetId });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetId]);

  return (
    <div className="w-1/2 mx-auto my-10 border rounded-2xl shadow-md bg-base-100 flex flex-col h-[500px]">
      <div className="p-4 border-b text-xl font-semibold bg-base-200 rounded-t-2xl">
        Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => {
          return (
            <div className="chat chat-start" key={index}>
              <div className="chat-header">
                Ankita
                <time className="text-xs opacity-50 ml-2">2 hours ago</time>
              </div>
              <div className="chat-bubble">You were the Chosen One!</div>
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
        />
        <button className="btn btn-primary">Send</button>
      </div>
    </div>
  );
};

export default Chat;
