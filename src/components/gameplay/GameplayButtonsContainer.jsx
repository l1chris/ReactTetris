/*
 * React Component that contains the Gameplay-Buttons
 * used to move a Tetromino
 */

import React from "react";
import { connect } from "react-redux";
import { rotateTetromino, moveTetromino } from "../../redux/actions";
import Button from "../Button";

import RotateRightIcon from "@material-ui/icons/RotateRight";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const GameplayButtonsContainer = (object) => {
  return (
    <div className="GameplayButtonsContainer">
      <div className="RotationButtons">
        <Button
          className={"Button GameplayButton"}
          onMouseDown={() => object.rotate({ type: "right" })}
          onMouseUp={() => object.rotate({ type: "" })}
        >
          <RotateRightIcon className="svg_icons" />
        </Button>
        <Button
          className={"Button GameplayButton"}
          onMouseDown={() => object.rotate({ type: "left" })}
          onMouseUp={() => object.rotate({ type: "" })}
        >
          <RotateLeftIcon className="svg_icons" />
        </Button>
      </div>
      <div className="DirectionButtons">
        <Button
          className={"Button GameplayButton"}
          onMouseDown={() => object.move({ type: "left" })}
          onMouseUp={() => object.move({ type: "" })}
        >
          <ArrowBackIcon className="svg_icons" />
        </Button>
        <Button
          className={"Button GameplayButton"}
          onMouseDown={() => object.move({ type: "down" })}
          onMouseUp={() => object.move({ type: "" })}
        >
          <ArrowDownwardIcon className="svg_icons" />
        </Button>
        <Button
          className={"Button GameplayButton"}
          onMouseDown={() => object.move({ type: "right" })}
          onMouseUp={() => object.move({ type: "" })}
        >
          <ArrowForwardIcon className="svg_icons" />
        </Button>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    rotate: (props) => dispatch(rotateTetromino(props)),
    move: (props) => dispatch(moveTetromino(props)),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(GameplayButtonsContainer);
