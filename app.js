addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.querySelector("#score");
  const resultDisplay = document.querySelector("#result");
  const newGameBtn = document.querySelector(".new-game");
  const bestScoreText = document.querySelector("#best");

  const width = 4;
  let squares = [];
  let score = 0;
  let localScore;
  let localBestScore = 0;

  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.innerHTML = 0;

      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
    addClass();
  }

  createBoard();
  reset();

  //generate a numer two randomly
  function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length);

    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      checkForGameOver();
    } else generate();
  }

  function addClass() {
    for (let i = 0; i < width * width; i++) {
      if (squares[i].innerHTML == 0) {
        squares[i].className = "zero";
      } else if (squares[i].innerHTML == 2) {
        squares[i].className = "num2";
      } else if (squares[i].innerHTML == 4) {
        squares[i].className = "num4";
      } else if (squares[i].innerHTML == 8) {
        squares[i].className = "num8";
      } else if (squares[i].innerHTML == 16) {
        squares[i].className = "num16";
      } else if (squares[i].innerHTML == 32) {
        squares[i].className = "num32";
      } else if (squares[i].innerHTML == 64) {
        squares[i].className = "num64";
      } else if (squares[i].innerHTML == 128) {
        squares[i].className = "num128";
      } else if (squares[i].innerHTML == 256) {
        squares[i].className = "num256";
      } else if (squares[i].innerHTML == 512) {
        squares[i].className = "num512";
      } else if (squares[i].innerHTML == 1028) {
        squares[i].className = "num1028";
      } else if (squares[i].innerHTML == 2048) {
        squares[i].className = "num2048";
      }
    }
  }

  //swipe right

  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;

        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;

        let zeros = Array(missing).fill(0);

        let newRow = zeros.concat(filteredRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  //swipe left
  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;

        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;

        let zeros = Array(missing).fill(0);

        let newRow = filteredRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;

      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;

      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredColumn);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }
  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;

      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;

      let zeros = Array(missing).fill(0);
      let newColumn = filteredColumn.concat(zeros);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }

  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML == squares[i + 1].innerHTML) {
        let combineTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combineTotal;
        squares[i + 1].innerHTML = 0;

        score += combineTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML == squares[i + width].innerHTML) {
        let combineTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = combineTotal;
        squares[i + width].innerHTML = 0;

        score += combineTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  function control(e) {
    if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 38) {
      keyUp();
    } else if (e.keyCode === 40) {
      keyDown();
    }
  }

  document.addEventListener("keyup", control);

  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generate();
    addClass();
  }
  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generate();
    addClass();
  }
  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generate();
    addClass();
  }
  function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generate();
    addClass();
  }

  function reset() {
    for (var i = 0; i < squares.length; i++) {
      squares[i].innerHTML = 0;
    }

    if (localStorage.getItem("bestScore")) {
      localBestScore = localStorage.getItem("bestScore");

      if (score > localBestScore) {
        localStorage.setItem("bestScore", score);
        bestScoreText.innerHTML = score;
      }
    } else {
      localStorage.setItem("bestScore", score);
      bestScoreText.innerHTML = score;
      bestScoreText.innerHTML = score;
    }

    score = 0;
    scoreDisplay.innerHTML = score;
    generate();
    generate();
    addClass();
  }


  function checkForWin() {
    for (var i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = `You win !!! your score ${score}`;
        resultDisplay.classList.add("result");
        document.removeEventListener("keyup", control);
      }
    }
  }

  function checkForGameOver() {
    let checkZero = 0;

    for (var i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        checkZero++;
      }
    }
    if (checkZero === 0) {
      resultDisplay.innerHTML = `You lose !!! your score ${score}`;
      resultDisplay.classList.add("result");
      document.removeEventListener("keyup", control);
    }
  }

  resultDisplay.addEventListener("click", () => {
    resultDisplay.innerHTML = "";
    resultDisplay.classList.remove("result");
    reset();
  });

  newGameBtn.addEventListener("click", reset);
});
