function keyReleased() {
  if (working) return false;
  if (key == "ArrowUp") {
    player.animation = "stand_up";
  }
  if (key == "ArrowDown") {
    player.animation = "stand_down";
  }
  if (key == "ArrowLeft") {
    player.animation = "stand_left";
  }
  if (key == "ArrowRight") {
    player.animation = "stand_right";
  }
}

document.onkeydown = function (e) {
  e.preventDefault();
  if (working) return false;
  switch (e.keyCode) {
    case 37:
      if (player.x > 0) player.x -= 1;
      player.animation = "walk_left";
      player.dir = "left";
      break;
    case 38:
      if (player.y > 0) player.y -= 1;
      player.animation = "walk_up";
      player.dir = "up";
      break;
    case 39:
      if (player.x < width - 64) player.x += 1;
      player.animation = "walk_right";
      player.dir = "right";
      break;
    case 40:
      if (player.y < height - 64) player.y += 1;
      player.animation = "walk_down";
      player.dir = "down";
      break;

    case 77:
      if (radio.visible()) radio.hide();
      else radio.show();
      break;

    case 73:
      let text = "You have Nothing ";
      if (Object.entries(inventory).length > 0) text = "You have";

      for (const [key, value] of Object.entries(inventory)) {
        text += ` ${value} ${key},`;
      }
      text = text.slice(0, -1);

      modal.elt.innerHTML = text;
      if (modal.visible()) modal.hide();
      else modal.show();

      break;
  }
};

function showDropDown() {
  if (radio.value() === "plantMode") {
    cropDropDown.show();
    animalDropDown.hide();
  } else if (radio.value() === "animalShop") {
    cropDropDown.hide();
    animalDropDown.show();
  } else {
    animalDropDown.hide();
    cropDropDown.hide();
  }
}

function buyanimal() {
  document.getElementsByTagName("select")[0].blur();
  document.getElementsByTagName("select")[1].blur();
  if (animalDropDown.value() == "null") return;

  const animal = animalDropDown.value().split("-")[0];
  const aPrice = animalDropDown.value().split("-")[1];
  if (gold < aPrice) return;
  const type = animal === "chicken" ? "chicken" : "cattle";
  const newAnimal = new Animal(
    random(width),
    random(height),
    window[`${animal}Img`],
    window[`${type}data`]
  );
  animals.push(newAnimal);
  newAnimal.start();
  gold -= aPrice * 1;
}

function changed() {
  document.getElementsByTagName("select")[0].blur();
  document.getElementsByTagName("select")[1].blur();
}

function mousePress() {
  if (working) return;
  switch (radio.value()) {
    case "ploughMode":
      var i = floor(mouseX / 64);
      var j = floor(mouseY / 64);
      var pI = floor(player.x / 64);
      var pJ = floor(player.y / 64);
      if (!working) {
        if ([0, 1].includes(abs(pI - i)) && [0, 1].includes(abs(pJ - j))) {
          working = true;
          setTimeout(() => {
            working = false;
            player.animation = `stand_${player.dir}`;
          }, 2000);
          player.animation = `thrust_${player.dir}`;
          if (!grid[i][j].ploughed) {
            grid[i][j].sx = 16;
            grid[i][j].sy = 78;
            grid[i][j].img = dirt;
            grid[i][j].ploughed = true;
          } else {
            grid[i][j] = new Cell(
              i * 64,
              j * 64,
              64,
              grass,
              0,
              0,
              false,
              0,
              0,
              0
            );
          }
        }
      }
      break;

    case "plantMode":
      var i = floor(mouseX / 64);
      var j = floor(mouseY / 64);
      var pI = floor(player.x / 64);
      var pJ = floor(player.y / 64);
      if ([0, 1].includes(abs(pI - i)) && [0, 1].includes(abs(pJ - j))) {
        if (
          grid[i][j].ploughed &&
          !working &&
          gold >= cropData[cropDropDown.value()].price
        ) {
          working = true;
          setTimeout(() => {
            working = false;
            player.animation = `stand_${player.dir}`;
            gold -= cropData[cropDropDown.value()].price;
          }, 2000);
          player.animation = `thrust_${player.dir}`;
          grid[i][j].crop = true;
          grid[i][j].csx = cropData[cropDropDown.value()].csx;
          grid[i][j].csy = 0;
          grid[i][j].isMaxGrown = false;
          grid[i][j].currentGrowth = 0;
          grid[i][j].isHarvested = false;
          grid[i][j].ppd = cropData[cropDropDown.value()].progressPerDay;
          grid[i][j].cropname = cropDropDown.value();
        }
      }
      break;
    case "harvestMode":
      var i = floor(mouseX / 64);
      var j = floor(mouseY / 64);
      var pI = floor(player.x / 64);
      var pJ = floor(player.y / 64);
      if ([0, 1].includes(abs(pI - i)) && [0, 1].includes(abs(pJ - j))) {
        if (grid[i][j].isMaxGrown && !grid[i][j].isHarvested && !working) {
          working = true;
          setTimeout(() => {
            working = false;
            player.animation = `stand_${player.dir}`;
          }, 2000);
          player.animation = `thrust_${player.dir}`;
          grid[i][j].csy += 64;
          grid[i][j].currentGrowth = 0;
          grid[i][j].isHarvested = true;
          if (inventory[grid[i][j].cropname]) {
            inventory[grid[i][j].cropname] += 1;
          } else {
            inventory[grid[i][j].cropname] = 1;
          }

          for (quest of quests) {
            quest.dispatchEvent(new Event("harvest"));
          }
        }
      }
      break;
    case "feedMode":
      let ax = mouseX;
      let ay = mouseY;
      //ax and ay are to prevent mouseX and mouseY change during the loop
      for (let animal of animals) {
        if (
          intersects(
            ax,
            ay,
            animal.x,
            animal.y,
            32,
            animal.frame.w,
            32,
            animal.frame.h
          )
        ) {
          if (animal.hunger > 0) {
            animal.feeding = true;
            animal.animation = `eat_${animal.dir}`;
            animal.hunger -= 1;
            setTimeout(
              (index) => {
                animals[index].feeding = false;
                animals[index].animation = `walk_${animals[index].dir}`;
              },
              3000,
              animals.indexOf(animal)
            );

            break;
          }
        }
      }

      break;
  }
}
