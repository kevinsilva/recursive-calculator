import DisplayController from "./DisplayController.js";

describe("Display Controller", () => {
  function initElements() {
    return {
      elMain: { innerText: "" },
      elSecondary: { innerText: "" },
    };
  }

  it("initializes with both displays empty", () => {
    const display = new DisplayController(initElements());

    expect(display.main).toEqual("");
    expect(display.secondary).toEqual("");
  });

  it("renders inputs to main display", () => {
    const elements = initElements();
    const display = new DisplayController(elements);
    const input = "234";

    display.main = input;

    expect(elements.elMain.innerText).toEqual(input);
  });

  it("renders inputs to secondary display", () => {
    const elements = initElements();
    const display = new DisplayController(elements);
    const input = "234";

    display.secondary = input;

    expect(elements.elSecondary.innerText).toEqual(input);
  });

  it("clears inputs on both displays", () => {
    const elements = initElements();
    elements.elMain.innerText = "123";
    elements.elSecondary.innerText = "456";

    const display = new DisplayController(elements);

    expect(display.main).toEqual("123");
    expect(display.secondary).toEqual("456");

    display.clear();

    expect(display.main).toEqual("");
    expect(display.secondary).toEqual("");
  });
});

// import DisplayController from "./DisplayController.js";

// describe("Display Controller", () => {

//     function initElements() {
//         return {
//             elMain: {innerText: ""},
//             elSecondary: {innerText: ""}
//         }
//     }

//     it ("initializes with both displays empty", () => {
//         const display = new DisplayController(initElements());

//         expect(display.getMain()).toEqual("");
//         expect(display.getSecondary()).toEqual("");
//     });

//     it ("renders inputs to main display", () => {

//         const elements = initElements();
//         const display = new DisplayController(elements);
//         const input = "234";

//         display.setMain(input);

//         expect(elements.elMain.innerText).toEqual(input);
//     });

//     it ("renders inputs to secondary display", () => {

//         const elements = initElements();
//         const display = new DisplayController(elements);
//         const input = "234";

//         display.setSecondary(input);

//         expect(elements.elSecondary.innerText).toEqual(input);
//     });

//     it ("clears inputs on both displays", () => {
//         const elements = initElements();
//         elements.elMain.innerText = "123";
//         elements.elSecondary.innerText = "456";

//         const display = new DisplayController(elements);

//         expect(display.getMain()).toEqual("123");
//         expect(display.getSecondary()).toEqual("456");

//         display.clear();

//         expect(display.getMain()).toEqual("");
//         expect(display.getSecondary()).toEqual("");
//     })

// })
