/*
 * React Component for the ScoreBoard.
 * Displays the current score and lines cleared.
 * These values are received from the store.
 */

import React from "react";
import { connect } from "react-redux";
import "../ComponentStyles.css";

function ScoreBoard(props) {
  return (
    <div className={"ScoreBoard"}>
      <p>SCORE</p>
      <p>{props.score}</p>
      <p>LINES</p>
      <p>{props.lines}</p>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    score: state.score,
    lines: state.lines,
  };
}

export default connect(mapStateToProps, null)(ScoreBoard);
