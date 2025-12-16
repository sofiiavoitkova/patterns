interface Graphic {
  move(x: number, y: number): void;
  draw(): void;
}

class Dot implements Graphic {
  constructor(protected x: number, protected y: number) {}

  move(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

  draw(): void {
    console.log(`Dot at (${this.x}, ${this.y})`);
  }
}

class Circle extends Dot {
  constructor(x: number, y: number, private radius: number) {
    super(x, y);
  }

  draw(): void {
    console.log(`Circle at (${this.x}, ${this.y}) with radius ${this.radius}`);
  }
}

class CompoundGraphic implements Graphic {
  private children: Graphic[] = [];

  add(child: Graphic): void {
    this.children.push(child);
  }

  remove(child: Graphic): void {
    this.children = this.children.filter((c) => c !== child);
  }

  move(x: number, y: number): void {
    for (const child of this.children) {
      child.move(x, y);
    }
  }

  draw(): void {
    console.log("CompoundGraphic:");
    for (const child of this.children) {
      child.draw();
    }
  }
}

class ImageEditor {
  private all = new CompoundGraphic();

  load(): void {
    this.all.add(new Dot(1, 2));
    this.all.add(new Circle(5, 3, 10));
  }

  groupSelected(components: Graphic[]): void {
    const group = new CompoundGraphic();

    for (const component of components) {
      group.add(component);
      this.all.remove(component);
    }

    this.all.add(group);
    this.all.draw();
  }
}

const editor = new ImageEditor();
editor.load();

const dot = new Dot(10, 10);
const circle = new Circle(20, 20, 5);

editor.groupSelected([dot, circle]);
