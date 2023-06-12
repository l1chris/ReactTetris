/*
 * React Component that encapsulates
 * the container for the Tetromino-Buttons
 * as well as the container for the Gameplay-Buttons
 */

import React from "react";
import "../ComponentStyles.css";
import GameplayButtonsContainer from "./GameplayButtonsContainer";
import TetrominoButtonsContainer from "./TetrominoButtonsContainer";

function GameplayContainer() {
  return (
    <div className="GameplayContainer">
      <TetrominoButtonsContainer />
      <GameplayButtonsContainer />
    </div>
  );
}

export default GameplayContainer;
