function Orb(options) {
  this.x = options.x;  // onscreen, left to right (pixels)
  this.y = 0;          // onscreen, up to down (fake)
  this.z = options.z;  // distance from camera (fake)

  this.periodOffset = options.periodOffset;

  this.isActive = false;

  this.size = 24 / this.z;

  var colorAmount = Math.floor((256 / this.z) + 32);
  var hexColorAmount = colorAmount.toString(16);
  if (hexColorAmount.length === 1) { hexColorAmount = '0' + hexColorAmount; }
  this.color = '#' + hexColorAmount + hexColorAmount + hexColorAmount;
}

Orb.prototype.tick = function (t) {
  this.y = Math.sin((t + this.periodOffset) / 3000);
};

Orb.prototype.draw = function (context) {
  var y = (this.y * this.size * 10) + (context.canvas.height * (2 / 3));
  y -= this.z * 10;

  if (this.isActive) {
    context.fillStyle = '#f0f0f0';
    context.shadowColor = '#ffffff';
    context.shadowBlur = this.size;
  } else {
    context.fillStyle = this.color;
    context.shadowBlur = 0;
  }

  context.beginPath();
  context.arc(this.x, y, this.size, 0, 2 * Math.PI, false);
  context.fill();
};

Orb.prototype.activate = function () {
  this.isActive = true;

  setTimeout(function () {
    this.isActive = false;
  }.bind(this), 10000);
};
