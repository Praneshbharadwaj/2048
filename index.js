import Grid from "./grid.js"
import Tile from "./Tile.js"
const gameboard = document.getElementById("gameboard")
const grid = new Grid(gameboard)
console.log(grid.randomEmptyCell())
grid.randomEmptyCell().tile = new Tile(gameboard)
grid.randomEmptyCell().tile = new Tile(gameboard)
setupInput()
console.log(grid.cellsByColumn)
function setupInput() {
    window.addEventListener("keydown", handleInput, { once: true })
    window.addEventListener("keydown", handleInput, { once: true });
    window.addEventListener("swiped", handleMobileInput, { once: true });
  }
  
  async function handleMobileInput(e) {
    switch (e.detail.dir) {
      case "up":
        if (!canMoveUp()) {
          setupInput();
          return;
        }
        await moveUp();
        break;
      case "down":
        e.preventDefault();
        if (!canMoveDown()) {
          setupInput();
          return;
        }
        await moveDown();
        break;
      case "left":
        if (!canMoveLeft()) {
          setupInput();
          return;
        }
        await moveLeft();
        break;
      case "right":
        if (!canMoveRight()) {
          setupInput();
          return;
        }
        await moveRight();
        break;
      default:
        setupInput();
        return;
    }
  
    grid.cells.forEach((cell) => cell.mergeTiles());
  
    const newTile = new Tile(gameBoard);
    grid.randomEmptyCell().tile = newTile;
  
    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
      newTile.waitForTransition(true).then(() => {
        alert("Game Over!\nRefresh the page for a new one!");
      });
      return;
    }
  
    setupInput();
  } 
 async function handleInput(e) {

      console.log(e.key)
    switch (e.key) {
        case "ArrowUp":
            if(!canMoveUp())
            {
                setupInput();
                return
            }
            await moveUp()
            break;
        case "ArrowDown":
            if(!canMoveDowm())
            {
                setupInput();
                return
            }
            await moveDown()
            break;
        case "ArrowLeft":
            if(!canMoveLeft())
            {
                setupInput();
                return
            }
            await moveLeft()
            break;
        case "ArrowRight":
            if(!canMoveRight())
            {
                setupInput();
                return
            }
            await moveRight()
            break;

        default:
            setupInput()
            return
    }

    grid.cells.forEach(cell=>cell.mergeTiles())
    const newTile = new Tile(gameboard)
    grid.randomEmptyCell().tile = newTile

    if(!canMoveUp()&&!canMoveDowm()&&!canMoveLeft()&&!canMoveRight()){
        newTile.waitForTransition(true).then(()=>{
            alert("Game Over!\nRefresh the page for a new one!");
        })
        return
    }

    setupInput();

    
}



function moveUp() {
    return slideTiles(grid.cellsByColumn)
}
function moveDown() {
    return slideTiles(grid.cellsByColumn.map(colum=>[...colum].reverse()))
}
function moveLeft() {
    return slideTiles(grid.cellsByRow)
}
function moveRight() {
    return slideTiles(grid.cellsByRow.map(row=>[...row].reverse()))
}

function slideTiles(cells) {
    return Promise.all(
    cells.flatMap(group => {
        const promises = []
        for (let i = 1; i < group.length; i++) {
            const cell = group[i];
            if (cell.tile == null) continue
            let lastValiedCell
            for (let j = i - 1; j >= 0; j--) {
                const moveToCell = group[j];
                if (!moveToCell.canAccept(cell.tile)) break;
                lastValiedCell = moveToCell
            }
            if (lastValiedCell != null) {
                promises.push(cell.tile.waitForTransition())
                if (lastValiedCell.tile != null) {
                    lastValiedCell.mergeTile = cell.tile
                }

                else {
                    lastValiedCell.tile = cell.tile
                }
                cell.tile = null
            }
        }

        return promises
    }));
}


function canMoveUp(){
    return canMove(grid.cellsByColumn)
}
function canMoveDowm(){
    return canMove(grid.cellsByColumn.map(colum=>[...colum].reverse()))
}
function canMoveLeft(){
    return canMove(grid.cellsByRow)
}
function canMoveRight(){
    return canMove(grid.cellsByRow.map(row=>[...row].reverse()))
}


function canMove(cells)
{
    return cells.some(group=>{
        return group.some((cell,index)=>{
            if(index==0) return false
            if(cell.tile==null) return false
            const moveToCell  = group[index-1]
            return moveToCell.canAccept(cell.tile)
        })
    })
}