import CommandsManager from './commands-manager/CommandsManager.js';
import singlePassEvaluator from './calc-engine/single-pass/single-pass.js';
import MemoryManager from './memory-manager/MemoryManager.js';

const memoryManager = new MemoryManager();
const calcEngine = singlePassEvaluator;
const calculator = new CommandsManager(memoryManager, calcEngine);


export default calculator;
