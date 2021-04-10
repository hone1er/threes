import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../GameProvider";

// radio inputs to set room to public or private
function Radios() {
  const { game, setGame } = useContext(GameContext);
  const [publicRoom, setPublicRoom] = useState(true);
  const [privateRoom, setPrivateRoom] = useState(false);

  function handlePublic() {
    setPrivateRoom(!privateRoom);
    setPublicRoom(!publicRoom);
  }

  useEffect(() => {
    setGame({ ...game, public: publicRoom });
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
      <label>Login</label>

      <input
        type="radio"
        value="private"
        checked={privateRoom}
        onChange={handlePublic}
      />
      <label>register</label>
    </div>
  );
}

export default Radios;
