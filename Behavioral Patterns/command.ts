interface Command {
  execute(): void;
}

class Light {
  on()  { console.log("Light ON"); }
  off() { console.log("Light OFF"); }
}

class TurnOn implements Command {
  constructor(private light: Light) {}
  execute() { this.light.on(); }
}

class TurnOff implements Command {
  constructor(private light: Light) {}
  execute() { this.light.off(); }
}

class Remote {
  run(cmd: Command) { cmd.execute(); }
}

const light = new Light();
const remote = new Remote();

remote.run(new TurnOn(light));
remote.run(new TurnOff(light));
