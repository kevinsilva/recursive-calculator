export default class MemoryManager {
    constructor() {
        this.memory = {};
    }

    create(memoryName) {
        if (this.memoryExists(memoryName)) {
            return "ja existe uma memoria com o mesmo nome.";
        } 

        if (!this.isMemoryFull()) {
            this.memory[memoryName] = 0;
            return `Memoria criada com o nome: ${memoryName}`;
        }

        return "A calculadora não tem mais memórias disponíveis";
    }

    read(memoryName) {
        if (this.memoryExists(memoryName)) {
            return `${memoryName}: ${this.memory[memoryName].toFixed(2)}`;
        } else {
            return `Memoria nao existente.`
        }
    }

    update(memoryName, value) {
        if (this.memoryExists(memoryName)) {
            this.memory[memoryName] = value;
            return `${memoryName}: ${this.memory[memoryName].toFixed(2)}`;
        } else {
            return `Memoria nao existente.`
        }
    }

    delete(memoryName) {
        if (this.memoryExists(memoryName)) {
            delete this.memory[memoryName];
            return `Memoria ${memoryName} apagada`;
        } else {
            return `Memoria nao existente.`
        }
    }

    list() {
        if (this.createdMemoryNames(this.memory).length === 0) {
            return "Calculadora sem memorias.";
        }

        return this.createdMemoryNames()
            .map(name => `${name}: ${this.memory[name].toFixed(2)}`)
            .join("; ");
    }

    _isMemoryUsed(expression) { 
        const memoryRegex = this.createdMemoryNames()
                            .map(name => new RegExp(name, 'g'));
        
        for (const reg of memoryRegex) {
            if (reg.test(expression)) return true;
            return false;
        }
    }

    loadMemory(expression) {
        let result = expression;

        for (const name of this.createdMemoryNames()) {
            const value = this.memory[name];

            result = result.replaceAll(name, value);
        }
        return result
    }

    createdMemoryNames() {
        return Object.keys(this.memory);
    }

    memoryExists(memoryName) {
        return Object.keys(this.memory).includes(memoryName)
    }

    isMemoryFull() {
        return Object.keys(this.memory).length < 2 ? false : true;
    }

}

// First Approach of loadMemory

// loadMemory(expression) {
//     if (!this._isMemoryUsed(expression)) return expression;
//     const memoryRegex = this.createdMemoryNames()
//                         .map(name => new RegExp(name, 'g'));
        
//     const memoryValues = this.createdMemoryNames()
//                         .map(name => this.memory[name]);
        
//     for (let i = 0; i < memoryRegex.length; i++) {
//         expression = expression.replace(memoryRegex[i], memoryValues[i]);
//     }
//     return expression;

// }



// export default class MemoryManagerWilliam {
//     constructor() {
//         this._register = {};
//     }

//     create(name) {
//         if (!name) return MemoryManager.ERR.MEM_NAME_REQUIRED;
//         if (this.usedCount === MemoryManager.MAX_SLOTS)
//             return MemoryManager.ERR.FULL;
//         if (this._register.hasOwnProperty(name)) return MemoryManager.ERR.IGNORED;

//         this._register[name] = 0;
//     }

//     read(name) {
//         let error = this._validateName(name);
//         if (error !== null) return error;

//         return this._register[name];
//     }

//     update(name, value) {
//         let error = this._validateName(name);
//         if (error !== null) return error;

//         this._register[name] = value;
//     }

//     list() {
//         return this.usedCount === 0 ? null : { ...this._register };
//     }

//     _validateName(name) {
//         if (!name) return MemoryManager.ERR.MEM_NAME_REQUIRED;
//         if (!this._register.hasOwnProperty(name)) 
//             return MemoryManager.ERR.MEM_NAME_NOT_FOUND;
//         return null;
//     }

//     get usedCount() {
//         return Object.getOwnPropertyNames(this._register).length;
//     }

//     static get MAX_SLOTS() {
//         return 2;
//     }

//     static get ERR() {
//         return {
//             MEM_NAME_REQUIRED: "MEM_NAME_REQUIRED",
//             FULL: "FULL",
//             MEM_NAME_NOT_FOUND: "MEM_NAME_NOT_FOUND",
//             IGNORED: "IGNORED",
//         };
//     }

//     static isError(value) {
//         return MemoryManagerWilliam.ERR.hasOwnProperty(value);
//     }