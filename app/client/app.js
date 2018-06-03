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
  
  checkDiamond(elem, diamondPos) {
    elem.classList.remove("unknown");
    console.log(diamondPos)
    for(const pos of diamondPos) {
      console.log("id", elem.id);
      console.log("pos", `${pos.x}-${pos.y}`);
      if(elem.id === `${pos.x}-${pos.y}`) {
        elem.classList.add("diamond");
        break;
      }
      
    }
  }

  generateSquares(diamondPos) {
    let self = this;
    let gameBoard = document.querySelector("#main-board");
    let row, col, cDiv;
    for(let i=0; i<this.xMax; i++) {
      row = document.createElement("tr");
      gameBoard.append(row);
      for(let j=0; j<this.yMax; j++){
        col = document.createElement("td");
        row.append(col);
        cDiv = document.createElement("div");
        col.append(cDiv);
        cDiv.classList.add("cell");
        cDiv.classList.add("unknown");
        cDiv.id = `${i}-${j}`;
        cDiv.addEventListener("click", function() {
          self.checkDiamond(this, diamondPos);
      });
      }
    }
  }

  generateDiamonds() {
    let randX;
    let randY;
    let diamondPositions = [];
    for (let i = 0; i < this.numDiamonds; i++) {
			randX = Math.floor(Math.random() * this.xMax);
			randY = Math.floor(Math.random() * this.yMax);
      diamondPositions.push({x: randX, y: randY});
    }
    return diamondPositions;
  }
}

let startGame = () => {
    let game = new DiamondGame(8,8,8);
    let diamondPos = game.generateDiamonds();
    game.generateSquares(diamondPos);
};