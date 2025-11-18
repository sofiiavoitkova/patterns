interface Prototype {
  clone(): Prototype;
}

class User implements Prototype {
  constructor(public name: string, public role: string) {}

  clone(): User {
    return new User(this.name, this.role);
  }
}

const admin = new User("Alice", "admin");
const copy = admin.clone();

console.log(admin === copy);
console.log(copy.name, copy.role);
