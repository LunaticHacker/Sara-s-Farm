class Exit {
  exec() {
    return new Promise((resolve, reject) => {
      working = false;
      resolve("Done");
    });
  }
}
