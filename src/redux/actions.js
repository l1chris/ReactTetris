/**
 * This file contains the actions for
 * the Redux-Store.
 */

import {
  UPDATE_SCOREBOARD,
  ROTATE_TETROMINO,
  MOVE_TETROMINO,
  STOP_GAME,
  START_GAME,
  SPAWN_TETROMINO,
} from "./actionTypes";

export const updateScore = (content) => ({
  type: UPDATE_SCOREBOARD,
  payload: {
    score: content.score,
    lines: content.lines,
  },
});

export const stopGame = (content) => ({
  type: STOP_GAME,
});

export const startGame = (content) => ({
  type: START_GAME,
});

export const spawnTetromino = (content) => ({
  type: SPAWN_TETROMINO,
  payload: {
    type: content.type,
  },
});

export const rotateTetromino = (content) => ({
  type: ROTATE_TETROMINO,
  payload: {
    type: content.type,
  },
});

export const moveTetromino = (content) => ({
  type: MOVE_TETROMINO,
  payload: {
    type: content.type,
  },
});
