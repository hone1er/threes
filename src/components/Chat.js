import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChatDiv } from "../styledComponents/ChatDiv";
import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";
import { MdSend } from "react-icons/md";
import Sound from "./Sound";
import GiphyModal from "./GiphyModal";

export default function Chat({
  sock,
  connection,
  gifs = false,
  sound = false,
  game,
  index,
}) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const [gif, setGif] = useState(undefined);
  const [chatSound, setChatSound] = useState(true);
  const [displayAddress, setDisplayAddress] = useState();
  const chatBottom = useCallback(
    (node) => {
      if (node !== null) {
        console.log("HEIGHT: ", node.getBoundingClientRect().height);
        node.scrollTop = node.getBoundingClientRect().height + 100000000;
      }
    },
    [chat, message]
  );
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
  function closePreview() {
    if (gif) {
      const preview = document.getElementById("gif-preview");
      while (preview.childNodes.length > 0) {
        preview.removeChild(preview.childNodes[0]);
      }
      setGif(undefined);
    }
    return;
  }

  function sendMessage() {
    const messageHolder = gif
      ? {
          message: message,
          title: gif.title,
          embed_url: gif.embed_url,
          url: gif.url,
        }
      : { message: message };

    sock && sock.emit("sendMessage", [displayAddress, messageHolder]);
    setMessage("");
    let tempChat = chat;
    tempChat.push([displayAddress, messageHolder]);
    setChat(tempChat);
    closePreview();
  }

  let gifPreviewElement;
  if (gif) {
    gifPreviewElement = (
      <div id="gif-preview">
        <span className="gif-close" onClick={closePreview}>
          &times;
        </span>
        <div className="inner-preview">
          <iframe
            title={gif.title}
            src={gif.embed_url}
            width="240"
            height="180"
            frameBorder="0"
            className="giphy-embed"
          ></iframe>
          <p>
            <a href={gif.url}>via GIPHY</a>
          </p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const playerName = connection?.userAddress
      ? connection.ens || connection.userAddress
      : "";
    // eslint-disable-next-line
    if (
      playerName.includes(".eth") ||
      playerName === "" ||
      playerName === "Not connected"
    ) {
      setDisplayAddress(playerName);
    } else {
      setDisplayAddress(
        `${playerName.substring(0, 4)}...${playerName.substring(
          playerName.length - 4
        )}`.toLowerCase()
      );
    }
    // eslint-disable-next-line
  }, [chat, connection.ens]);

  useEffect(() => {
    setChat(game.chat);
    return () => {};
  }, [game.chat]);

  sock &&
    sock.on("receiveMessage", (chat) => {
      console.log("RECIEVED: ", chat);
      setChat(chat);
    });

  return (
    <ChatDiv className="chat-area">
      <h1>chat</h1>
      <ul ref={chatBottom} id="chatRoom">
        {chat &&
          chat.slice(index).map((message, idx) => {
            if (message)
              return (
                <li key={idx}>
                  {idx === 0 ? (
                    <p
                      className={
                        message[0] === displayAddress ? "user" : "otherPlayer"
                      }
                    >
                      {message[0]}
                    </p>
                  ) : chat[idx][0] === chat[idx - 1][0] ? null : (
                    <p
                      className={
                        message[0] === displayAddress ? "user" : "otherPlayer"
                      }
                    >
                      {message[0]}
                    </p>
                  )}

                  <p
                    className={
                      message[0] === displayAddress ? "message" : "otherMessage"
                    }
                  >
                    {message[1].message}

                    {message[1]?.title && (
                      <>
                        <br />
                        <iframe
                          title={message[1].title}
                          src={message[1].embed_url}
                          width="262"
                          height="198"
                          frameBorder="0"
                          className="giphy-embed"
                        ></iframe>
                        <a href={message[1].url}>via GIPHY</a>
                      </>
                    )}
                  </p>
                </li>
              );
          })}
      </ul>
      <div id="chat-input-div">
        {gif ? gifPreviewElement : null}
        <div id="gif-preview"></div>
        <div id="input-div">
          <input
            id="chat-input"
            value={message}
            onChange={handleChange}
            placeholder="Enter message"
            onKeyUp={handleEnterKey}
          ></input>
          <button
            id="chat-btn"
            disabled={message.length === 0 && gif === undefined}
            onClick={sendMessage}
          >
            <MdSend />
          </button>
        </div>
        <div className="buttonWrapper">
          {gifs && <GiphyModal className="giphy-modal" setGif={setGif} />}
          {sound && (
            <button id="chat-mute" onClick={handleSound}>
              {chatSound ? <GoUnmute /> : <GoMute />}
            </button>
          )}
        </div>
      </div>
      {sound && <Sound chat={chat} chatSound={chatSound} />}
    </ChatDiv>
  );
}
