import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider";
import { ChatDiv } from "./styledComponents/ChatDiv";
import chatAudio from "../intuition.mp3"
export default function Chat() {
  const { sock, player } = useContext(GameContext);

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleEnterKey(event) {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("chat-btn").click();
  }
}

  function sendMessage() {
    sock.emit("sendMessage", player + ": " + message);
    const el = document.createElement("li");
    el.innerHTML = player + ": " + message;
    document.querySelector("#chat").appendChild(el);
    setMessage("");
    const elem = document.getElementById("chat");
    elem.scrollTop = elem.scrollHeight;
  }

  useEffect(() => {
    const el = document.createElement("li");
    el.innerHTML = chat[chat.length - 1] || "";
    document.getElementById("chat").appendChild(el);
    const elem = document.getElementById("chat");
    elem.scrollTop = elem.scrollHeight;
    return () => {
    var audio = new Audio(chatAudio);
    audio.play();
    }
  }, [chat]);

  sock.on("receiveMessage", (chat) => {
  
    setChat(chat);
  });

  return (
    <ChatDiv>
      <h1>chat</h1>
      <ul id="chat"></ul>
      <div id="chat-input-div">
      <input
        id="chat-input"
        value={message}
        onChange={handleChange}
        placeholder="Enter message"
        onKeyUp={handleEnterKey}
      ></input>
      <button id="chat-btn" disabled={message.length === 0} onClick={sendMessage}>
        send
      </button>
      </div>
    </ChatDiv>
  );
}
