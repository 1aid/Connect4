class ConnectFour {
    constructor() {
      this.WIDTH = 7;
      this.HEIGHT = 6;
      this.currPlayer = 1;
      this.board = [];
      this.htmlBoard = document.getElementById("board");
      this.columnTop = null;
  
      this.makeBoard();
      this.makeHtmlBoard(); 
    }
  
    /** makeBoard: create in-JS board structure */
    makeBoard() {
      this.board = [];
      for (let row = 0; row < this.HEIGHT; row++) {
        this.board.push(new Array(this.WIDTH).fill(null));
      }
    }
  
    /** makeHtmlBoard: make HTML table and row of column tops */
    makeHtmlBoard() {
      this.columnTop = document.createElement("tr");
      this.columnTop.setAttribute("id", "column-top");
      this.columnTop.addEventListener("click", this.handleClick.bind(this));
  
      for (let x = 0; x < this.WIDTH; x++) {
        const headCell = document.createElement("td");
        headCell.setAttribute("id", x);
        this.columnTop.append(headCell);
      }
      this.htmlBoard.append(this.columnTop);
  
      for (let y = 0; y < this.HEIGHT; y++) {
        const row = document.createElement("tr");
        for (let x = 0; x < this.WIDTH; x++) {
          const cell = document.createElement("td");
          cell.setAttribute("id", `${y}-${x}`);
          row.append(cell);
        }
        this.htmlBoard.append(row);
      }
    }
  
    /** findSpotForCol: given column x, return top empty y (null if filled) */
    findSpotForCol(x) {
      for (let y = this.HEIGHT - 1; y >= 0; y--) {
        if (this.board[y][x] === null) {
          return y;
        }
      }
      return null;
    }
  
    /** placeInTable: update DOM to place piece into HTML table of board */
    placeInTable(y, x, player) {
      const cell = document.querySelector(
        `#board tr:nth-child(${y + 1}) td:nth-child(${x + 1})`
      );
      const piece = document.createElement("div");
      piece.classList.add("piece", `piece-${player}`);
      cell.appendChild(piece);
    }
  
    /** endGame: announce game end */
    endGame(msg) {
      alert(msg);
    }
  
    /** handleClick: handle click of column top to play piece */
    handleClick(evt) {
      const x = +evt.target.id;
      const y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }
      this.board[y][x] = this.currPlayer;
      this.placeInTable(y, x, this.currPlayer);
      if (this.checkForWin()) {
        return this.endGame(`Player ${this.currPlayer} won!`);
      }
      if (this.board.every((row) => row.every((cell) => cell !== null))) {
        return this.endGame("Tie!");
      }
      this.currPlayer = this.currPlayer === 1 ? 2 : 1;
    }
    
    /** checkForWin: check board cell-by-cell for "does a win start here?" */
    checkForWin() {
      function _win(cells) {
        return cells.every(
          ([y, x]) =>
            y >= 0 &&
            y < this.HEIGHT &&
            x >= 0 &&
            x < this.WIDTH &&
            this.board[y][x] === this.currPlayer
        );
      };
  
      for (let y = 0; y < this.HEIGHT; y++) {
        for (let x = 0; x < this.WIDTH; x++) {
          const horiz = [
            [y, x],
            [y, x + 1],
            [y, x + 2],
            [y, x + 3],
          ];
          const vert = [
            [y, x],
            [y + 1, x],
            [y + 2, x],
            [y + 3, x],
          ];
          const diagDR = [
            [y, x],
            [y + 1, x + 1],
            [y + 2, x + 2],
            [y + 3, x + 3],
          ];
          const diagDL = [
            [y, x],
            [y + 1, x - 1],
            [y + 2, x - 2],
            [y + 3, x - 3],
          ];
  
          if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
            return true;
          }
        }
      }
  
      return false;
    }
  }
  
  // Create an instance of the ConnectFour class
  const game = new ConnectFour();