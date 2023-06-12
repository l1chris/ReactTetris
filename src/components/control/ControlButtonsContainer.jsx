/*
 * React Component that works as a "container"
 * - for the Control-Buttons (Start, Stop, AI)
 * - the ScoreBoard
 */

import React from "react";
import { connect } from "react-redux";
import {
  stopGame,
  startGame,
} from "../../redux/actions";
import ScoreBoard from "./ScoreBoard";
import Button from "../Button";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";

function ControlButtonsContainer(object) {
  return (
    <div className="ControlButtonColumn">
      <Button className="Button ControlButton" onClick={() => object.start()}>
        <PlayArrowIcon className="svg_icons" />
      </Button>
      <Button className="Button ControlButton" onClick={() => object.stop()}>
        <StopIcon className="svg_icons" />
      </Button>
      <ScoreBoard></ScoreBoard>
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    stop: () => dispatch(stopGame()),
    start: () => dispatch(startGame()),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(ControlButtonsContainer);
