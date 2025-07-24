class Target {
  print(): string {
    return "Target";
  }
}

class Adaptee {
  oldPrint(): string {
    return "eetpadA";
  }
}

class Adapter extends Target {
  constructor(private adaptee: Adaptee) {
    super();
  }

  print(): string {
    const translated = this.adaptee.oldPrint().split("").reverse().join("");
    return `${translated}`;
  }
}

function use(service: Target) {
  console.log(service.print());
}

use(new Target());
use(new Adapter(new Adaptee()));
