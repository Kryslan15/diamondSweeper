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
  
  /*Check whether the clicked square has a diamond*/
  checkDiamond(elem, diamondPos) {
    elem.classList.remove("unknown");
    let isDiamond = false;
    let x = elem.getAttribute("x");
    let y = elem.getAttribute("y");
    for(const pos of diamondPos) {
      if(x === pos.split(",")[0] && y === pos.split(",")[1]) {
        elem.classList.add("diamond");
        isDiamond = true;
        break;
      }
    }
    /*If there is no diamond, show the arrow in the respective direction*/
    if(!isDiamond) {
      let direction = this.getArrowDirection(x, y);
      elem.classList.add("arrow", `${direction}`);
      setTimeout(function(){
        elem.classList.remove("arrow", `${direction}`);
      }, 2000);      
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
        cDiv.setAttribute("x", i);
        cDiv.setAttribute("y", j);
        cDiv.addEventListener("click", function() {
          self.checkDiamond(this, diamondPos);
      });
      }
    }
  }

  generateDiamonds() {
    let count = 0;
    let randId;
    let diamondPositions = [];
    while(this.numDiamonds !== diamondPositions.length) {
      randId = `${Math.floor(Math.random() * this.xMax)},${Math.floor(Math.random() * this.yMax)}`;
			if (diamondPositions.indexOf(randId) === -1) {
        diamondPositions.push(randId);
        count+= 1;
      }
    }
    return diamondPositions;
  }

  getArrowDirection() {
   // this.getNearestDiamond (i, j);
    return "left";
  }

  getNearestDiamond(){
    let tempX = 0;
		let tempY = 0;
  }

}

let startGame = () => {
    let game = new DiamondGame(8,8,8);
    let diamondPos = game.generateDiamonds();
    game.generateSquares(diamondPos);
};