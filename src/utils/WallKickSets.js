/*
 * In this file sets for Wall-Kicks are stored
 * The Wall-Kicks are implemented according to the
 * Tetris Super-Rotation-System: https://tetris.wiki/Super_Rotation_System
 */

// Set For I
const wallKickSetI = [
  {
    transition: "O->R",
    set: {
      1: { x: 0, y: 0 },
      2: { x: -2, y: 0 },
      3: { x: 1, y: 0 },
      4: { x: -2, y: -1 },
      5: { x: 1, y: 2 },
    },
  },
  {
    transition: "R->O",
    set: {
      1: { x: 0, y: 0 },
      2: { x: 2, y: 0 },
      3: { x: -1, y: 0 },
      4: { x: 2, y: 1 },
      5: { x: -1, y: -2 },
    },
  },
  {
    transition: "R->2",
    set: {
      1: { x: 0, y: 0 },
      2: { x: -1, y: 0 },
      3: { x: 2, y: 0 },
      4: { x: -1, y: 2 },
      5: { x: 2, y: -1 },
    },
  },
  {
    transition: "2->R",
    set: {
      1: { x: 0, y: 0 },
      2: { x: 1, y: 0 },
      3: { x: -2, y: 0 },
      4: { x: 1, y: -2 },
      5: { x: -2, y: 1 },
    },
  },
  {
    transition: "2->L",
    set: {
      1: { x: 0, y: 0 },
      2: { x: 2, y: 0 },
      3: { x: -1, y: 0 },
      4: { x: 2, y: 1 },
      5: { x: -1, y: -2 },
    },
  },
  {
    transition: "L->2",
    set: {
      1: { x: 0, y: 0 },
      2: { x: -2, y: 0 },
      3: { x: 1, y: 0 },
      4: { x: -2, y: -1 },
      5: { x: 1, y: 2 },
    },
  },
  {
    transition: "L->O",
    set: {
      1: { x: 0, y: 0 },
      2: { x: 1, y: 0 },
      3: { x: -2, y: 0 },
      4: { x: 1, y: -2 },
      5: { x: -2, y: 1 },
    },
  },
  {
    transition: "O->L",
    set: {
      1: { x: 0, y: 0 },
      2: { x: -1, y: 0 },
      3: { x: 2, y: 0 },
      4: { x: -1, y: 2 },
      5: { x: 2, y: -1 },
    },
  },
];

export const getWallKickSetI = (searchedTransition) => {
  for (let i = 0; i < wallKickSetI.length; i++) {
    if (wallKickSetI[i].transition === searchedTransition) {
      console.log("Set found: " + wallKickSetI[i]);
      return wallKickSetI[i].set;
    }
  }
};

// Set For the Rest
const wallKickSet = [
  {
    transition: "O->R",
    set: {
      1: { x: 0, y: 0 },
      2: { x: -1, y: 0 },
      3: { x: -1, y: 1 },
      4: { x: 0, y: -2 },
      5: { x: -1, y: -2 },
    },
  },
  {
    transition: "R->O",
    set: {
      1: { x: 0, y: 0 },
      2: { x: 1, y: 0 },
      3: { x: 1, y: -1 },
      4: { x: 0, y: 2 },
      5: { x: 1, y: 2 },
    },
  },
  {
    transition: "R->2",
    set: {
      1: { x: 0, y: 0 },
      2: { x: 1, y: 0 },
      3: { x: 1, y: -1 },
      4: { x: 0, y: 2 },
      5: { x: 1, y: 2 },
    },
  },
  {
    transition: "2->R",
    set: {
      1: { x: 0, y: 0 },
      2: { x: -1, y: 0 },
      3: { x: -1, y: 1 },
      4: { x: 0, y: -2 },
      5: { x: -1, y: -2 },
    },
  },
  {
    transition: "2->L",
    set: {
      1: { x: 0, y: 0 },
      2: { x: 1, y: 0 },
      3: { x: 1, y: 1 },
      4: { x: 0, y: -2 },
      5: { x: 1, y: -2 },
    },
  },
  {
    transition: "L->2",
    set: {
      1: { x: 0, y: 0 },
      2: { x: -1, y: 0 },
      3: { x: -1, y: -1 },
      4: { x: 0, y: 2 },
      5: { x: -1, y: 2 },
    },
  },
  {
    transition: "L->O",
    set: {
      1: { x: 0, y: 0 },
      2: { x: -1, y: 0 },
      3: { x: -1, y: -1 },
      4: { x: 0, y: 2 },
      5: { x: -1, y: 2 },
    },
  },
  {
    transition: "O->L",
    set: {
      1: { x: 0, y: 0 },
      2: { x: 1, y: 0 },
      3: { x: 1, y: 1 },
      4: { x: 0, y: -2 },
      5: { x: 1, y: -2 },
    },
  },
];

export const getWallKickSet = (searchedTransition) => {
  for (let i = 0; i < wallKickSet.length; i++) {
    if (wallKickSet[i].transition === searchedTransition) {
      return wallKickSet[i].set;
    }
  }
};
