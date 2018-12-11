var tableData;
var title, info, totalOrder;
var name, phone, address, totalOrder;
var breads, donuts, brownies;
var rowIndex = 0;
var columns, rows;


function preload(){
    tableData = loadTable("./addons/order-data.csv", "csv","header");
    title = loadFont('/addons/curse-casual.ttf');
    info = loadFont('/addons/Roboto-Light.ttf');
    subtext = loadFont('/addons/RobotoCondensed-Bold.ttf');
}

function setup() {
    createCanvas (750, 1000);
    textAlign(CENTER);
}

function draw() {
    getData();
    background (249,242,236);
    drawShapes();
    drawLabel();
}

function mouseClicked(){
    rowIndex ++;
    if (rowIndex >= tableData.getRowCount()) {
        rowIndex = 0;
    }
    redraw();
}

function getData(){
    name = tableData.getString(rowIndex,0);
    phone = tableData.getString(rowIndex,1);
    address = tableData.getString(rowIndex,2);
    totalOrder = tableData.getString(rowIndex,7);
    brownies = tableData.getNum(rowIndex,3); 
    donuts = tableData.getNum (rowIndex, 4);
    rissoles = tableData.getNum(rowIndex,5);
    breads = tableData.getNum(rowIndex,6);
}

function drawLabel(){
    push();
    fill('#633118');
    textFont(title);
    textSize(65);
    text(name, 350, 450);
    textFont(info);
    textSize(25);
    text(address,350, 500);
    text(phone, 350, 550);
    textFont(subtext);
    text(totalOrder,350,650);
    pop();
}

function drawShapes(){
    var total = brownies + donuts + rissoles + breads;
    // create order matrix
    columns = Math.ceil(total/3); // divided by 3 for more columns
    rows = columns; // create same number of rows

    // create empty orders
    var orders = [];
    for (var i = 0; i < columns; i++) {
        orders[i] = [];
        for (var j = 0; j < rows; j++) {
            orders[i][j] = 0;
        }
    }

    // fill orders randomly
    fillOrders(orders, brownies, 1);
    fillOrders(orders, donuts, 2);
    fillOrders(orders, rissoles, 3);
    fillOrders(orders, breads, 4);

    drawOrders(orders);
    console.log(orders);
    // break loop
    noLoop();
}

function fillOrders(orders, item, index){
    while(item > 0){
        for (var i = 0; i < orders.length; i++) {
            for (var j = 0; j < orders[i].length; j++) {
                if ((random(2) < 0.1) && (orders[i][j] == 0)) {
                    orders[i][j] = index;
                    item --;
                    if(item == 0){
                        return
                    }
                }
            }
        }
    }
}

function drawOrders(matrix){
    var rectW = width / columns;
    var rectH = height/ rows;
    // draw shapes from the matrix of orders
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            switch (matrix[i][j]){
                case 1:
                    // brownies
                    noStroke();
                    fill(213,31,38);
                    arc(i*rectW + rectW/2, j*rectH + rectH, rectW, rectH, PI, TWO_PI);
                    break;
                case 2:
                    // donuts
                    noStroke();
                    fill(158,184,59);
                    ellipse (i*rectW + rectW/2 -10,j*rectH + rectH /2 -10, rectW);
                case 3:
                    // rissoles
                    // noStroke();
                    // fill(120,120,120);
                    // ellipse (i*rectW + rectW/2 -10,j*rectH + rectH /2 -10, rectW);
                case 4:
                    // breads
                    noStroke();
                    fill(250,163,31);
                    // rect (i*rectW - 10,j*rectH + rectH/5 - 10, rectW, rectH/2,5);
                    // ellipse (i*rectW + rectW/2 -10,j*rectH + rectH /2 -10, rectW);
            }
        }
    }
}