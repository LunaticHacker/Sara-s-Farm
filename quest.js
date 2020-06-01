class Quest extends CustomEventTarget {
  constructor(goals, time, reward) {
    super();
    this.goals = goals;
    this.time = time;
    this.completed = true;
    this.reward = reward;
    this.activate();
  }

  activate() {
    this.addEventListener("harvest", this.check);
    this.addEventListener("time", this.limit);
  }
  deactivate(completed) {
    this.removeEventListener("harvest", this.check);
    this.removeEventListener("time", this.limit);
    if (!completed) console.log("Mission Failed");

    const index = quests.indexOf(this);
    if (index > -1) quests.splice(index, 1);
  }

  check() {
    this.completed = true;
    for (const [key, value] of Object.entries(this.goals)) {
      if (!(inventory[key] >= value)) {
        this.completed = false;
        break;
      }
    }
    if (this.completed) {
      console.log("Mission Completed");
      gold += this.reward;
      this.deactivate(true);
    }
  }
  limit() {
    this.time -= 0.5;
    if (this.time <= 0) {
      this.deactivate(false);
    }
  }
}
