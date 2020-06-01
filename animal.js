class Animal {
  constructor(x, y, img, data) {
    this.x = x;
    this.y = y;
    this.image = img;
    this.data = data;
    this.index = 0;
    this.speed = 0.1;
    this.dir = "down";
    this.animation = "stand_down";
    this.hunger = 0;
    this.targetX = x;
    this.feeding = false;
    this.targetY = y;
    this.interval;
    this.hInterval;
  }

  show() {
    var length = this.data["animations"][this.animation].length;
    this.index += this.speed;
    var i = floor(this.index % length);
    this.frame = this.data["frames"][
      this.data["animations"][this.animation][i]
    ]["frame"];
    image(
      this.image,
      this.x,
      this.y,
      this.frame.w,
      this.frame.h,
      this.frame.x,
      this.frame.y,
      this.frame.w,
      this.frame.h
    );
    fill(255);
    textSize(10);
    if (this.hunger > 0) text("Give me food", this.x, this.y);
  }

  update() {
    if (!this.feeding) {
      if (this.dir === "left" || this.dir === "right") {
        if (abs(this.targetX - this.x) > 5) {
          this.x = lerp(this.x, this.targetX, 0.01);
        } else {
          this.animation = `stand_${this.dir}`;
        }
      } else {
        if (abs(this.targetY - this.y) > 5) {
          this.y = lerp(this.y, this.targetY, 0.01);
        } else {
          this.animation = `stand_${this.dir}`;
        }
      }
    }
  }

  walkInterval() {
    var dirRandom = random(0, 1);
    if (dirRandom > 0.5) {
      var randomNumber = random(0, width);

      if (randomNumber > this.x) {
        this.animation = "walk_right";
        this.dir = "right";
      } else if (randomNumber < this.x) {
        this.animation = "walk_left";
        this.dir = "left";
      }
      this.targetX = randomNumber;
    } else {
      var randomNumber = random(0, height);

      if (randomNumber > this.y) {
        this.animation = "walk_down";
        this.dir = "down";
      } else if (randomNumber < this.y) {
        this.animation = "walk_up";
        this.dir = "up";
      }
      this.targetY = randomNumber;
    }
  }

  hungerInterval() {
    this.hunger += 1;
    if (this.hunger == 4) {
      const index = animals.indexOf(this);
      if (index > -1) {
        animals.splice(index, 1);
      }
    }
  }
  start() {
    this.interval = setInterval(() => {
      this.walkInterval();
    }, random(5, 10) * 1000);
    this.hInterval = setInterval(() => {
      this.hungerInterval();
    }, 120000);
  }
}
