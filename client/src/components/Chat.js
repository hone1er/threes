import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider";
import { ChatDiv } from "./styledComponents/ChatDiv";
import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";
import { MdSend } from "react-icons/md";
import Sound from "./Sound";

export default function Chat() {
  const { sock, player } = useContext(GameContext);

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [chatSound, setChatSound] = useState(true);

  function handleSound() {
    setChatSound(!chatSound);
  }

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
    let tempChat = chat;
    tempChat.push(message);
    setChat(tempChat);
  }
  useEffect(() => {
    const el = document.createElement("li");
    el.innerHTML = chat[chat.length - 1] || "";
    document.getElementById("chat").appendChild(el);
    const elem = document.getElementById("chat");
    elem.scrollTop = elem.scrollHeight;
    // eslint-disable-next-line
  }, [chat]);

  sock.on("receiveMessage", (chat) => {
    setChat(chat);
  });

  return (
    <ChatDiv className="chat-area">
      <h1>chat</h1>
      <ul id="chat"></ul>
      <div id="chat-input-div">
        <div>
          <input
            id="chat-input"
            value={message}
            onChange={handleChange}
            placeholder="Enter message"
            onKeyUp={handleEnterKey}
          ></input>
          <button
            id="chat-btn"
            disabled={message.length === 0}
            onClick={sendMessage}
          >
            <MdSend />
          </button>
        </div>
        <button id="chat-mute" onClick={handleSound}>
          {chatSound ? <GoUnmute /> : <GoMute />}
        </button>
      </div>
      <Sound chat={chat} chatSound={chatSound} />
    </ChatDiv>
  );
}
