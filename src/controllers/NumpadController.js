export default class NumpadController {
    constructor(buttonIDS, onButtonClick) {
        this.buttons = {
            expEl: document.getElementById(buttonIDS.expID),
            logEl: document.getElementById(buttonIDS.logID),
            sinEl: document.getElementById(buttonIDS.sinID),
            cosEl: document.getElementById(buttonIDS.cosID),
            ceilEl: document.getElementById(buttonIDS.ceilID),
            floorEl: document.getElementById(buttonIDS.floorID),
            roundEl: document.getElementById(buttonIDS.roundID),
            absEl: document.getElementById(buttonIDS.absID),
            multiplyEl: document.getElementById(buttonIDS.multiplyID),
            divideEl: document.getElementById(buttonIDS.divideID),
            addEl: document.getElementById(buttonIDS.addID),
            subtractEl: document.getElementById(buttonIDS.subtractID),
            oneEl: document.getElementById(buttonIDS.oneID),
            twoEl: document.getElementById(buttonIDS.twoID),
            threeEl: document.getElementById(buttonIDS.threeID),
            fourEl: document.getElementById(buttonIDS.fourID),
            fiveEl: document.getElementById(buttonIDS.fiveID),
            sixEl: document.getElementById(buttonIDS.sixID),
            sevenEl: document.getElementById(buttonIDS.sevenID),
            eightEl: document.getElementById(buttonIDS.eightID),
            nineEl: document.getElementById(buttonIDS.nineID),
            zeroEl: document.getElementById(buttonIDS.zeroID),
            clearAllEl: document.getElementById(buttonIDS.clearAllID),
            openEl: document.getElementById(buttonIDS.openID),
            closeEl: document.getElementById(buttonIDS.closeID),
            exitEl: document.getElementById(buttonIDS.exitID),
            helpEl: document.getElementById(buttonIDS.helpID),
            dotEl: document.getElementById(buttonIDS.dotID),
            equalEl: document.getElementById(buttonIDS.equalID),
            spaceEl: document.getElementById(buttonIDS.spaceID),
        };

        const pairs = [
            { id: buttonIDS.expID, value: 'EXP' },
            { id: buttonIDS.logID, value: 'LOG' },
            { id: buttonIDS.sinID, value: 'SIN' },
            { id: buttonIDS.cosID, value: 'COS' },
            { id: buttonIDS.ceilID, value: 'CEIL' },
            { id: buttonIDS.floorID, value: 'FLOOR' },
            { id: buttonIDS.roundID, value: 'ROUND' },
            { id: buttonIDS.absID, value: 'ABS' },
            { id: buttonIDS.multiplyID, value: '*' },
            { id: buttonIDS.divideID, value: '/' },
            { id: buttonIDS.addID, value: '+' },
            { id: buttonIDS.subtractID, value: '-' },
            { id: buttonIDS.oneID, value: 1 },
            { id: buttonIDS.twoID, value: 2 },
            { id: buttonIDS.threeID, value: 3 },
            { id: buttonIDS.fourID, value: 4 },
            { id: buttonIDS.fiveID, value: 5 },
            { id: buttonIDS.sixID, value: 6 },
            { id: buttonIDS.sevenID, value: 7 },
            { id: buttonIDS.eightID, value: 8 },
            { id: buttonIDS.nineID, value: 9 },
            { id: buttonIDS.zeroID, value: 0 },
            { id: buttonIDS.clearAllID, value: '' },
            { id: buttonIDS.openID, value: '(' },
            { id: buttonIDS.closeID, value: ')' },
            { id: buttonIDS.exitID, value: 'S' },
            { id: buttonIDS.helpID, value: 'A' },
            { id: buttonIDS.dotID, value: '.' },
            { id: buttonIDS.equalID, value: 'CE' },
            { id: buttonIDS.spaceID, value: ' ' },
        ];

        // chamar a função em cada iteração

        function setupListenerValue(id, value) {
            if (!id) return;
            document.getElementById(id).addEventListener('click', () => {
                onButtonClick(value);
            });
        }

        pairs.forEach(pair => {
            setupListenerValue(pair.id, pair.value);
        });
    }
}
