import { Game, MoveDirectionEnum_ENUM } from "@gathertown/gather-game-client";
global.WebSocket = require("isomorphic-ws");

declare var process : {
  env: {
    API_KEY: string,
    SPACE_ID: string
  }
}

const API_KEY = process.env.API_KEY;
const SPACE_ID = process.env.SPACE_ID;

const game = new Game(() => Promise.resolve({ apiKey: API_KEY }));
game.connect(SPACE_ID); // replace with your spaceId of choice
game.subscribeToConnection((connected) => console.log("connected?", connected));

game.subscribeToEvent("playerMoves", (data, context) => {
  if (shouldIStumble()) {
    game.engine.sendAction({
      $case: "move",
      move: {
        dir: moveDirection(),
        stopped: false,
        inputId: 1
      },
    });
  }
});

function shouldIStumble() {
  return Math.floor(Math.random() * 10) < 5;
}

function moveDirection(){
  const randomNumber = Math.floor(Math.random() * 4);

  switch(randomNumber) {
    case 0:
      return MoveDirectionEnum_ENUM.Up;
    case 1:
      return MoveDirectionEnum_ENUM.Right;
    case 2:
      return MoveDirectionEnum_ENUM.Down;
    case 3:
      return MoveDirectionEnum_ENUM.Left;
  }

  return MoveDirectionEnum_ENUM.Dance;
}