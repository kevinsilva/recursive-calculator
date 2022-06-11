import InterfaceManager from "./InterfaceManager.js"

describe("Interface Manager", () => {
  it("takes a calculator-like class when it is created", () => {
    const mockCalculator = {};
    const interfaceCalc = new InterfaceManager(mockCalculator);

    expect(interfaceCalc.calculator).toBe(mockCalculator);
  });

  it("renders user event inputs on the main display", () => {
    const mockCalculator = {};
    const mockDisplay = {
      firstElementChild: jest.fn()
    }

    const mockSecond = {
      firstElementChild: jest.fn()
    }

    const interfaceCalc = new InterfaceManager(mockCalculator, mockDisplay, mockSecond);
    interfaceCalc.add("2");
    interfaceCalc.render();

    expect(mockDisplay.firstElementChild.innerText).toEqual("2");
  });

  it("renders calculated user event inputs on the secondary display", () => {
    const mockCalculator = {
      runCommand: jest.fn()
    };
    const mockDisplay = {
      firstElementChild: jest.fn()
    }

    const mockSecond = {
      firstElementChild: jest.fn()
    }

    const interfaceCalc = new InterfaceManager(mockCalculator, mockDisplay, mockSecond);

    const input = "CE + (1) (1)";
    interfaceCalc.add(input);
    interfaceCalc.runCalculator(input);
    interfaceCalc.render();

    expect(mockSecond.firstElementChild.innerText).toEqual(input);
  });

  it("renders the output of user input calculations", () => {
    const mockCalculator = {
      runCommand: jest.fn().mockReturnValue("2")
    };

    const mockDisplay = {
      firstElementChild: jest.fn()
    }

    const mockSecond = {
      firstElementChild: jest.fn()
    }

    const interfaceCalc = new InterfaceManager(mockCalculator, mockDisplay, mockSecond);

    const input = "CE + (1) (1)";
    interfaceCalc.add(input);
    interfaceCalc.runCalculator(input);
    interfaceCalc.render();

    expect(mockDisplay.firstElementChild.innerText).toEqual("2");
  });

  xit("deletes rendered user event inputs whenever the clear key gets clicked", () => {
    const mockCalculator = {
      runCommand: jest.fn().mockReturnValue("2")
    };

    const mockDisplay = {
      firstElementChild: jest.fn()
    }

    const mockSecond = {
      firstElementChild: jest.fn()
    }

    const interfaceCalc = new InterfaceManager(mockCalculator, mockDisplay, mockSecond);
    const input = "CE + (1) (1)";
    interfaceCalc.add(input);

    const clearKey = document.getElementById("clear-all");

    let event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window
    });


    // const click = clearKey.dispatchEvent(event);
    document.dispatchEvent(event);

    // expect(interfaceCalc.clear).toHaveBeenCalled();
    expect(mockDisplay.firstElementChild.innerText).toEqual("");

  });
})

//main-controller
// o utilizador clica numa tecla
// -> numpad controller determina o valor
// -> main controller passa para o
// -> display-controller actualiza main display

// display-controller
//   renderizar (mostrar e esconder) inputs para main e secondary
//
// numpad-controller
//   detecta click events em cada tecla e determina o input