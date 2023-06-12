/*
 * React Component that works as a "container"
 * for the GameBoard.
 */

import React from "react";
import { connect } from "react-redux";
import "../App.css";
import TetrisGame from "./TetrisGame";
import DummyCanvas from "./DummyCanvas";

function GameBoardContainer(props) {
  const canvasRef = React.createRef();

  return (
    <div className="GameBoard">
      {props.showDummy && <DummyCanvas />}
      {props.tetrisGame && <TetrisGame canvas={canvasRef} />}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    simpleGame: state.simpleGame,
    aiGame: state.aiGame,
    tetrisGame: state.tetrisGame,
    showDummy: state.showDummy,
  };
}

export default connect(mapStateToProps, null)(GameBoardContainer);
