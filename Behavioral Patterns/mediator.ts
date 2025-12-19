interface Mediator {
  notify(sender: Component, event: string): void;
}

class Component {
  protected mediator: Mediator;

  constructor(mediator: Mediator) {
    this.mediator = mediator;
  }
}

class Button extends Component {
  click(): void {
    console.log("Button clicked");
    this.mediator.notify(this, "click");
  }
}

class Textbox extends Component {
  setText(value: string): void {
    console.log(`Textbox value set to: ${value}`);
    this.mediator.notify(this, "input");
  }
}

class Checkbox extends Component {
  checked = false;

  toggle(): void {
    this.checked = !this.checked;
    console.log(`Checkbox checked: ${this.checked}`);
    this.mediator.notify(this, "check");
  }
}

class AuthenticationDialog implements Mediator {
  private title = "";

  private loginOrRegisterChkBx: Checkbox;
  private loginUsername: Textbox;
  private loginPassword: Textbox;
  private registerEmail: Textbox;
  private okBtn: Button;

  constructor() {
    this.loginOrRegisterChkBx = new Checkbox(this);
    this.loginUsername = new Textbox(this);
    this.loginPassword = new Textbox(this);
    this.registerEmail = new Textbox(this);
    this.okBtn = new Button(this);
  }

  notify(sender: Component, event: string): void {
    if (sender === this.loginOrRegisterChkBx && event === "check") {
      if (this.loginOrRegisterChkBx.checked) {
        this.title = "Log in";
        console.log("Switched to LOGIN mode");
      } else {
        this.title = "Register";
        console.log("Switched to REGISTER mode");
      }
    }

    if (sender === this.okBtn && event === "click") {
      if (this.loginOrRegisterChkBx.checked) {
        console.log("Trying to log in user...");
      } else {
        console.log("Registering new user...");
      }
    }
  }

  toggleMode() {
    this.loginOrRegisterChkBx.toggle();
  }

  submit() {
    this.okBtn.click();
  }
}

const dialog = new AuthenticationDialog();

dialog.toggleMode();
dialog.submit();
dialog.toggleMode();
dialog.submit();
