/*
 * React Component
 * A Tetris Game in which the user plays.
 */

import React from "react";
import { connect } from "react-redux";
import { updateScore, stopGame } from "../redux/actions";
import { getTetrominoShape, getTetrominoColor } from "../utils/Tetrominos";
import { pausibleInterval } from "../utils/pausibleInterval";
import { getWallKickSetI, getWallKickSet } from "../utils/WallKickSets";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT_NORMAL,
  BLOCK_SIZE,
  VISIBLE_CANVAS_START,
} from "../utils/globals.js";

class TetrisGame extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.startX = 3;
    this.startY = 0;
    this.numberOfRows = 10;
    this.numberOfColumns = 22;
    this.coordinateArray = [...Array(this.numberOfRows)].map((e) =>
      Array(this.numberOfColumns)
    );
    this.gameBoardArray = [...Array(this.numberOfRows)].map((e) =>
      Array(this.numberOfColumns)
    );
    this.tetrominoActive = false;
    this.rotationState = "O";
  }

  state = {
    key: "",
    score: 0,
    linesCompleted: 0,
    firstRowOccupied: false,
    secondRowOccupied: false,
    firstRowOccupiedI: false,
    secondRowOccupiedI: false,
    firstRowOccupiedO: false,
    secondRowOccupiedO: false,
    gameInProgress: false,
    stopGame: false,
    startGame: false,
    tetrominoType: "",
  };

  componentDidMount() {
    const cnvs = this.canvasRef.current;
    const ctx = cnvs.getContext("2d");
    ctx.fillStyle = "#908cb7";
    ctx.fillRect(0, 0, CANVAS_WIDTH, VISIBLE_CANVAS_START);
    ctx.font = "25px Arial";
    ctx.fillStyle = "aliceblue";
    ctx.textAlign = "center";
    ctx.fillText("-- Choose a Tetromino --", cnvs.width / 2, cnvs.height / 2);
  }

  componentDidUpdate() {
    if (this.props.stopGame) {
      if (this.state.gameInProgress) {
        this.setState((currentState) => {
          return { gameInProgress: false };
        });
        this.tetrominoPlayed();
        this.gameOver();
      }
    }
    if (this.props.startGame) {
      if (!this.state.gameInProgress) {
        this.startGame();
        this.setState((currentState) => {
          return { gameInProgress: true, score: 0, linesCompleted: 0 };
        });
      }
    }
    if (this.props.tetrominoType && this.state.gameInProgress) {
      if (!this.tetrominoActive) {
        this.setState((currentState) => {
          return { tetrominoType: this.props.tetrominoType };
        });
        this.spawnNewTetromino();
      }
    }
    if (this.props.rotateDirection && this.tetrominoActive) {
      this.handleRotation(this.props.rotateDirection);
    }
    if (this.props.moveDirection && this.tetrominoActive) {
      this.handleMove(this.props.moveDirection);
    }
  }

  componentWillUnmount() {
    if (this.state.gameInProgress) {
      this.setState(() => {
        return { gameInProgress: false };
      });
      this.tetrominoPlayed();
      this.gameOver();
    }
  }

  //=============================================================================
  //                           GAME FLOW
  //=============================================================================

  startGame = () => {
    const cnvs = this.canvasRef.current;
    const ctx = cnvs.getContext("2d");
    ctx.clearRect(0, VISIBLE_CANVAS_START, CANVAS_WIDTH, CANVAS_HEIGHT_NORMAL);
    ctx.fillStyle = "#908cb7";
    ctx.fillRect(0, 0, CANVAS_WIDTH, VISIBLE_CANVAS_START);
    this.createCoordinateArray();
    this.fillGameBoardArray();
    this.drawGameBoard();
  };

  gameOver() {
    clearInterval(this.updateInterval);
    if (typeof this.gameInterval !== "undefined") {
      this.gameInterval.stop();
    }
    this.unsetOccupiedRows();
    this.drawGameOverScreen();
    this.props.gameOver();
  }

  spawnNewTetromino = () => {
    this.tetrominoActive = true;
    this.curTetromino = getTetrominoShape(this.props.tetrominoType);
    this.curTetrominoColor = getTetrominoColor(this.props.tetrominoType);

    this.gameInterval = new pausibleInterval(this.dropDown, 500);

    this.startX = 3;
    this.setSpawnPositionY(this.props.tetrominoType);
    this.drawTetromino();
  };

  setSpawnPositionY = (tetrominoType) => {
    switch (tetrominoType) {
      case "i":
        if (this.state.firstRowOccupiedI) {
          this.startY = 0;
        } else if (this.state.secondRowOccupiedI) {
          this.startY = 1;
        } else {
          this.startY = 2;
        }
        break;
      case "o":
        if (this.state.firstRowOccupiedO) {
          this.startY = 0;
        } else if (this.state.secondRowOccupiedO) {
          this.startY = 1;
        } else {
          this.startY = 2;
        }
        break;
      default:
        if (this.state.firstRowOccupied) {
          this.startY = 0;
        } else if (this.state.secondRowOccupied) {
          this.startY = 1;
        } else {
          this.startY = 2;
        }
    }
  };

  tetrominoPlayed = () => {
    clearInterval(this.updateInterval);
    if (typeof this.gameInterval !== "undefined") {
      this.gameInterval.stop();
    }
    this.setState((currentState) => {
      return { tetrominoType: "" };
    });
    this.tetrominoActive = false;
  };

  unsetOccupiedRows = () => {
    this.setState((currentState) => {
      return {
        firstRowOccupied: false,
        secondRowOccupied: false,
        firstRowOccupiedI: false,
        secondRowOccupiedI: false,
        firstRowOccupiedO: false,
        secondRowOccupiedO: false,
      };
    });
  };

  setOccupiedRows = (x, y) => {
    // Determine Occupied Rows For T, L, J, S, Z
    if (y === 2 && (x === 3 || x === 4 || x === 5)) {
      this.setState((currentState) => {
        return { firstRowOccupied: true };
      });
    }
    if (y === 3 && (x === 3 || x === 4 || x === 5)) {
      this.setState((currentState) => {
        return { secondRowOccupied: true };
      });
    }

    // Determine Occupied Rows For I
    if (y === 2 && (x === 3 || x === 4 || x === 5 || x === 6)) {
      this.setState((currentState) => {
        return { firstRowOccupiedI: true };
      });
    }
    if (y === 3 && (x === 3 || x === 4 || x === 5 || x === 6)) {
      this.setState((currentState) => {
        return { secondRowOccupiedI: true };
      });
    }

    // Determine Occupied Rows For O
    if (y === 2 && (x === 4 || x === 5)) {
      this.setState((currentState) => {
        return { firstRowOccupiedO: true };
      });
    }
    if (y === 3 && (x === 4 || x === 5)) {
      this.setState((currentState) => {
        return { secondRowOccupiedO: true };
      });
    }
  };

  dropDown = () => {
    for (let i = 0; i < this.curTetromino.length; i++) {
      for (let j = 0; j < this.curTetromino.length; j++) {
        if (this.curTetromino[i][j] === 1) {
          let x = j + this.startX;
          let y = i + this.startY;
          if (y === 21 || this.gameBoardArray[x][y + 1].occupied === 1) {
            for (let k = 0; k < this.curTetromino.length; k++) {
              for (let l = 0; l < this.curTetromino.length; l++) {
                if (this.curTetromino[k][l] === 1) {
                  let x = l + this.startX;
                  let y = k + this.startY;
                  this.gameBoardArray[x][y].occupied = 1;
                  this.gameBoardArray[x][y].color = this.curTetrominoColor;
                  this.setOccupiedRows(x, y);
                  if (y === 0 || y === 1) {
                    this.setState((currentState) => {
                      return { gameInProgress: false };
                    });
                    this.gameOver();
                  }
                }
              }
            }
            let completedLinesArray = this.checkForCompletedLines(
              this.getCurrentGameBoard()
            );
            if (completedLinesArray.length > 0) {
              this.updateScores(completedLinesArray.length);
              this.drawGameBoard(completedLinesArray);
            }
            this.tetrominoPlayed();
            return;
          }
        }
      }
    }
    this.deleteTetromino();
    this.startY++;
    this.drawTetromino();
  };

  handleMove = (direction) => {
    switch (direction) {
      case "left":
        if (this.inBoundaries("left") && !this.leftCollision()) {
          this.deleteTetromino();
          this.startX--;
          this.drawTetromino();
        }
        break;
      case "right":
        if (this.inBoundaries("right") && !this.rightCollision()) {
          this.deleteTetromino();
          this.startX++;
          this.drawTetromino();
        }
        break;
      case "down":
        if (this.inBoundaries("down") && !this.downCollision()) {
          this.deleteTetromino();
          this.startY++;
          this.drawTetromino();
          /*
          this.setState((currentState) => {
            return { score: currentState.score + 1 };
          });
          */
          this.props.update({
            score: this.state.score,
            lines: this.state.linesCompleted,
          });
        }
        break;
      default:
        break;
    }
  };

  handleRotation = (direction) => {
    let nextRotationState = this.nextStateRotationRight();
    this.performRotation(nextRotationState, direction);
  };

  updateScores(completedLines) {
    let newLinesCompleted = this.state.linesCompleted;
    let newScore = this.state.score;
    newLinesCompleted += completedLines;
    switch (completedLines) {
      case 1:
        newScore += 100;
        break;
      case 2:
        newScore += 300;
        break;
      case 3:
        newScore += 500;
        break;
      case 4:
        newScore += 800;
        break;
      default:
    }
    this.setState((currentState) => {
      return { linesCompleted: newLinesCompleted, score: newScore };
    });
    this.props.update({
      score: this.state.score,
      lines: this.state.linesCompleted,
    });
  }

  checkForCompletedLines(gameboard) {
    let completedLinesArray = [];
    for (let i = 0; i < this.numberOfColumns; i++) {
      for (let j = 0; j < this.numberOfRows; j++) {
        if (gameboard[j][i] !== 1) {
          break;
        }
        if (j === 9) {
          completedLinesArray.push(i);
        }
      }
    }
    return completedLinesArray;
  }

  //=============================================================================
  //                           GAME SETUP
  //=============================================================================

  createCoordinateArray() {
    let i = 0;
    let j = 0;
    for (let y = 2; y <= 810; y += 37) {
      for (let x = 2; x <= 370; x += 37) {
        this.coordinateArray[i][j] = new Coordinates(x, y);
        i++;
      }
      j++;
      i = 0;
    }
  }

  fillGameBoardArray() {
    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        this.gameBoardArray[i][j] = { occupied: 0, color: "" };
      }
    }
  }

  getCurrentGameBoard() {
    let curGameBoard = [...Array(this.numberOfRows)].map((e) =>
      Array(this.numberOfColumns)
    );
    // Set all entries to 0
    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        curGameBoard[i][j] = 0;
      }
    }
    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        if (this.gameBoardArray[i][j].occupied === 1) {
          curGameBoard[i][j] = 1;
        }
      }
    }
    if (!this.tetrominoActive) {
      return curGameBoard;
    }
    // Set entries corresponding to tetromino-position to 1
    for (let i = 0; i < this.curTetromino.length; i++) {
      for (let j = 0; j < this.curTetromino.length; j++) {
        if (this.curTetromino[i][j] === 1) {
          let x = j + this.startX;
          let y = i + this.startY;
          curGameBoard[x][y] = 1;
        }
      }
    }
    return curGameBoard;
  }

  //=============================================================================
  //                   DRAWING THE TETROMINO / GAMEBOARD
  //=============================================================================

  drawTetromino() {
    const cnvs = this.canvasRef.current;
    const ctx = cnvs.getContext("2d");
    for (let i = 0; i < this.curTetromino.length; i++) {
      for (let j = 0; j < this.curTetromino.length; j++) {
        if (this.curTetromino[i][j] === 1) {
          let x = j + this.startX;
          let y = i + this.startY;
          let coorX = this.coordinateArray[x][y].x;
          let coorY = this.coordinateArray[x][y].y;
          if (coorY > VISIBLE_CANVAS_START) {
            ctx.fillStyle = this.curTetrominoColor;
            ctx.fillRect(coorX, coorY, BLOCK_SIZE, BLOCK_SIZE);
          }
        }
      }
    }
  }

  deleteTetromino() {
    const cnvs = this.canvasRef.current;
    const ctx = cnvs.getContext("2d");
    for (let i = 0; i < this.curTetromino.length; i++) {
      for (let j = 0; j < this.curTetromino.length; j++) {
        if (this.curTetromino[i][j] === 1) {
          let x = j + this.startX;
          let y = i + this.startY;
          let coorX = this.coordinateArray[x][y].x;
          let coorY = this.coordinateArray[x][y].y;
          if (coorY > VISIBLE_CANVAS_START) {
            ctx.fillStyle = "#555555";
            ctx.fillRect(coorX, coorY, BLOCK_SIZE, BLOCK_SIZE);
          }
        }
      }
    }
  }

  drawGameBoard(completedLinesArray) {
    if (typeof completedLinesArray !== "undefined") {
      let newGameBoard = [];
      newGameBoard = this.gameBoardArray;
      while (completedLinesArray.length > 0) {
        let lineToRemove = completedLinesArray.shift();
        for (let j = 0; j < this.numberOfRows; j++) {
          let columnCopy = newGameBoard[j];
          let p1 = columnCopy.slice(0, lineToRemove);
          let p2 = columnCopy.slice(lineToRemove + 1);
          let newColumn = p1.concat(p2);
          newColumn.unshift({ occupied: 0, color: "" });
          newGameBoard[j] = newColumn;
        }
      }
      this.gameBoardArray = newGameBoard;
      this.unsetOccupiedRows();
    }
    // Redraw the GameBoard
    const cnvs = this.canvasRef.current;
    const ctx = cnvs.getContext("2d");
    ctx.clearRect(0, VISIBLE_CANVAS_START, CANVAS_WIDTH, CANVAS_HEIGHT_NORMAL);
    for (let i = 0; i < this.numberOfRows; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        if (this.gameBoardArray[i][j].occupied === 1) {
          this.setOccupiedRows(i, j);
          let coorX = this.coordinateArray[i][j].x;
          let coorY = this.coordinateArray[i][j].y;
          ctx.fillStyle = this.gameBoardArray[i][j].color;
          ctx.fillRect(coorX, coorY, BLOCK_SIZE, BLOCK_SIZE);
        }
      }
    }
  }

  drawGameOverScreen = () => {
    const cnvs = this.canvasRef.current;
    const ctx = cnvs.getContext("2d");
    ctx.clearRect(0, VISIBLE_CANVAS_START, CANVAS_WIDTH, CANVAS_HEIGHT_NORMAL);
    ctx.font = "25px Arial";
    ctx.fillStyle = "aliceblue";
    ctx.textAlign = "center";
    var gameOverText = `-- Game Over --\n\nScore: ${this.state.score}\nCompleted Lines: ${this.state.linesCompleted}`;
    var lineheight = 30;
    var lines = gameOverText.split("\n");
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], cnvs.width / 2, cnvs.height / 2 + i * lineheight);
    }
  };

  //=============================================================================
  //                          COLLISION DETECTION
  //=============================================================================

  /**
   * Returns true if in the Treomino is still inside
   * the Game-Boundaries after making a move to
   * the left/right/down. Otherwise returns false.
   * @param {string} direction
   */
  inBoundaries(direction) {
    for (let i = 0; i < this.curTetromino.length; i++) {
      for (let j = 0; j < this.curTetromino.length; j++) {
        if (this.curTetromino[i][j] === 1) {
          let x = j + this.startX;
          let y = i + this.startY;
          if (
            (x <= 0 && direction === "left") ||
            (x >= 9 && direction === "right") ||
            (y >= 21 && direction === "down")
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  /**
   * @returns true if there is a collision with another Tetromino
   */
  leftCollision() {
    for (let i = 0; i < this.curTetromino.length; i++) {
      for (let j = 0; j < this.curTetromino.length; j++) {
        if (this.curTetromino[i][j] === 1) {
          let x = j + this.startX;
          let y = i + this.startY;
          if (x > 1 && this.gameBoardArray[x - 1][y].occupied === 1) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * @returns true if there is a collision with another Tetromino
   */
  rightCollision() {
    for (let i = 0; i < this.curTetromino.length; i++) {
      for (let j = 0; j < this.curTetromino.length; j++) {
        if (this.curTetromino[i][j] === 1) {
          let x = j + this.startX;
          let y = i + this.startY;
          if (x < 9 && this.gameBoardArray[x + 1][y].occupied === 1) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * @returns true if there is a collision with another Tetromino
   */
  downCollision() {
    for (let i = 0; i < this.curTetromino.length; i++) {
      for (let j = 0; j < this.curTetromino.length; j++) {
        if (this.curTetromino[i][j] === 1) {
          let x = j + this.startX;
          let y = i + this.startY;
          if (this.gameBoardArray[x][y + 1].occupied === 1) {
            return true;
          }
        }
      }
    }
    return false;
  }

  //=============================================================================
  //                          ROTATION-HANDLING
  //=============================================================================

  nextStateRotationRight = () => {
    switch (this.rotationState) {
      case "O":
        return "R";
      case "R":
        return "2";
      case "L":
        return "O";
      case "2":
        return "L";
      default:
        // TODO Handle Error in Code
        return "O";
    }
  };

  performRotation = (nextRotationState, direction) => {
    if (this.curTetrominoColor === "yellow") {
      return;
    }
    this.gameInterval.pause();
    this.deleteTetromino();

    // If the rotation fails, the we will draw the unrotated shape
    let oldShape = JSON.parse(JSON.stringify(this.curTetromino));
    // Determine Transition
    let transition = `${this.rotationState}->${nextRotationState}`;
    // Get Wall-Kick Set for transition
    let set;
    if (this.curTetrominoColor === "cyan") {
      set = getWallKickSetI(transition);
    } else {
      set = getWallKickSet(transition);
    }

    // Rotate Tetromino-Shape
    if (direction === "left") {
      this.curTetromino.forEach((row) => row.reverse());
    }

    for (let i = 0; i < this.curTetromino.length; i++) {
      for (let j = 0; j < i; j++) {
        [this.curTetromino[i][j], this.curTetromino[j][i]] = [
          this.curTetromino[j][i],
          this.curTetromino[i][j],
        ];
      }
    }
    if (direction === "right") {
      this.curTetromino.forEach((row) => row.reverse());
    }

    // Try positions for WallKickSet
    let possible = false;
    let setLength = 5;
    for (let i = 1; i <= setLength; i++) {
      let x = set[i].x;
      let y = set[i].y;
      // Perform WallKick
      if (this.rotationPossible(x, y)) {
        this.startX += x;
        this.startY += y;
        possible = true;
        break;
      }
    }
    // TODO: "possible" can be deleted ?
    if (possible) {
      this.rotationState = nextRotationState;
    } else {
      this.curTetromino = oldShape;
    }
    this.drawTetromino();
    this.gameInterval.resume();
  };

  rotationPossible = (x, y) => {
    for (let i = 0; i < this.curTetromino.length; i++) {
      for (let j = 0; j < this.curTetromino.length; j++) {
        if (this.curTetromino[i][j] === 1) {
          let newX = j + this.startX + x;
          let newY = i + this.startY + y;
          // Out of Bounds
          if (newX < 0 || newX > 9 || newY > 21) {
            return false;
          }
          // GameBoard occupied
          if (this.gameBoardArray[newX][newY].occupied === 1) {
            return false;
          }
        }
      }
    }
    return true;
  };

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
  return {
    update: (props) => dispatch(updateScore(props)),
    gameOver: () => dispatch(stopGame()),
    dispatch,
  };
}

function mapStateToProps(state) {
  return {
    stopGame: state.stopGame,
    startGame: state.startGame,
    tetrominoType: state.tetrominoType,
    rotateDirection: state.rotateDirection,
    moveDirection: state.moveDirection,
  };
}

class Coordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const canvasStyle = {
  border: "none",
  outline: "none",
  backgroundColor: "#555555",
  borderRadius: "5px",
};

export default connect(mapStateToProps, mapDispatchToProps)(TetrisGame);
