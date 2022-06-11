import MainController from './MainController.js';
import NumpadController from './NumpadController.js';
jest.mock('./NumpadController.js');

//main-controller
// o utilizador clica numa tecla
// -> numpad controller determina o valor
// -> main controller passa para o
// -> display-controller actualiza main display

// main-controller
//   recebe input do numpad e passa para o display

describe('Main Controller', () => {
  function initElements() {
    return {
      displayController: {
        main: '',
        secondary: '',
      },
      numpadController: new NumpadController(),
      // { buttons: {}, onButtonClick: jest.fn() },
      calculator: { runCommand: jest.fn() },
    };
  }

  it('initializes with a display controller, a numpad controller, and a calculator', () => {
    const mainControl = new MainController(initElements());

    expect(mainControl.displayController).not.toBeUndefined();
    expect(mainControl.numpadController).not.toBeUndefined();
    expect(mainControl.calculator).not.toBeUndefined();
  });

  it('throws an error when numpadController is not an instance of NumpadController', () => {
    expect(() => {
      new MainController({
        numpadController: 123,
      });
    }).toThrow('must be an instance of NumpadController');
  });

  //TODO adicionar para os outros

  it('gets input value from the numpadController and passes it on to the main display', () => {
    const mainControl = new MainController(initElements());
    mainControl.addToDisplay(1);

    expect(mainControl.displayController.main).toEqual('1');
  });
});
