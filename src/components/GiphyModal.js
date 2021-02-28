import React, { useState } from "react";
import { ModalDiv } from "../styledComponents/ModalDiv";
import { PrimaryBtn } from "../styledComponents/PrimaryBtn";
import ReactGiphySearchbox from "react-giphy-searchbox";

export default function GiphyModal(props) {
  const [gifModalState, setGifModalState] = useState(true);

  function sendGif(obj) {
    setGifModalState(!gifModalState);
    props.setGif(obj);
  }

  // Get the modal
  var gifModal = document.getElementsByClassName("gifModal")[0];
  // When the user clicks on the button, open the modal
  function handleButtonClick() {
    setGifModalState(!gifModalState);
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === gifModal) {
      setGifModalState(!gifModalState);
    }
  };

  function handleGiphyEnter(event) {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("gifBtn").click();
    }
  }
  return (
    <ModalDiv className={props.class} modal={gifModalState}>
      <PrimaryBtn
        className="gifBtn"
        onClick={handleButtonClick}
        id="gifBtn"
        tabIndex="0"
        onKeyUp={handleGiphyEnter}
      >
        GIFs
      </PrimaryBtn>

      <div id="myModal" className="modal gifModal">
        <div className="modal-content gifContent">
          <span onClick={handleButtonClick} className="close">
            &times;
          </span>
          <ReactGiphySearchbox
            apiKey="Is2BWZVtVFQshcll1slyZ1MUeLkBhKlJ" // Required: get your on https://developers.giphy.com
            onSelect={(item) => sendGif(item, gifModalState)}
            masonryConfig={[
              { columns: 2, imageWidth: 140, gutter: 10 },
              { mq: "700px", columns: 3, imageWidth: 200, gutter: 10 },
              { mq: "1000px", columns: 4, imageWidth: 220, gutter: 10 },
            ]}
            rating="r"
          />
        </div>
      </div>
    </ModalDiv>
  );
}
