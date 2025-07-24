class Handler {
  private next: Handler | null;

  constructor() {
    this.next = null;
  }

  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }

  handle(requestLevel: number): void {
    if (this.next) {
      this.next.handle(requestLevel);
    } else {
      console.log(`No handler could handle level ${requestLevel}`);
    }
  }
}

class Level1Handler extends Handler {
  handle(requestLevel: number): void {
    if (requestLevel === 1) {
      console.log("Level 1: handled request");
    } else {
      super.handle(requestLevel);
    }
  }
}

class Level2Handler extends Handler {
  handle(requestLevel: number): void {
    if (requestLevel === 2) {
      console.log("Level 2: handled request");
    } else {
      super.handle(requestLevel);
    }
  }
}

class Level3Handler extends Handler {
  handle(requestLevel: number): void {
    if (requestLevel === 3) {
      console.log("Level 3: handled request");
    } else {
      super.handle(requestLevel);
    }
  }
}

const level1 = new Level1Handler();
const level2 = new Level2Handler();
const level3 = new Level3Handler();

level1.setNext(level2).setNext(level3);

level1.handle(1);
level1.handle(2);
level1.handle(3);
level1.handle(4);
