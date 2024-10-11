const max_n = 30
let n = 0
let board = []

function inputControl(e) {
    let value = parseInt(e.target.value);
    if (value > max_n) {
        e.target.value = max_n;
        value = max_n;
    } else if (value <= 1 || isNaN(value)){
        value = 0
    }
    n = value;
    generateChessBoard(n);
    console.log(n)
    document.getElementById('solve-button').style.display = n<=1? 'None':'flex';
    board = new Array(n*n).fill(0);
}

function generateChessBoard(n) {
    const chessBoard = document.getElementById('chess-board');
    chessBoard.innerHTML = ''; // Clear the existing board

    document.documentElement.style.setProperty('--n', n);
    let width = chessBoard.clientWidth;
    chessBoard.style.height = `${width}px`;


    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let id = (i*n) + j

            const cell = document.createElement('div');
            let svg = createQueenSVG();
            cell.className += `cell ${(i + j) % 2 === 0 ? 'white': 'black'}`;
            cell.idx = id
            cell.onclick = controlClickSquare;

            svg.id = id;
            svg.style.display = "none";
            cell.appendChild(svg);
            chessBoard.appendChild(cell);
        }
    }
}

// controls clicks on square
function controlClickSquare(e){
    let squareId = e.target.idx;

    if (checkSquare(squareId)) {
        document.getElementById(squareId).style.display = "block";
        board[squareId] = 1
    };
    console.log(board);
}

//check is the square free
function checkSquare(idx){
    let row = Math.floor(idx / n);
    let column = idx % n

    // row check
    for (let i = row * n; i < (row + 1) * n; i++) {
        if (board[i] === 1) return false
    }

    //column check
    for (let i = column; i < n*n; i+=n) {
        if (board[i] === 1) return false
    }

    // Upper-left diagonal check
    for (let i = row, j = column; i >= 0 && j >= 0; i--, j--) {
        if (board[i * n + j] === 1) return false;
    }

    // Upper-right diagonal check
    for (let i = row, j = column; i >= 0 && j < n; i--, j++) {
        if (board[i * n + j] === 1) return false;
    }

    // Lower-left diagonal check
    for (let i = row, j = column; i < n && j >= 0; i++, j--) {
        if (board[i * n + j] === 1) return false;
    }

    // Lower-right diagonal check
    for (let i = row, j = column; i < n && j < n; i++, j++) {
        if (board[i * n + j] === 1) return false;
    }

    return true;
}

// Just creates svg with queen as a variable
function createQueenSVG() {
    // Create the main SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns:svg", "http://www.w3.org/2000/svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute("version", "1.0");
    svg.setAttribute("width", "80%");
    svg.setAttribute("height", "80%");
    svg.setAttribute("viewBox", "0 0 504 504");

    // Create and append the main path
    const mainPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    mainPath.setAttribute("d", "M 48,132 L 64,302 126,395 103,442 C 140,470 319,473 400,442 L 377,395 439,302 455,132 377,279 L 361,93 291,271 251,77 212,271 142,93 126,279 L 48,132 z");
    mainPath.setAttribute("style", "fill:#ffffff;stroke:#000000;stroke-width:16;");
    svg.appendChild(mainPath);

    // Create and append the circle
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "40");
    circle.setAttribute("cy", "110");
    circle.setAttribute("r", "26");
    circle.setAttribute("style", "fill:#ffffff;stroke:#000000;stroke-width:16;");
    circle.setAttribute("id", "circle");
    svg.appendChild(circle);

    // Create and append the use elements
    const useTransforms = [
        "translate(98,-37)", "translate(210,-58)",
        "translate(322,-38)", "translate(420,-1)"
    ];
    useTransforms.forEach(transform => {
        const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        use.setAttribute("transform", transform);
        use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#circle");
        svg.appendChild(use);
    });

    // Create and append the additional paths
    const additionalPaths = [
        {d: "M 103,442 C 202,400 294,397 392,442", style: "fill:#ffffff;stroke:#000000;stroke-width:16;"},
        {d: "M 126,395 C 219,365 274,359 377,395", style: "fill:#ffffff;stroke:#000000;stroke-width:16;"},
        {d: "M 95,349 C 194,307 303,304 401,349", style: "fill:#ffffff;stroke:#000000;stroke-width:16;"},
        {d: "M 72,302 L 94,283 C 116,292 154,280 169,265 189,278 221,284 252,252 283,285 309,279 338,268 363,288 388,291 414,284 L 433,305", style: "fill:none;stroke:#000000;stroke-width:16;"}
    ];
    additionalPaths.forEach(pathData => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData.d);
        path.setAttribute("style", pathData.style);
        svg.appendChild(path);
    });

    return svg;
}