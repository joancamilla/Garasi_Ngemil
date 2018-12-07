var rowIndex = 0;
var name, phone, address, totalorder;
var bread, donuts, brownies;
var cols = ["#9eb83b", "#d51f26", "#faa31f", "#a46026"];

function preload() {
  garasingemil = loadTable ("../addons/order-data.csv", "csv","header");
  // garasingemil = loadTable ("https://docs.google.com/spreadsheets/d/e/2PACX-1vSU6-y-YdVAONlwj8rPzcKEw_oTCuHB5mjxC-Tghn5NxWdaWdbyEYkBXAutBaWE70BN3IS5i2Nzg_yy/pub?output=csv", "csv","header");
  title = loadFont('../addons/curse-casual.ttf');
  info = loadFont('../addons/Roboto-Light.ttf');
  totalOrder = loadFont('../addons/RobotoCondensed-Bold.ttf');
}


function setup() {
  // put setup code here
  createCanvas (750, 1000);
  // colorMode (HSB);
  textAlign(CENTER);
  // console.log(table.getColumn("name"));
  name = garasingemil.getString(rowIndex,0);
  phone = garasingemil.getString(rowIndex,1);
  address = garasingemil.getString(rowIndex,2);
  totalorder = garasingemil.getString(rowIndex,7);
  // bread = map(bread, 0, 100, 1, 99);
  // bread = garasingemil.getString(rowIndex,6);

  // donuts = garasingemil.getString (rowIndex, 4);
  // brownies = garasingemil.getString(rowIndex,3);

  // bread = garasingemil.getString(rowIndex,6);
  // bread = map(bread, 0, 100, 1, 99);
  // donuts = garasingemil.getString (rowIndex, 4);
  // donuts = map(donuts, 0, 100, 1, 99);
  // brownies = garasingemil.getString(rowIndex,3);
  // brownies = map(brownies, 0, 100, 1, 99);

  bread = 10;
  donuts = 10;
  brownies = 5;
}

function fillGrid(bread, donuts, brownies) {
  // var numCols = Math.ceil (garasingemil.getString(rowIndex,8)/2);
  var n = bread + donuts + brownies;
  var numCols = Math.ceil (n/3);
  var numRows = numCols;
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

  while (bread + donuts + brownies) {
    for (var i = 0; i < numCols; i++) {
      for (var j = 0; j < numRows; j++) {
        // var newColors =map(j, 0, numCols,0,numRows.length);
        // noFill();
        // rect(i*rectW, j*rectH, rectW, rectH);
        if ((random(1) < .1) && (grids[i][j] == false)) {
          var shape = Math.floor(Math.random() * Math.floor(3));
          if (shape == 0 && bread){
            noStroke();
            fill(213,31,38);
            // fill(color(cols[newColors]));
            arc(i*rectW + rectW/2, j*rectH + rectH, rectW, rectH, PI, TWO_PI);
            // console.log('bread ' + bread);
            bread -= 1;
          }
          if (shape ==1 && donuts) {
            noStroke();
            fill(158,184,59);
            // fill(color(cols[newColors]));
            ellipse (i*rectW + rectW/2 -10,j*rectH + rectH /2 -10, rectW);
            // console.log('donuts ' + donuts);
            donuts -= 1;
          }
          if (shape ==2 && brownies) {
            noStroke();
            fill(250,163,31);
            // fill(color(cols[newColors]));
            rect (i*rectW - 10,j*rectH + rectH/5 - 10, rectW, rectH/2,5);
            // console.log('brownies ' + brownies);
            brownies -= 1;
          }
          grids[i][j] = true; // when its filled, set it to true
        }
      }
    }
  }
}

function draw() {
  // if (generate) {
  // put drawing code here
  background (249,242,236);

    // var n = garasingemil.getString(rowIndex,8);

    // var n = 100;
    name = garasingemil.getString(rowIndex,0);
    phone = garasingemil.getString(rowIndex,1);
    address = garasingemil.getString(rowIndex,2);
    totalorder = garasingemil.getString(rowIndex,7);

    fillGrid(bread, donuts, brownies);
    drawLabel();
  	noLoop();

//     generate = false;
//
// }
}

function drawLabel () {

  // rect(70,360,550,340);
  push();
    fill('#633118');
    textFont(title);
    textSize(65);
    text(name, 350, 450);
    textFont(info);
    textSize(25);
    text(address,350, 500);
    text(phone, 350, 550);
    textFont(totalOrder);
    text(totalorder,350,650);
    // text(`Name: ${name}\n${phone}\n${address}`, 300, 400)
    pop();
}

//not working due to noLoop();
function mouseClicked () {
  rowIndex++;
  if (rowIndex >= garasingemil.getRowCount()) {
    rowIndex = 0;
  }

  redraw();
  // drawLabel();
}
