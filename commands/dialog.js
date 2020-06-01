class Dialog {
  constructor(name, message) {
    this.name = name;
    this.message = message;
  }
  exec() {
    return new Promise((resolve, reject) => {
      dialog.show();
      //console.log(this.name);
      document.getElementsByClassName("dialog")[0].innerHTML =
        this.name + ":<br>";

      var individuals = this.message.split("");
      var index = 0;
      for (var k = 0; k < individuals.length; k++) {
        setTimeout(() => {
          document.getElementsByClassName("dialog")[0].innerHTML +=
            individuals[index];
          index++;
          if (index == individuals.length) {
            setTimeout(() => {
              document.getElementsByClassName("dialog")[0].innerHTML = "";
              dialog.hide();
              resolve("Done");
            }, 1000);
          }
        }, 500 * k);
      }
    });
  }
}
