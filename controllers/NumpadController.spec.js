// -> o utilizador clica numa tecla
// -> numpad controller determina o valor
// -> main controller passa para o
// -> display-controller actualiza main display

// numpad-controller
//   detecta click events em cada tecla e determina o valor

import NumpadController from './NumpadController.js';

describe('Numpad Controller', () => {
    it('initializes with numpad buttons', () => {
        document.body.innerHTML =
            '  <button id="one" />' + '<button id="exp" />';

        const arg = { expID: 'exp', oneID: 'one' };
        const numpad = new NumpadController(arg);

        expect(numpad.buttons.expEl.id).toEqual(arg.expID);
        expect(numpad.buttons.oneEl.id).toEqual(arg.oneID);
    });

    it('detects user click events and determines its value', () => {
        document.body.innerHTML =
            ' <button id="one" />' + '<button id="exp" />';

        const arg = { expID: 'exp', oneID: 'one' };
        const clickSpy = jest.fn();
        const numpad = new NumpadController(arg, clickSpy);

        const click = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        numpad.buttons.oneEl.dispatchEvent(click);
        numpad.buttons.expEl.dispatchEvent(click);

        expect(clickSpy).toHaveBeenCalledWith(1);
        expect(clickSpy).toHaveBeenCalledWith('EXP');
    });

    it('detects unary operands click events and determines its value', () => {
        document.body.innerHTML =
            '<button id="exp" />' +
            '<button id="log" />' +
            '<button id="sin" />' +
            '<button id="cos" />' +
            '<button id="ceil" />' +
            '<button id="floor" />' +
            '<button id="round" />' +
            '<button id="abs" />';

        const arg = {
            expID: 'exp',
            logID: 'log',
            sinID: 'sin',
            cosID: 'cos',
            ceilID: 'ceil',
            floorID: 'floor',
            roundID: 'round',
            absID: 'abs',
        };

        const clickSpy = jest.fn();
        const numpad = new NumpadController(arg, clickSpy);

        const click = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        numpad.buttons.expEl.dispatchEvent(click);
        numpad.buttons.logEl.dispatchEvent(click);
        numpad.buttons.sinEl.dispatchEvent(click);
        numpad.buttons.cosEl.dispatchEvent(click);
        numpad.buttons.ceilEl.dispatchEvent(click);
        numpad.buttons.floorEl.dispatchEvent(click);
        numpad.buttons.roundEl.dispatchEvent(click);
        numpad.buttons.absEl.dispatchEvent(click);

        expect(clickSpy).toHaveBeenCalledWith('EXP');
        expect(clickSpy).toHaveBeenCalledWith('LOG');
        expect(clickSpy).toHaveBeenCalledWith('SIN');
        expect(clickSpy).toHaveBeenCalledWith('COS');
        expect(clickSpy).toHaveBeenCalledWith('CEIL');
        expect(clickSpy).toHaveBeenCalledWith('FLOOR');
        expect(clickSpy).toHaveBeenCalledWith('ROUND');
        expect(clickSpy).toHaveBeenCalledWith('ABS');
    });

    it('detects binary operators click events and determines its value', () => {
        document.body.innerHTML =
            '<button id="add" />' +
            '<button id="subtract" />' +
            '<button id="divide" />' +
            '<button id="multiply" />';

        const arg = {
            addID: 'add',
            subtractID: 'subtract',
            divideID: 'divide',
            multiplyID: 'multiply',
        };

        const clickSpy = jest.fn();
        const numpad = new NumpadController(arg, clickSpy);

        const click = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        numpad.buttons.addEl.dispatchEvent(click);
        numpad.buttons.subtractEl.dispatchEvent(click);
        numpad.buttons.divideEl.dispatchEvent(click);
        numpad.buttons.multiplyEl.dispatchEvent(click);

        expect(clickSpy).toHaveBeenCalledWith('+');
        expect(clickSpy).toHaveBeenCalledWith('-');
        expect(clickSpy).toHaveBeenCalledWith('/');
        expect(clickSpy).toHaveBeenCalledWith('*');
    });

    it('detects operands click events and determines its value', () => {
        document.body.innerHTML =
            '<button id="one" />' +
            '<button id="two" />' +
            '<button id="three" />' +
            '<button id="four" />' +
            '<button id="five" />' +
            '<button id="six" />' +
            '<button id="seven" />' +
            '<button id="eight" />' +
            '<button id="nine" />' +
            '<button id="zero" />';

        const arg = {
            oneID: 'one',
            twoID: 'two',
            threeID: 'three',
            fourID: 'four',
            fiveID: 'five',
            sixID: 'six',
            sevenID: 'seven',
            eightID: 'eight',
            nineID: 'nine',
            zeroID: 'zero',
        };

        const clickSpy = jest.fn();
        const numpad = new NumpadController(arg, clickSpy);

        const click = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        numpad.buttons.oneEl.dispatchEvent(click);
        numpad.buttons.twoEl.dispatchEvent(click);
        numpad.buttons.threeEl.dispatchEvent(click);
        numpad.buttons.fourEl.dispatchEvent(click);
        numpad.buttons.fiveEl.dispatchEvent(click);
        numpad.buttons.sixEl.dispatchEvent(click);
        numpad.buttons.sevenEl.dispatchEvent(click);
        numpad.buttons.eightEl.dispatchEvent(click);
        numpad.buttons.nineEl.dispatchEvent(click);
        numpad.buttons.zeroEl.dispatchEvent(click);

        expect(clickSpy).toHaveBeenCalledWith(1);
        expect(clickSpy).toHaveBeenCalledWith(2);
        expect(clickSpy).toHaveBeenCalledWith(3);
        expect(clickSpy).toHaveBeenCalledWith(4);
        expect(clickSpy).toHaveBeenCalledWith(5);
        expect(clickSpy).toHaveBeenCalledWith(6);
        expect(clickSpy).toHaveBeenCalledWith(7);
        expect(clickSpy).toHaveBeenCalledWith(8);
        expect(clickSpy).toHaveBeenCalledWith(9);
        expect(clickSpy).toHaveBeenCalledWith(0);
    });

    it('detects commands click events and determines its value', () => {
        document.body.innerHTML =
            '<button id="clearAll" />' +
            '<button id="open" />' +
            '<button id="close" />' +
            '<button id="exit" />' +
            '<button id="help" />' +
            '<button id="dot" />' +
            '<button id="equal" />' +
            '<button id="space" />';

        const arg = {
            clearAllID: 'clearAll',
            openID: 'open',
            closeID: 'close',
            exitID: 'exit',
            helpID: 'help',
            dotID: 'dot',
            equalID: 'equal',
            spaceID: 'space',
        };

        const clickSpy = jest.fn();
        const numpad = new NumpadController(arg, clickSpy);

        const click = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        numpad.buttons.clearAllEl.dispatchEvent(click);
        numpad.buttons.openEl.dispatchEvent(click);
        numpad.buttons.closeEl.dispatchEvent(click);
        numpad.buttons.exitEl.dispatchEvent(click);
        numpad.buttons.helpEl.dispatchEvent(click);
        numpad.buttons.dotEl.dispatchEvent(click);
        numpad.buttons.equalEl.dispatchEvent(click);
        numpad.buttons.spaceEl.dispatchEvent(click);

        expect(clickSpy).toHaveBeenCalledWith('');
        expect(clickSpy).toHaveBeenCalledWith('(');
        expect(clickSpy).toHaveBeenCalledWith(')');
        expect(clickSpy).toHaveBeenCalledWith('S');
        expect(clickSpy).toHaveBeenCalledWith('A');
        expect(clickSpy).toHaveBeenCalledWith('.');
        expect(clickSpy).toHaveBeenCalledWith('CE');
        expect(clickSpy).toHaveBeenCalledWith(' ');
    });
});
