function DrawCanvas(canvas_name) {
  var canvas = this.canvas = document.getElementById(canvas_name);
  var ctx = this.ctx = canvas.getContext('2d');
  var drawcanvas = this.drawcanvas = this;

  $(canvas).bind("mousedown", function(ev) {drawcanvas.drawStart(ev)});
  $(canvas).bind("mousemove", function(ev) {drawcanvas.drawMove(ev)});
  $(canvas).bind("mouseup",   function(ev) {drawcanvas.drawEnd(ev)});

  $(canvas).bind("touchstart", function(ev) {drawcanvas.drawStart(ev)});
  $(canvas).bind("touchmove", function(ev) {drawcanvas.drawMove(ev)});
  $(canvas).bind("touchend",   function(ev) {drawcanvas.drawEnd(ev)});
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

