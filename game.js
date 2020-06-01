let canvas;
let dialog, modal;
let working = false;
let sara;
let data, cropData;
let player;
let grid;
let inventory = {};
let grass, dirt, crop;
let drops = [];
let raining = false;
let checkbox;
let npcs = [];
gold = 600;
animals = [];
//Some variables are supposed to be global therefore they are not declared using let
let quests = [];
function preload() {
  //Images
  sara = loadImage("images/sara.png");
  grass = loadImage("images/grass_tile.png");
  dirt = loadImage("images/plowed_soil.png");
  crops = loadImage("images/plants.png");
  chickenImg = loadImage("images/chickenImg.png");
  cowImg = loadImage("images/cowImg.png");
  pigImg = loadImage("images/pigImg.png");
  sheepImg = loadImage("images/sheepImg.png");

  //Data
  data = loadJSON("json/data.json");
  names = loadJSON("json/names.json");
  characterData = loadJSON("json/characterdata.json");
  chickendata = loadJSON("json/chickendata.json");
  cattledata = loadJSON("json/cattledata.json");
  cropData = loadJSON("json/cropdata.json");
}

function setup() {
  canvas = createCanvas(1280, 1280);
  canvas.mousePressed(mousePress);
  dialog = createDiv(null);
  modal = createP("");
  modal.addClass("modal");
  dialog.hide();
  modal.hide();
  dialog.addClass("dialog");
  radio = createRadio();
  radio.option("ploughMode", "ploughMode");
  radio.option("plantMode", "plantMode");
  radio.option("harvestMode", "harvestMode");
  radio.option("feedMode", "feedMode");
  radio.option("animalShop", "animalShop");
  radio.changed(showDropDown);
  radio.hide();
  cropDropDown = createSelect();
  cropDropDown.option("tomato-4G", "tomato");
  cropDropDown.option("potato-2G", "potato");
  cropDropDown.option("carrot-3G", "carrot");
  cropDropDown.option("cauliflower-6G", "cauliflower");
  cropDropDown.option("chilli-5G", "chilli");
  cropDropDown.option("eggplant-4G", "eggplant");
  cropDropDown.option("corn-6G", "corn");
  cropDropDown.changed(changed);
  cropDropDown.position(900, 30);
  animalDropDown = createSelect();
  animalDropDown.option("Choose Animal", null);
  animalDropDown.option("Chicken-200G", "chicken-20");
  animalDropDown.option("Cow-500G", "cow-50");
  animalDropDown.option("Sheep-600G", "sheep-60");
  animalDropDown.option("Pig-700G", "pig-70");
  animalDropDown.position(900, 30);
  animalDropDown.hide();
  animalDropDown.changed(buyanimal);

  cropDropDown.hide();
  radio.position(1100, 0);
  for (var i = 0; i < 500; i++) {
    drops[i] = new Drop();
  }

  player = new Player(sara, 0, 0);
  grid = make2DArray(20, 20);
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
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
        0,
        ""
      );
    }
  }
}

function draw() {
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      grid[i][j].show();
    }
  }

  player.show();

  for (npc of npcs) {
    npc.show();
  }

  for (var animal of animals) {
    animal.update();
    animal.show();
  }

  if (raining) {
    for (var drop of drops) {
      drop.fall();
      drop.show();
    }
  }
  textSize(30);
  fill(255);
  text(`${gold}G`, 800, 30);
}

var dayInterval = setInterval(() => {
  if (raining) raining = false;
  if (random(0, 1) > 0.8) {
    raining = true;
  }
  document.body.classList[0]
    ? document.body.classList.remove("dimmer")
    : document.body.classList.add("dimmer");
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (grid[i][j].crop && !grid[i][j].isMaxGrown) {
        grid[i][j].currentGrowth += grid[i][j].ppd;
        grid[i][j].update();
      }
    }
  }

  for (quest of quests) {
    quest.dispatchEvent(new Event("time"));
  }

  if (npcs.length == 0) {
    var npcImg;

    mergeImages(randomCharacter()).then(
      (b64) =>
        (npcImg = loadImage(b64, () => {
          let npc = new NPC(npcImg, random(width), random(height));
          npcs.push(npc);
          npc.act();
        }))
    );
  }
}, 120000);
