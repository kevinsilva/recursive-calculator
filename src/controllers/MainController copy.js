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
  }

  addToDisplay(value) {
    switch (value) {
      case "S":
        this.displayController._elMain.parentElement.style.backgroundColor =
          "#505343";

        break;
      case "A":
        this.displayController._elMain.parentElement.style.backgroundColor =
          "#b1b3a6";
        const clearDisplay = () => {
          this.currentCalculation = "";
          this.displayController.main = this.currentCalculation;
        };
        const welcomeMsg = () => {
          this.currentCalculation = "Welcome!";
          this.displayController.main = this.currentCalculation;
        };
        setTimeout(welcomeMsg, 1000);
        setTimeout(clearDisplay, 3000);
        break;
      // case "A":
      //   this.currentCalculation = this.calculator.runCommand(value);
      //   break;
      case "CE":
        if (this.displayController.secondary) return;
        this.displayController.secondary = this.currentCalculation;
        this.currentCalculation = this.calculator.runCommand(
          "CE " + this.currentCalculation
        );
        break;
      case "":
        let counter = 0;
        counter++;
        console.log();
        this.currentCalculation = "";
        this.displayController.clear();
        // this.currentCalculation = this.currentCalculation.slice(0, -1);
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
    console.log(this.currentCalculation);
  }
}

// TODO
// Remover menu, Ligar e Desligar, Melhorar interface
// Opções: apagar último char, adicionar espaços, adicionar parênteses, bugs