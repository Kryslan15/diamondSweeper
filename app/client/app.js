global.startApp = function(container) {
  console.log("Here is the container:123", container);
  startGame();
}

class DiamondGame  {

  /** Initialize the game default board values */
  constructor(xMax, yMax, numDiamonds) {
    this.xMax = xMax; // Number of cols
    this.yMax = yMax; // Number of rows
    this.numDiamonds = numDiamonds; // Number of diamonds
    this.maxScore = xMax * yMax; // The max score of the game
    this.gameOver = false;
  }
  
  /** Check whether the clicked square has a diamond*/
  checkDiamond(elem, diamondPos) {

    /** If the square is already checked, then don't check again*/
    if(elem.classList.contains("done") || this.gameOver)
    {
      return;
    }

    let isDiamond = false;
    let x = elem.getAttribute("x");
    let y = elem.getAttribute("y");
    let dIndex;  

    elem.classList.remove("unknown");
    elem.classList.add("done");
    this.maxScore -= 1;
    document.querySelector("#score").innerHTML = this.maxScore;

    /** Check the array which contains the diamond position, if the clicked position contains in it */
    for(const pos of diamondPos) {
      if(x === pos.split(",")[1] && y === pos.split(",")[0]) {
        elem.classList.add("diamond");
        dIndex = diamondPos.indexOf(pos);
        diamondPos.splice(dIndex, 1);
        isDiamond = true;
        break;
      }
    }
    if(diamondPos.length === 0) {
      document.querySelector("#message").innerHTML = "GAME OVER!"
      document.querySelector("#score-section").classList.add("score-blink");
      this.gameOver = true;
      return;
    }
    /** If there is no diamond, show the arrow in the respective direction*/
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

  /** Generate the nxn squares with n diamonds dynamically */
  generateSquares(diamondPos) {
    let self = this;
    let gameBoard = document.querySelector("#main-board");
    let row, col, cDiv, handler;
    
    /** For each row */
    for(let i=0; i<this.yMax; i++) {
      row = document.createElement("tr");
      gameBoard.append(row);

      /** For each column */
      for(let j=0; j<this.xMax; j++){
        col = document.createElement("td");
        row.append(col);
        cDiv = document.createElement("div");
        col.append(cDiv);
        cDiv.classList.add("cell");
        cDiv.classList.add("unknown");
        cDiv.setAttribute("y", i);
        cDiv.setAttribute("x", j);

        /** Add click event listener to each square div */
        cDiv.addEventListener("click", function() {
          self.checkDiamond(this, diamondPos);
        });
      }
    }
  }

  /** Generate the diamonds array with random positions */
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

  /** Get the arrow's direction by calculating the nearest diamond position*/
  getArrowDirection(x, y, diamondPos) {
    let shortestPos = this.getNearestDiamond (x, y, diamondPos);
    if(!shortestPos){
      return null;
    }
    
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

  /** Get the nearest diamond position by calculating the shortest distance*/
  getNearestDiamond(x, y, diamondPos) {

    /** If the diamonds array is empty, do not calculate the position*/
    if(diamondPos.length<=0) {
      return null;
    }

    let tempTotal = 0;
    let shorttestTotal = this.xMax + this.yMax;
    let shortestPos = {};
    let dx;
    let dy;

    for (let z = 0; z < diamondPos.length; z++) {      
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

/** Initialize the game here */
let startGame = () => {
    let game = new DiamondGame(8, 8, 8);
    document.querySelector("#score").innerHTML = game.maxScore;
    let diamondPos = game.generateDiamonds();
    game.generateSquares(diamondPos);
};