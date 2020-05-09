import React, { useEffect } from "react";
import chatAudio from "../intuition.mp3";
const audio = new Audio(chatAudio);

function Sound({ chat, chatSound }) {
  useEffect(() => {
    if (chatSound === true) {
      document.getElementById("sound").click();
    }
  }, [chat, chatSound]);

  function handleClick() {
    audio.play();
  }
  return (
    <div id="sound-div">
      <button id="sound" onClick={handleClick}></button>
    </div>
  );
}

export default Sound;
