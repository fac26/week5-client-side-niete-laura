//import React from "react";
import TryAgainLogo from "../assets/try-again.gif";

const GameOverlay = ({onRestart, board}) => {
if (board.hasWon()) {
  return <div className="tile2048" />;
} else if (board.hasLost()) {
  return <div className="gameOver" onClick={onRestart}>
     <img 
        src={TryAgainLogo} 
        alt="pointer"
        style={{
          width:'100%',
          height:'100%',
          cursor: "pointer",
        }}
      />
    </div>;
}

return null;
};

export default GameOverlay;