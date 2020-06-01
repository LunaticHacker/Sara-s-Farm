class ScriptRunner {
  static async run(commands) {
    working = true;
    for (let command of commands) {
      await command.exec();
    }
  }
}
