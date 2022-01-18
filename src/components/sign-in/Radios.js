import { GameContext } from "../GameProvider";
import React, { useContext, useState, useEffect } from "react";

// radio inputs to set room to public or private
function Radios() {
  const [publicRoom, setPublicRoom] = useState(true);
  const [privateRoom, setPrivateRoom] = useState(false);
  const { game, setClientGame } = useContext(GameContext);

  function handlePublic() {
    setPublicRoom(!publicRoom);
    setPrivateRoom(!privateRoom);
  }

  useEffect(() => {
    setClientGame({ ...game, public: publicRoom });
    // eslint-disable-next-line
  }, [publicRoom]);

  return (
    <div className="radio-btn-div">
      <input
        type="radio"
        value="public"
        checked={publicRoom}
        onChange={handlePublic}
      />
      <label>public</label>

      <input
        type="radio"
        value="private"
        checked={privateRoom}
        onChange={handlePublic}
      />
      <label>private</label>
    </div>
  );
}

export default Radios;
