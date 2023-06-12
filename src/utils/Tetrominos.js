/*
 * In this file the various Tetrominos are stored each as an object
 * with their name, color and shape.
 * The file also contains two getters for the shape and color of a
 * Tetromino.
 */

export const tetrominos = [
  {
    name: "t",
    color: "purple",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  {
    name: "o",
    color: "yellow",
    shape: [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    name: "j",
    color: "blue",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  {
    name: "i",
    color: "cyan",
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    name: "l",
    color: "orange",
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  {
    name: "z",
    color: "red",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
  },
  {
    name: "s",
    color: "green",
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
  },
];

/*
 * It is important to "clone" the shape, otherwise
 * Javascript would assign by reference which
 * is a problem when performing rotations.
 */
export const getTetrominoShape = (name) => {
  let shape;
  for (let i = 0; i < tetrominos.length; i++) {
    if (tetrominos[i].name === name) {
      shape = JSON.parse(JSON.stringify(tetrominos[i].shape));
      return shape;
    }
  }
};

export const getTetrominoColor = (name) => {
  for (let i = 0; i < tetrominos.length; i++) {
    if (tetrominos[i].name === name) {
      return tetrominos[i].color;
    }
  }
};

export const tetrominoBlock = [
  {
    name: "BLOCK",
    color: "yellow",
    shape: [
      [0, 1, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  },
];
