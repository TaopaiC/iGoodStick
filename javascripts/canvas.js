function draw() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = "rgb(200,200,0)";
    ctx.fillRect(10, 10, 55, 50);

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect(30, 30, 55, 50);
  }
}

function DrawCanvas(canvas_name) {
  var canvas = this.canvas = document.getElementById(canvas_name);
  var ctx = this.ctx = canvas.getContext('2d');
  var drawcanvas = this.drawcanvas = this;

  ctx.fillStyle = "rgb(200,200,0)";
  ctx.fillRect(10, 10, 55, 50);

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect(30, 30, 55, 50);

  $(canvas).bind("mousedown", function(ev) {drawcanvas.drawStart(ev)});
  $(canvas).bind("mousemove", function(ev) {drawcanvas.drawMove(ev)});
  $(canvas).bind("mouseup",   function(ev) {drawcanvas.drawEnd(ev)});

  $(canvas).bind("touchdown", function(ev) {drawcanvas.drawStart(ev)});
  $(canvas).bind("touchmove", function(ev) {drawcanvas.drawMove(ev)});
  $(canvas).bind("touchup",   function(ev) {drawcanvas.drawEnd(ev)});
}

DrawCanvas.prototype.getXY = function(event) {
  var x, y;
  x = event.pageX - $(this.canvas).offset().left;
  y = event.pageY - $(this.canvas).offset().top;
  return {x:x,y:y};
};

DrawCanvas.prototype.drawStart = function(event) {
  event.preventDefault();
  var m = this.getXY(event);

  this.drawing = true;
  this.oldX = m.x;
  this.oldY = m.y;
};

DrawCanvas.prototype.drawMove = function(event) {
  var m = this.getXY(event);

  if (this.drawing) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.oldX, this.oldY);
    this.ctx.lineTo(m.x, m.y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  this.oldX = m.x;
  this.oldY = m.y;
};

DrawCanvas.prototype.drawEnd = function(event) {
  this.drawing = false;
};

