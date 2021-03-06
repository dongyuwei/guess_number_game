const readline = require('readline');
const { GuessNumberGameEngine } = require("./guess_number_game_engine");

function clearScreen() {
  process.stdout.write('\u001B[2J\u001B[0;0f');
}

const GameServer = {
  init: function() {
    this.engine = new GuessNumberGameEngine();
    if(process.env.DEBUG === "ON") {
      console.log('init digital sequence:', this.engine.digitalSequence);
    }
    return this;
  },
  startGameEventLoop: function() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    console.log("Guess Number Game, You have 6 chances to guess!");
    rl.on('line', (input) => {
      clearScreen();
      this.engine.feed(input).play();
      this.engine.printGameRecords();

      if(this.engine.isGameOver()) {
        if(this.engine.victory()) {
          console.log("you guessed the number!")
        }
        process.exit(0);
      }
    });
  }
};


GameServer.init().startGameEventLoop();