var drawing = [];
var currentPath = [];
var pointer,database;

function setup(){
 canvas = createCanvas(500, 500);
 canvas.mousePressed(startPath);
 canvas.parent('canvascontainer');

 var saveButton = select('#saveButton')
 saveButton.mousePressed(saveDrawing)
// canvas.mouseReleased(endPath)
 background(20);
 database = firebase.database();
   var ref = database.ref('drawings');
  ref.on('value', gotData, errData);
}

function draw(){

}

function mouseDragged(){

	var pointer = {
		x: mouseX,
		y: mouseY
	}
	noStroke()
	fill(255);
	ellipse(mouseX, mouseY, 10, 10)
    currentPath.push(pointer)

}

function startPath(){
	currentPath = [];
	drawing.push(currentPath)
}

//function endPath(){}

function saveDrawing() {
  var ref = database.ref('drawings');
  var data = {
    name: 'Anay',
    drawing: drawing
  };
  var result = ref.push(data, dataSent);
  console.log(result.key);

  function dataSent(status) {
    console.log(status);
  }
}

function gotData(data) {

  var drawings = data.val();
  var keys = Object.keys(drawings);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    //console.log(key);
    var li = createElement('li', '');
    li.class('listing');
    var ahref = createA('#', key);
    ahref.mousePressed(showDrawing);
    ahref.parent(li);
    li.parent('drawingList');
  }
}

function errData(err) {
  console.log(err);
}

function showDrawing(key) {

  var ref = database.ref('drawings/' + key);
  ref.once('value', oneDrawing, errData);

  function oneDrawing(data) {
    var dbdrawing = data.val();
    drawing = dbdrawing.drawing;
  }
}