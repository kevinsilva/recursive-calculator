export default class InterfaceManager {
    constructor(calculator, referenceDisplay, referenceSecondaryDisplay) {
        this.calculator = calculator;
        this.mainDisplay = referenceDisplay;
        this.secondaryDisplay = referenceSecondaryDisplay;
        this.clear(); 
    }

    add(input) {
        this.currentCalculation = this.currentCalculation.concat(input);
    }

    runCalculator(input) {
        this.previousCalculation = this.currentCalculation;
        this.currentCalculation = this.calculator.runCommand(input);
    }

    render() {
        this.mainDisplay.firstElementChild.innerText = this.currentCalculation;
        this.secondaryDisplay.firstElementChild.innerText = this.previousCalculation;
    }

    clear() {
        this.currentCalculation = "";
        this.previousCalculation = "";
    }
}