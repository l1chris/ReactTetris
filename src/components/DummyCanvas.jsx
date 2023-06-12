/*
 * React Component
 * Shows a blank canvas when no Game-Mode
 * is selected.
 */

import React from "react";
import { connect } from "react-redux";

const CANVAS_WIDTH = 372;
const VISIBLE_CANVAS_START = 74;

class DummyCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
    const cnvs = this.canvasRef.current;
    const ctx = cnvs.getContext("2d");
    ctx.fillStyle = "#908cb7";
    ctx.fillRect(0, 0, CANVAS_WIDTH, VISIBLE_CANVAS_START);
  }

  //=============================================================================
  //                             RENDER
  //=============================================================================

  render() {
    return (
      <div>
        <canvas
          id="canvas"
          style={canvasStyle}
          width="372"
          height="814"
          ref={this.canvasRef}
        ></canvas>
      </div>
    );
  }
}

//=============================================================================
//                               REDUX
//=============================================================================

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {};
}

const canvasStyle = {
  border: "none",
  outline: "none",
  backgroundColor: "#555555",
  borderRadius: "5px",
};

export default connect(mapStateToProps, mapDispatchToProps)(DummyCanvas);
