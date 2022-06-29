const prompt = require("prompt-sync")({ sigint: true });
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
let newGame = '';

class Field {
  constructor(rows, columns, difficulty) {
    this.rows = rows;
    this.columns = columns;
    this.difficulty = difficulty;
    this.field = [];
    this.userX = 0;
    this.userY = 0;
    this.fieldGrid = [];
    this.gamveOver = false;
  }

  generateField() {
    let percentOfHoles = 0;
    this.difficulty = "easy";
    //create holes, based on number of cells
    if (this.difficulty === "easy") {
      percentOfHoles = Math.floor(this.rows * this.columns * 0.15);
    }
    if (this.difficulty === "normal") {
      percentOfHoles = Math.floor(this.rows * this.columns * 0.25);
    }
    if (this.difficulty === "hard") {
      percentOfHoles = Math.floor(this.rows * this.columns * 0.35);
    }

    //create game background
    for (let x = 0; x < this.rows; x++) {
      this.fieldGrid[x] = [];
      for (let y = 0; y < this.columns; y++) {
        this.fieldGrid[x][y] = fieldCharacter;
      }
    }

    //create user start point
    this.fieldGrid[this.userY][this.userX] = pathCharacter;

    //create Hat location
    let hatX = Math.floor(Math.random() * this.rows);
    let hatY = Math.floor(Math.random() * this.columns);
    while ((hatX === 0) & (hatY === 0)) {
      hatX = Math.floor(Math.random() * this.rows);
      hatY = Math.floor(Math.random() * this.columns);
    }
    while (this.fieldGrid[hatX][hatY] === hole) {
      hatX = Math.floor(Math.random() * this.rows);
      hatY = Math.floor(Math.random() * this.columns);
    }
    this.fieldGrid[hatX][hatY] = hat;

    //create Holes
    for (let i = 0; i < percentOfHoles; i++) {
      let holeX = Math.floor(Math.random() * this.rows);
      let holeY = Math.floor(Math.random() * this.columns);

      while ((holeX === 0) & (holeY === 0)) {
        holeX = Math.floor(Math.random() * this.rows);
        holeY = Math.floor(Math.random() * this.columns);
      }
      while (this.fieldGrid[holeX][holeY] === pathCharacter) {
        holeX = Math.floor(Math.random() * this.rows);
        holeY = Math.floor(Math.random() * this.columns);
      }
      while (this.fieldGrid[holeX][holeY] === hat) {
        holeX = Math.floor(Math.random() * this.rows);
        holeY = Math.floor(Math.random() * this.columns);
      }
      this.fieldGrid[holeX][holeY] = hole;
    }
    this.field = this.fieldGrid;
  }

  printField() {
    console.clear();
    for (let row of this.field) {
      console.log(row.join(" "));
    }
  }
  //error method when player go out of the grid
  gridError () {
    console.log("Do not go out of the grid, you lost. try again..");
    this.gamveOver = true;
    newGame = prompt("new game?(y or n): ");
    console.log(newGame);
    switch (newGame) {
      case "y":
      case "Y":
      case "yes":
      case "Yes":
        this.userX = 0;
        this.userY = 0;
        this.gamveOver = false;
        this.generateField();
        this.play();
      break;
      default:
        break;
    }
  }

  checkState() {
    try {
      switch (this.fieldGrid[this.userY][this.userX]) {
        case hat:
          console.log("Nice job, you win");
          this.gamveOver = true;
          newGame = prompt("new game?(y or n): ");
          console.log(newGame);
          switch (newGame) {
            case "y":
            case "Y":
            case "yes":
            case "Yes":
              this.userX = 0;
              this.userY = 0;
              this.gamveOver = false;
              // new Field(10, 10, "easy");
              this.generateField();
              this.play();
              break;
          }
        break;
        case hole:
          console.log("Stay away from holes,you lost :(");
          this.gamveOver = true;
          newGame = prompt("new game?(y or n): ");
          console.log(newGame);
          switch (newGame) {
            case "y":
            case "Y":
            case "yes":
            case "Yes":
              this.userX = 0;
              this.userY = 0;
              this.gamveOver = false;
              // new Field(10, 10, "easy");
              this.generateField();
              this.play();
              break;
          }
        break;
        case fieldCharacter:
        break;
        default:
          this.gridError();
        break;
      }
    } catch(err) {
      console.log("Do not go out of the grid, you lost. try again..");
          this.gamveOver = true;
          newGame = prompt("new game?(y or n): ");
          console.log(newGame);
          switch (newGame) {
            case "y":
            case "Y":
            case "yes":
            case "Yes":
              this.userX = 0;
              this.userY = 0;
              this.gamveOver = false;
              this.generateField();
              this.play();
            break;
          }
    }
  }

  play() {
    this.printField();

    while (this.gamveOver === false) {
      const direction = prompt("Which direction? ");
        switch (direction) {
          case "w":
          case "W":
            this.userY--;
            this.checkState();
            this.fieldGrid[this.userY][this.userX] = pathCharacter;
            this.printField();
            break;
          case "s":
          case "S":
            this.userY++;
            this.checkState();
            this.fieldGrid[this.userY][this.userX] = pathCharacter;
            this.printField();
            break;
          case "a":
          case "A":
            this.userX--;
            this.checkState();
            this.fieldGrid[this.userY][this.userX] = pathCharacter;
            this.printField();
            break;
          case "d":
          case "D":
            this.userX++;
            this.checkState();
            this.fieldGrid[this.userY][this.userX] = pathCharacter;
            this.printField();
            break;
        }
    }
  }
}

//choose grid size and difficulty then run the game
const fyh = new Field(25, 25, "normal"); //ex: new Field(number, number, "easy|normal|hard")
fyh.generateField();
fyh.play();
