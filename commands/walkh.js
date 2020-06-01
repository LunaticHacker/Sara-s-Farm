class WalkH {
  constructor(x, char) {
    this.x = x;
    this.char = char;
  }

  exec() {
    return new Promise((resolve, reject) => {
      if (this.x > this.char.x) {
        if (this.x == floor(this.char.x)) return resolve("Done");
        this.char.animation = "walk_right";
        let distance = this.x - this.char.x;

        for (let i = 0; i < distance; i++) {
          setTimeout(() => {
            this.char.x += 1;
            if (this.char.x >= this.x) {
              this.char.animation = `stand_right`;
              resolve("Done");
            }
          }, i * 20);
        }
      } else {
        if (this.x == floor(this.char.x)) return resolve("Done");
        this.char.animation = "walk_left";
        let distance = this.char.x - this.x;

        for (let i = 0; i < distance; i++) {
          setTimeout(() => {
            this.char.x -= 1;
            if (this.char.x <= this.x) {
              this.char.animation = `stand_left`;
              resolve("Done");
            }
          }, i * 20);
        }
      }
    });
  }
}
