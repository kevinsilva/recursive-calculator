import MainController from "./MainController.js";
import NumpadController from "./NumpadController.js";
import DisplayController from "./DisplayController.js";

jest.mock("./NumpadController.js");

describe("Main Controller", () => {
  function initElements() {
    return {
      displayController: new DisplayController({
        elMain: { innerText: "" },
        elSecondary: { innerText: "" },
      }),
      numpadController: new NumpadController({ buttons: {}, onButtonClick: jest.fn() }),
      calculator: { runCommand: jest.fn() },
    };
  }

  it("initializes with a display controller, a numpad controller, and a calculator", () => {
    const mainControl = new MainController(initElements());

    expect(mainControl.displayController).not.toBeUndefined();
    expect(mainControl.numpadController).not.toBeUndefined();
    expect(mainControl.calculator).not.toBeUndefined();
  });

  it("throws an error when numpadController is not an instance of NumpadController", () => {
    expect(() => {
      new MainController({
        numpadController: 123,
      });
    }).toThrow("must be an instance of NumpadController");
  });

  it("throws an error when displayController is not an instance of DisplayController", () => {
    expect(() => {
      new MainController({
        numpadController: new NumpadController(),
        displayController: "display",
      });
    }).toThrow("must be an instance of DisplayController");
  })

  it("gets input value from the numpadController and passes it on to the main display", () => {
    const mainControl = new MainController(initElements());
    mainControl.addToDisplay(1);

    expect(mainControl.displayController.main).toEqual("1");
  });

  it("clears input values from the numpadController and clears displays", () => {
    const mainControl = new MainController(initElements());
    mainControl.addToDisplay(1);

    expect(mainControl.displayController.main).toEqual("1");

    mainControl.clearDisplay();

    expect(mainControl.displayController.main).toEqual("");
    expect(mainControl.displayController.secondary).toEqual("");
  });

  it("it clears last character being displayed", () => {
    const mainControl = new MainController(initElements());
    mainControl.addToDisplay(12);

    expect(mainControl.displayController.main).toEqual("12");

    mainControl.clearLastChar();

    expect(mainControl.displayController.main).toEqual("1");
  });

  it("displays a message on screen", () => {
    const mainControl = new MainController(initElements());

    mainControl.displayMsg("test");
    expect(mainControl.displayController.main).toEqual("test");
  });
});
