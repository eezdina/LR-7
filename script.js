const cells = document.querySelectorAll('.cell');
var player = 'X';
var gameEnd = false;

function cellClick(event) {
  const cell = event.target;
  if (cell.innerText === '' && !gameEnd) {
    cell.innerText = player;
    cell.classList.add(player);
    if (checkWin()) {
      drawWinLine();
      alert("Выиграл " + player + " !");
      gameEnd = true;
    } else if (checkDraw()) {
      alert("Ничья!");
      gameEnd = true;
    } else {
      player = player === 'X' ? 'O' : 'X';
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
    if (cell1.innerText !== '' &&
      cell1.innerText === cell2.innerText &&
      cell1.innerText === cell3.innerText) {
      return combination;
    }
  }

  return null;
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

function drawWinLine() {
  const combination = checkWin();
  if (combination) {
    const [index1, index2, index3] = combination;
    const cell1 = cells[index1];
    const cell2 = cells[index2];
    const cell3 = cells[index3];

    const rect1 = cell1.getBoundingClientRect();
    const rect2 = cell2.getBoundingClientRect();
    const rect3 = cell3.getBoundingClientRect();

    const boardRect = document.getElementById('board').getBoundingClientRect();

    const svg = document.createElement("div");
    svg.classList.add("winning-line");
    svg.style.width = boardRect.width + `px`;
    svg.style.height = boardRect.height + `px`;
    svg.style.position = 'absolute';
    svg.style.top = boardRect.top + `px`;
    svg.style.left = boardRect.left + `px`;
    svg.style.overflow = "hidden";

    const line = document.createElement("div");
    const x1 = rect1.left - boardRect.left + rect1.width / 2;
    const y1 = rect1.top - boardRect.top + rect1.height / 2;
    const x2 = rect3.left - boardRect.left + rect3.width / 2;
    const y2 = rect3.top - boardRect.top + rect3.height / 2;
    const length = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));

    line.style.width = length + `px`;
    line.style.height = '3px';
    line.style.background = 'black';
    line.style.position = 'absolute';
    line.style.top = y1 - 1.5 + `px`;
    line.style.left = x1 + `px`;
    line.style.transformOrigin = '0 50%';
    line.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;

    svg.appendChild(line);
    document.body.appendChild(svg);
  }
}

for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", cellClick);
}
