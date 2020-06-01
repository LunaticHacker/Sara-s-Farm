class WalkV {
  constructor(y, char) {
    this.y = y;
    this.char = char;
  }

  exec() {
    return new Promise((resolve, reject) => {
      if (this.y > this.char.y) {
        if (this.y == floor(this.char.y)) return resolve("Done");
        this.char.animation = "walk_down";
        let distance = this.y - this.char.y;

        for (let i = 0; i < distance; i++) {
          setTimeout(() => {
            this.char.y += 1;
            if (this.char.y >= this.y) {
              this.char.animation = `stand_down`;
              resolve("Done");
            }
          }, i * 20);
        }
      } else {
        if (this.y == floor(this.char.y)) return resolve("Done");
        this.char.animation = "walk_up";
        let distance = this.char.y - this.y;

        for (let i = 0; i < distance; i++) {
          setTimeout(() => {
            this.char.y -= 1;
            if (this.char.y <= this.y) {
              this.char.animation = `stand_up`;
              resolve("Done");
            }
          }, i * 20);
        }
      }
    });
  }
}
