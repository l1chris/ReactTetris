/*
 * React "App"-Component
 * -> encapsulates the ControlButtonsContainer, the GameBoardContainer
 * and the GameplayButtonsContainer
 * Also contains the Redux-Store and its Reducer and Initial-State.
 */

import React from "react";
import "./App.css";
import ControlButtonsContainer from "./components/control/ControlButtonsContainer";
import GameBoardContainer from "./components/GameBoardContainer";
import GameplayContainer from "./components/gameplay/GameplayContainer";

import { createStore } from "redux";
import { Provider } from "react-redux";
import {
  UPDATE_SCOREBOARD,
  STOP_GAME,
  START_GAME,
  SPAWN_TETROMINO,
  ROTATE_TETROMINO,
  MOVE_TETROMINO,
} from "./redux/actionTypes";

const initialState = {
  score: 0,
  lines: 0,
  stopGame: false,
  startGame: false,
  tetrominoType: "",
  rotateDirection: "",
  moveDirection: "",
  aiGame: false,
  showDummy: true,
  tetrisGame: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SCOREBOARD:
      let x = action.payload.score;
      let y = action.payload.lines;
      return { ...state, score: x, lines: y };
    case START_GAME:
      return {
        ...state,
        startGame: true,
        stopGame: false,
        tetrominoType: "",
        tetrisGame: true,
        aiGame: false,
        showDummy: false,
        simpleGame: false,
      };
    case STOP_GAME:
      return {
        ...state,
        startGame: false,
        stopGame: true,
        score: 0,
        lines: 0,
      };
    case SPAWN_TETROMINO:
      let t = action.payload.type;
      return { ...state, tetrominoType: t };
    case ROTATE_TETROMINO:
      let rotateDir = action.payload.type;
      return { ...state, rotateDirection: rotateDir };
    case MOVE_TETROMINO:
      let moveDir = action.payload.type;
      return { ...state, moveDirection: moveDir };
    default:
      return state;
  }
};
const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div>
          <ControlButtonsContainer />
        </div>
        <GameBoardContainer />
        <div>
          <GameplayContainer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
