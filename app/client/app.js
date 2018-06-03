global.startApp = function(container) {
  console.log("Here is the container:123", container);
  startGame();
}

class DiamondGame  {

  /*Initialize the game default board values */
  constructor(xMax, yMax, numDiamonds) {
    this.xMax = xMax; // Number of cols
    this.yMax = yMax; // Number of rows
    this.numDiamonds = numDiamonds; // Number of diamonds
  }
  
  /*Check whether the clicked square has a diamond*/
  checkDiamond(elem, diamondPos) {
    let isDiamond = false;
    let x = elem.getAttribute("x");
    let y = elem.getAttribute("y");
    let dIndex;
    
    elem.classList.remove("unknown");

    console.log(diamondPos);
    for(const pos of diamondPos) {
      if(x === pos.split(",")[1] && y === pos.split(",")[0]) {
        elem.classList.add("diamond");
        dIndex = diamondPos.indexOf(pos);
        diamondPos.splice(dIndex, 1);
        isDiamond = true;
        break;
      }
    }
    /*If there is no diamond, show the arrow in the respective direction*/
    if(!isDiamond) {
      let direction = this.getArrowDirection(x, y, diamondPos);
      if(direction){
        elem.classList.add("arrow", `${direction}`);
        setTimeout(function(){
          elem.classList.remove("arrow", `${direction}`);
        }, 2000);
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
        cDiv.setAttribute("y", i);
        cDiv.setAttribute("x", j);
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

  getArrowDirection(x, y, diamondPos) {
    let shortestPos = this.getNearestDiamond (x, y, diamondPos);
    if(!shortestPos){
      return null;
    }
    console.log(shortestPos);
    let xdif = shortestPos.x - x;
    let ydif = shortestPos.y - y;
   
    
    if (xdif< 0 && ydif <0){
       return "top-left";
    }
    if (xdif === 0 && ydif <0) {
      return "top";
    }
    if (xdif > 0 && ydif <0) {
      return "top-right";
    }
    if (xdif < 0 && ydif === 0) {
      return "left";
    }
    if (xdif > 0 && ydif === 0) {
      return "right";
    }
    if (xdif < 0 && ydif >0) {
      return "bottom-left";
    }
    if (xdif == 0 && ydif >0) {
      return "bottom";
    }
    if (xdif > 0 && ydif >0) {
      return "bottom-right";
    }
  }

  getNearestDiamond(x, y, diamondPos){
    if(diamondPos.length<=0){
      return null;
    }
    let tempTotal = 0;
    let shorttestTotal = this.xMax + this.yMax;
    let shortestPos = {};
    let dx;
    let dy;
    for (let z = 0; z < diamondPos.length; z++) 
		{      
      dx = Number(diamondPos[z].split(",")[1]);
      dy = Number(diamondPos[z].split(",")[0]);
      tempTotal = Math.abs(dx - x) + Math.abs(dy - y);
			if (tempTotal < shorttestTotal) {
        shorttestTotal = tempTotal;
        shortestPos.x = dx;
        shortestPos.y = dy;        
			}
    }
    return shortestPos;
  }
}

let startGame = () => {
    let game = new DiamondGame(8,8,8);
    let diamondPos = game.generateDiamonds();
    game.generateSquares(diamondPos);
};