import MemoryManager from "./MemoryManager.js";

describe("Memory Manager", () => {

    //describe update read etc
    it("has no memories when it's created", () => {
        //arrange
        const mm = new MemoryManager();
        //act
        //assert
        expect(mm.list()).toEqual("Calculadora sem memorias."); //LM
        expect(mm.read("first")).toEqual("Memoria nao existente."); //VM
    });

    it ("creates a memory with a variable name", () => {
        const mm = new MemoryManager();
        mm.create("first");

        expect(mm.memory.hasOwnProperty("first")).toBe(true);
    });

    it ("cannot create more than two memories", () => {
        const mm = new MemoryManager();
        mm.create("first");
        mm.create("second");
        const error = mm.create("third");

        expect(mm.memory.hasOwnProperty("first")).toBe(true);
        expect(mm.memory.hasOwnProperty("second")).toBe(true);
        expect(mm.memory.hasOwnProperty("third")).toBe(false);
        expect(error).toBe("A calculadora não tem mais memórias disponíveis");
        
    });

    it ("cannot assign a repeated memory name and returns a warning", () => {
        const mm = new MemoryManager();
        const first = mm.create("first"); 
        const second = mm.create("first"); 
        
        mm.update("first", 10);

        expect(mm.memory.hasOwnProperty("first")).toBe(true);
        expect(first).not.toEqual("ja existe uma memoria com o mesmo nome.");
        expect(Object.keys(mm.memory).length).toEqual(1);
        expect(second).toEqual("ja existe uma memoria com o mesmo nome.");
        expect(mm.read("first")).toEqual("first: 10.00");
    });

    it ("lists all saved memories and their value or a string in case there is no saved memories", () => {
        const mm = new MemoryManager();
        const nothing = mm.list();
        mm.create("first");
        const something = mm.list();
        mm.create("second");
        const somethings = mm.list();

        expect(nothing).toEqual("Calculadora sem memorias.");
        expect(something).toEqual("first: 0.00");
        expect(somethings).toEqual("first: 0.00; second: 0.00");
    });

    it ("reads the values of specific memories", () => {
        const mm = new MemoryManager();
        mm.create("first");
        const result = mm.update("first", 245.45999);

        expect(result).toEqual("first: 245.46");
        expect(mm.update("second", 30)).toEqual("Memoria nao existente.");
    });

    it ("deletes specified memory", () => {
        const mm = new MemoryManager();

        mm.create("first");
        const something = mm.read("first");
        mm.delete("first");
        const nothing = mm.read("first");

        expect(something).toEqual("first: 0.00");
        expect(nothing).toEqual("Memoria nao existente.");    
    });

    it ("reads memory names on an expression and loads inherent values", () => {
        const mm = new MemoryManager();
        mm.create("memory_1");
        mm.update("memory_1", 9);
        mm.create("memory_2");
        mm.update("memory_2", 19);
        
        const result = mm.loadMemory("CE + (memory_1) (memory_2)");
        const result2 = mm.loadMemory("+ (memory_1) (memory_2)");
        const result3 = mm.loadMemory("+ (1) (2)");
        const result4 = mm.loadMemory("+ (memory_1) (memory_u)");

        expect(result).toEqual("CE + (9) (19)");
        expect(result2).toEqual("+ (9) (19)");
        expect(result3).toEqual("+ (1) (2)");
        expect(result4).toEqual("+ (9) (memory_u)"); // calculation-engine will deal with error.
        
        // expect(result4).toEqual("Memoria nao existente")
        // Not worth implementing. Difficult to find memories that do not exist.

    });

});