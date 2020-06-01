class NPC extends Player {
  act() {
    let rname = random(names.names);
    let questNum = floor(random(0, 7));
    let quest = {};
    let qreward = 0;
    let qtime = 0;
    let qreqtext, qrewtext;
    let punc = "";
    let numbers = [0, 1, 2, 3, 4, 5, 6];
    qreqtext = "I want ";
    for (let i = 0; i <= questNum; i++) {
      let rn = random(numbers);
      numbers.splice(numbers.indexOf(rn), 1);
      let quantity = floor(random(5, 11));
      quest[Object.keys(cropData)[rn]] = quantity;
      if (i == questNum) punc = ".";
      else if (questNum - 1 == i) punc = "and";
      else punc = ",";
      qreqtext += `${quantity} ${Object.keys(cropData)[rn]} ${punc} `;
      qreward += cropData[Object.keys(cropData)[rn]].price * 3 * quantity;
    }
    qtime = 5 + questNum;
    qrewtext = `I will give you ${qreward} Gold if you can provide in ${qtime} days`;

    let commands = [];
    commands.push(new WalkH(player.x, this));
    commands.push(new WalkV(player.y + 64, this));
    commands.push(new Dialog(rname, `Hello I'm ${rname}`));
    commands.push(new Dialog(rname, qreqtext));
    commands.push(new Dialog(rname, qrewtext));
    commands.push(new initiateQuest(quest, qtime, qreward));
    commands.push(new WalkV(-1, this));
    commands.push(new Disappear(this));

    commands.push(new Exit());

    ScriptRunner.run(commands);
  }

  disappear() {
    npcs.splice(npcs.indexOf(this), 1);
  }
}
