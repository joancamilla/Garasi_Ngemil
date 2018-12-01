function setup() {
  createCanvas(400, 400);
}

function fillGrid(n) {
  var numCols = 5;
  var numRows = 5;
  var rectW = width / numCols;
  var rectH = height/ numRows;

  // make conditional grids to know whether grid is empty or filled
  var grids = [];
  for (var i = 0; i < numCols; i++) {
    grids[i] = [];
    for (var j = 0; j < numRows; j++) {
      grids[i][j] = false; // set all grids to false or empty
    }
  }

  while (n >0) {
    for (var i = 0; i < numCols; i++) {
      for (var j = 0; j < numRows; j++) {
        noFill();
        rect(i*rectW, j*rectH, rectW, rectH);
        if ((random(1) < .1) && (grids[i][j] == false)) {
          fill(0);
          arc(i*rectW + rectW/2, j*rectH + rectH, rectW, rectH, PI, TWO_PI);
          n -= 1;
          grids[i][j] = true; // when its filled, set it to true
        }
        if (n==0) return;
      }
    }
  }
}

function draw() {
  background(220);
  var n = 10;
  fillGrid(n);
	noLoop();
}
