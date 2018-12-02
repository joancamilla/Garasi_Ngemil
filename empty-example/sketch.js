var rowIndex = 0;

function preload() {
  // orders = loadTable ("../addons/order-data.csv", "csv","header");
  garasingemil = loadTable ("https://docs.google.com/spreadsheets/d/e/2PACX-1vSU6-y-YdVAONlwj8rPzcKEw_oTCuHB5mjxC-Tghn5NxWdaWdbyEYkBXAutBaWE70BN3IS5i2Nzg_yy/pub?output=csv", "csv","header");
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

}

function fillGrid(a, b) {
  // var numCols = Math.ceil (garasingemil.getString(rowIndex,8)/2);
  var numCols = Math.ceil (a + b/2);
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

  while (a + b >0) {
    for (var i = 0; i < numCols; i++) {
      for (var j = 0; j < numRows; j++) {
        noFill();
        rect(i*rectW, j*rectH, rectW, rectH);
        if ((random(1) < .1) && (grids[i][j] == false)) {
          var shape = Math.floor(Math.random() * Math.floor(2));
          if (shape == 0 && a > 0){
            fill(150);
            arc(i*rectW + rectW/2, j*rectH + rectH, rectW, rectH, PI, TWO_PI);
            a -= 1;
          } else if (shape ==1 && b > 0) {
            fill(0);
            arc(i*rectW + rectW/2, j*rectH + rectH, rectW, rectH, PI, TWO_PI);
            b -= 1;
          }
          grids[i][j] = true; // when its filled, set it to true
        }
      }
    }
  }
}

function draw() {
  // put drawing code here
  background (205);
  var name = garasingemil.getString(rowIndex,0);
  var phone = garasingemil.getString(rowIndex,1);
  var address = garasingemil.getString(rowIndex,2);
  var totalorder = garasingemil.getString(rowIndex,7);

  rect(70,360,550,340);
  push();
    fill('#ED225D');
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

    // var n = garasingemil.getString(rowIndex,8);
    var a = 5;
    var b = 3;
    // var n = 100;
    fillGrid(a, b);
  	noLoop();
}

//not working due to noLoop();
// function mousePressed () {
//   rowIndex++;
//   if (rowIndex >= orders.getRowCount()) {
//     rowIndex = 0;
  //
  // }
// }
