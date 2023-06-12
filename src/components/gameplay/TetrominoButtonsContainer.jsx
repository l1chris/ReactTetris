/*
 * React Component that encapsulates the "Tetromino-Buttons"
 * (the Buttons to spawn a Tetromino)
 */

import React from "react";
import { connect } from "react-redux";
import { spawnTetromino } from "../../redux/actions";
import Button from "../Button";
import "../ComponentStyles.css";

import i from "../../res/i.png";
import j from "../../res/j.png";
import l from "../../res/l.png";
import o from "../../res/o.png";
import s from "../../res/s.png";
import t from "../../res/t.png";
import z from "../../res/z.png";

const TetrominoButtonsContainer = (object) => {
  return (
    <div className="TetrominoButtonsContainer">
      <div className="TetrominoColumn">
        <Button
          className={"Button TetrominoButton"}
          onMouseDown={() => object.click({ type: "i" })}
          onMouseUp={() => object.click({ type: "" })}
        >
          <img alt="i" src={i} width="130"></img>
        </Button>
        <Button
          className={"Button TetrominoButton"}
          onMouseDown={() => object.click({ type: "t" })}
          onMouseUp={() => object.click({ type: "" })}
        >
          <img alt="t" src={t} width="100"></img>
        </Button>
        <Button
          className={"Button TetrominoButton"}
          onMouseDown={() => object.click({ type: "j" })}
          onMouseUp={() => object.click({ type: "" })}
        >
          <img alt="j" src={j} width="100"></img>
        </Button>
        <Button
          className={"Button TetrominoButton"}
          onMouseDown={() => object.click({ type: "o" })}
          onMouseUp={() => object.click({ type: "" })}
        >
          <img alt="o" src={o} width="70"></img>
        </Button>
      </div>
      <div className="TetrominoColumn">
        <Button
          className={"Button TetrominoButton"}
          onMouseDown={() => object.click({ type: "z" })}
          onMouseUp={() => object.click({ type: "" })}
        >
          <img alt="z" src={z} width="100"></img>
        </Button>
        <Button
          className={"Button TetrominoButton"}
          onMouseDown={() => object.click({ type: "s" })}
          onMouseUp={() => object.click({ type: "" })}
        >
          <img alt="s" src={s} width="100"></img>
        </Button>
        <Button
          className={"Button TetrominoButton"}
          onMouseDown={() => object.click({ type: "l" })}
          onMouseUp={() => object.click({ type: "" })}
        >
          <img alt="l" src={l} width="100"></img>
        </Button>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    click: (props) => dispatch(spawnTetromino(props)),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(TetrominoButtonsContainer);
