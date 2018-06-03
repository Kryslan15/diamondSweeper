global.startApp = function(container) {
  console.log("Here is the container:123", container);
  startGame();
}

class DiamondGame  {
  constructor(xMax, yMax, numDiamonds) {
    this.xMax = xMax;
    this.yMax = yMax;
    this.numDiamonds = numDiamonds;
  }
  
  checkDiamond(elem) {
    elem.classList.remove("unknown");
  }

  generateSquares() {
    let self = this;
    let gameBoard = document.querySelector("#main-board");
    let row, col, cDiv;
    for(let i=0; i<this.xMax; i++){
      row = document.createElement("tr");
      gameBoard.append(row);
      for(let j=0; j<this.yMax; j++){
        col = document.createElement("td");
        row.append(col);
        cDiv = document.createElement("div");
        col.append(cDiv);
        cDiv.classList.add("cell");
        cDiv.classList.add("unknown");
        cDiv.addEventListener("click", function() {
          self.checkDiamond(this);
      });
      }
    }
  }
}


class SquareObj { 
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
}

let startGame = () => {
    let game = new DiamondGame(8,8,8);
    game.generateSquares();
};