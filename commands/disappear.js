class Disappear {
  constructor(char) {
    this.char = char;
  }
  exec() {
    return new Promise((resolve, reject) => {
      this.char.disappear();
      resolve("Done");
    });
  }
}
