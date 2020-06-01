class initiateQuest {
  constructor(goals, time, reward) {
    this.goals = goals;
    this.time = time;
    this.reward = reward;
  }
  exec() {
    return new Promise((resolve, reject) => {
      let q = new Quest(this.goals, this.time, this.reward);
      quests.push(q);
      resolve("Done");
    });
  }
}
