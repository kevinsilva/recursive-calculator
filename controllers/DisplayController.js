export default class DisplayController {
    constructor(object) {
        this._elMain = object.elMain;
        this._elSecondary = object.elSecondary;
    }

    set main(input) {
        this._elMain.innerText = input;
    }

    set secondary(input) {
        this._elSecondary.innerText = input;
    }

    get main() {
        return this._elMain.innerText;
    }

    get secondary() {
        return this._elSecondary.innerText;
    }

    clear() {
        this.main = '';
        this.secondary = '';
    }
}
