import CommandsManager from "./CommandsManager.js";

describe("Commands Manager", () => {
    it ("takes a MemoryManager-like when it's initialized", () => {
        const mockMemoryManager = {};
        const commandManager = new CommandsManager(mockMemoryManager);

        expect(commandManager.memoryManager).toBe(mockMemoryManager);
    });

    it ("returns an error message if the given command is not supported", () => {
        const commandManager = new CommandsManager();
        const command = "AW"

        expect(commandManager.runCommand(command)).toEqual("Opção nao existente");
    })

    it ("executes valid command A to return list of all supported commands", () => {
        const commandManager = new CommandsManager();
        const expected = [
            "VM - Consultar o valor da memoria",
            "LM - Indicar o nome das memorias",
            "CE - Calcular o valor duma expressão",
            "AVM - Atribuir ultimo valor calculado a uma memoria",
            "A - Ajuda",
            "AM - Alocar Memória",
            "S - Sair"
        ];

        expect(commandManager.help).toEqual(expected.join("\n"));
        expect(commandManager.runCommand("A")).toEqual(expected.join("\n"));
    });

    it("executes valid command CE to calculate expression", () => {
        const calcEngine = jest.fn().mockReturnValueOnce(4);

        const memoryManager = {
            loadMemory: jest.fn().mockReturnValueOnce("+ (1) (3)"),
        };

        const commandManager = new CommandsManager(memoryManager, calcEngine);

        commandManager.runCommand("CE + (1) (3)");

        expect(calcEngine).toHaveBeenCalledWith("+ (1) (3)");
        expect(calcEngine).toHaveBeenCalledTimes(1);
    });

    it("executes valid command AM to create a new memory with the given arguments", () => {
        const memoryManager = {
            create: jest.fn().mockReturnValueOnce("created"),
        };
        
        const commandManager = new CommandsManager(memoryManager);
        const result = commandManager.runCommand("AM memoryOne");

        expect(memoryManager.create).toHaveBeenCalledWith("memoryOne");
        expect(result).toEqual("created");
    });

    it("executes valid command VM to read the value of the given memory", () => {
        const memoryManager = {
            read: () => 'value',
        };

        const readSpy = jest.spyOn(memoryManager, "read");
        const commandManager = new CommandsManager(memoryManager);
        const result = commandManager.runCommand("VM memoryOne");

        expect(readSpy).toHaveBeenCalledWith("memoryOne");
        expect(result).toEqual("value");
    });

    it ("executes valid command LM to list all saved memories and their values", () => {
        const memoryManager = {
            list: jest.fn().mockReturnValueOnce("list"),
        };

        const commandManager = new CommandsManager(memoryManager);
        const result = commandManager.runCommand("lm");

        expect(memoryManager.list).toHaveBeenCalledTimes(1);
        expect(result).toEqual("list");
    });

    it ("executes valid command S to quit application and return message", () => {
        const commandManager = new CommandsManager();
        const result = commandManager.runCommand("s");

        expect(commandManager.quit).toEqual("Aplicação terminada. Até à próxima.");
        expect(result).toEqual("Aplicação terminada. Até à próxima.");
    });

    it ("executes valid command AVM to add last calculated value to specified memory", () => {
        const memoryManager = {
            update: jest.fn().mockReturnValueOnce("primeira: 0.00"),
        };

        const commandManager = new CommandsManager(memoryManager);
        commandManager.runCommand("AVM primeira");
        
        expect(memoryManager.update).toHaveBeenCalledWith("primeira", 0);
    });

});