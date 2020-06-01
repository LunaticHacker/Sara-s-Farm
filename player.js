class Player {
  constructor(img, x, y) {
    this.image = img;
    this.x = x;
    this.y = y;
    this.frame;
    this.index = 0;
    this.speed = 0.2;
    this.dir = "down";
    this.animation = "stand_down";
  }

  show() {
    var length = data["animations"][this.animation].length;
    this.index += this.speed;
    var i = floor(this.index % length);
    this.frame = data["frames"][data["animations"][this.animation][i]]["frame"];
    image(
      this.image,
      this.x,
      this.y,
      64,
      64,
      this.frame.x,
      this.frame.y,
      64,
      64
    );
  }
}
