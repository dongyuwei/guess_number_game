const readline = require('readline');
const { GuessNumberGameEngine } = require("./guess_number_game_engine");

const GameServer = {
  init: function() {
    this.engine = new GuessNumberGameEngine();
    return this;
  },
  startGameEventLoop: function() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    console.log("Guess Number Game, You have 6 chances to guess!");
    rl.on('line', (input) => {
      this.engine.feed(input).play();
    });
  }
};


GameServer.init().startGameEventLoop();