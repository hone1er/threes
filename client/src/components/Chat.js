import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider";

export default function Chat() {
  const { sock } = useContext(GameContext);

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function sendMessage() {
    sock.emit("sendMessage", message);
    const el = document.createElement("li");
    el.innerHTML = message;
    document.querySelector("#chat").appendChild(el);
  }

  useEffect(() => {
    const el = document.createElement("li");
    el.innerHTML = chat[chat.length - 1];
    document.getElementById("chat").appendChild(el);
  }, [chat]);

  sock.on("receiveMessage", (chat) => {
    setChat(chat);
  });

  return (
    <div>
      <ul id="chat"></ul>
      <input
        value={message}
        onChange={handleChange}
        placeholder="Enter message"
      ></input>
      <button disabled={message.length === 0} onClick={sendMessage}>
        send
      </button>
    </div>
  );
}
