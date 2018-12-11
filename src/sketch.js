var tableData;
var title, info, totalOrder;
var name, phone, address, totalOrder;
var breads, donuts, brownies;
var rowIndex = 0;


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
    drawLabel();
    drawShapes();
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
    var columns = Math.ceil(total/2); // divided by 3 for more columns
    var rows = columns; // create same number of rows

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
    console.log(orders);
    // break loop
    noLoop();
}

function fillOrders(orders, item, index){
    while(item > 0){
        for (var i = 0; i < orders.length; i++) {
            for (var j = 0; j < orders[i].length; j++) {
                if ((random(1) < 0.5) && (orders[i][j] == 0)) {
                    orders[i][j] = index;
                    item --;
                }
            }
        }
    }
}