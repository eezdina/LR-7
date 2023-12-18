const cells = document.querySelectorAll('.cell');
var player = "X";
var gameEnd = false;

function cellClick(event) {
  const cell = event.target;
  if (cell.innerText === "" && !gameEnd) {
    cell.innerText = player;
    cell.classList.add(player);
    if (checkWin()) {
      alert("Выйграл " + player + " !");
      gameEnd = true;
    } else if (checkDraw()) {
      alert("Ничья!");
      gameEnd = true;
    } else {
      player = player == "X" ? "O" : "X";
    }
  }
}

function checkWin() {
  const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (var i = 0; i < winCombinations.length; i++) {
    const combination = winCombinations[i];
    const cell1 = cells[combination[0]];
    const cell2 = cells[combination[1]];
    const cell3 = cells[combination[2]];
    if (
      cell1.innerText !== "" &&
      cell1.innerText === cell2.innerText &&
      cell1.innerText === cell3.innerText
    ) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  var isDraw = true;
  for (var i = 0; i < cells.length; i++) {
  if (cells[i].innerText === "") {
  isDraw = false;
  break;
  }
  }
  return isDraw;
  }
  for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", cellClick);
    }