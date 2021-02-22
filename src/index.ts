// Imports
import { init, parse } from './waterfall-cli';
import printError from './print-pretty-error';

// Export in a way that's compatible with ES6 and CommonJS
const waterfall = {
	init,
	parse,
	printError,
};

export = {
	...waterfall,
	default: waterfall,
};

// Expose some types
export type { Settings, CommandSpec } from './types';
