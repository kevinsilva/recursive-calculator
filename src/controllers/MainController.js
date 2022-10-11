import NumpadController from "./NumpadController.js";

export default class MainController {
  constructor(object) {
    if (!(object.numpadController instanceof NumpadController)) {
      throw new TypeError("must be an instance of NumpadController");
    }
    this.displayController = object.displayController;
    this.numpadController = object.numpadController;
    this.calculator = object.calculator;
    this.currentCalculation = ""; // innerText ignora whitespace
    this.clearCounter = 0;
  }

  addToDisplay(value) {
    switch (value) {
      case "S":
        this.displayMsg("Bye Bye!");

        setTimeout(() => {
          this.displayController._elMain.parentElement.style.backgroundColor =
            "#505343";
          this.clearDisplay();
        }, 2000);
        break;
      case "A":
        this.clearDisplay();
        this.displayController._elMain.parentElement.style.backgroundColor =
          "#b1b3a6";

        setTimeout(() => {
          this.displayMsg("Welcome!");
        }, 1000);

        setTimeout(() => {
          this.clearDisplay();
        }, 3000);

        break;
      case "CE":
        if (this.displayController.secondary) return;
        this.displayController.secondary = this.currentCalculation;
        this.currentCalculation = this.calculator.runCommand(
          "CE " + this.currentCalculation
        );
        break;
      case "":
        this.clearCounter++;

        setTimeout(() => {
          if (this.clearCounter === 1) {
            this.clearLastChar();
          } else if (this.clearCounter >= 2) {
            this.clearDisplay();
          }
          this.clearCounter = 0;
        }, 200);

        break;
      case ".":
        if (this.currentCalculation.includes(".")) return;
        this.currentCalculation += value;
        break;
      default:
        if (this.displayController.secondary) return;
        this.currentCalculation += value;
        break;
    }
    this.displayController.main = this.currentCalculation;
  }

  clearDisplay() {
    this.currentCalculation = "";
    this.displayController.clear();
  }

  clearLastChar() {
    this.currentCalculation = this.currentCalculation.slice(0, -1);
    this.displayController.main = this.currentCalculation;
  }

  displayMsg(msg) {
    this.currentCalculation = msg;
    this.displayController.main = this.currentCalculation;
  }
}

// TODO
// Remover menu, Ligar e Desligar, Melhorar interface
// Opções: apagar último char, adicionar espaços, adicionar parênteses, bugs

// case "A":
//   this.currentCalculation = this.calculator.runCommand(value);
//   break;
