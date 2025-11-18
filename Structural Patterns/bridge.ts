interface Device {
  play(): void;
}

class TV implements Device {
  play() { console.log("Playing on TV"); }
}

class Phone implements Device {
  play() { console.log("Playing on Phone"); }
}

class Remote_ {
  constructor(private device: Device) {}

  pressPlay() {
    this.device.play();
  }
}

const tvRemote = new Remote_(new TV());
tvRemote.pressPlay();

const phoneRemote = new Remote_(new Phone());
phoneRemote.pressPlay();
