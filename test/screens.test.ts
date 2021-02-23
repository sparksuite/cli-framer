/* eslint-env jest */
/* eslint no-control-regex: "off" */

// Dependencies
const defaultSettings = require('../dist/cjs/default-settings').default;
const screens = require('../dist/cjs/screens').default;

// Remove ANSI formatting
function removeFormatting(text) {
	return text.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

// Tests
describe('#version()', () => {
	test('Full version screen', () => {
		const settings = {
			...defaultSettings,
			app: {
				name: 'Example program',
				version: '1.2.3',
			},
		};

		expect(removeFormatting(screens(settings).version())).toContain('Example program: 1.2.3');
	});

	test('Missing name', () => {
		const settings = {
			...defaultSettings,
			app: {
				name: undefined,
				version: '1.2.3',
			},
		};

		expect(removeFormatting(screens(settings).version())).toContain('1.2.3');
		expect(removeFormatting(screens(settings).version())).not.toContain(':');
	});
});

describe('#help()', () => {
	test('Description line', () => {
		const settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
			arguments: ['list'],
		};

		expect(removeFormatting(screens(settings).help())).toContain('Description: List something');
	});

	test('Usage line (commands + flags + options)', () => {
		const settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
		};

		expect(removeFormatting(screens(settings).help())).toContain('Usage: node entry.js [commands] [flags] [options]');
	});

	test('Usage line (flags + options + data)', () => {
		const settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
			arguments: ['list'],
		};

		expect(removeFormatting(screens(settings).help())).toContain('Usage: node entry.js list [flags] [options] [data]');
	});

	test('Flags - header', () => {
		const settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
		};

		expect(removeFormatting(screens(settings).help())).toContain('FLAGS:');
	});

	test('Flags - non-cascading', () => {
		let settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
		};

		expect(removeFormatting(screens(settings).help())).toContain('--non-cascading');

		settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
			arguments: ['list'],
		};

		expect(removeFormatting(screens(settings).help())).not.toContain('--non-cascading');
	});

	test('Flags - cascading', () => {
		let settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
		};

		expect(removeFormatting(screens(settings).help())).toContain('--quiet');

		settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
			arguments: ['list'],
		};

		expect(removeFormatting(screens(settings).help())).toContain('--quiet');
	});

	test('Flags - shorthand', () => {
		const settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
		};

		expect(removeFormatting(screens(settings).help())).toContain('--quiet, -q');
	});

	test('Flags - description', () => {
		const settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
		};

		expect(removeFormatting(screens(settings).help())).toContain(
			'Disable interactivity, rely on default values instead'
		);
	});

	test('Options - header', () => {
		const settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
		};

		expect(removeFormatting(screens(settings).help())).toContain('OPTIONS:');
	});

	test('Options - cascading', () => {
		let settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
		};

		expect(removeFormatting(screens(settings).help())).toContain('--delivery-zip-code');

		settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
			arguments: ['list'],
		};

		expect(removeFormatting(screens(settings).help())).toContain('--delivery-zip-code');
	});

	test('Options - shorthand', () => {
		const settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
		};

		expect(removeFormatting(screens(settings).help())).toContain('--delivery-zip-code, -z');
	});

	test('Options - description', () => {
		const settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
		};

		expect(removeFormatting(screens(settings).help())).toContain('The delivery ZIP code, for context');
	});

	test('Options - description (type)', () => {
		const settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
			arguments: ['list'],
		};

		expect(removeFormatting(screens(settings).help())).toContain('The maximum price of the items to list (float)');
	});

	test('Options - description (required + accepts)', () => {
		const settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
			arguments: ['list'],
		};

		expect(removeFormatting(screens(settings).help())).toContain(
			'How to sort the list (required) (accepts: popularity, alphabetical)'
		);
	});

	test('Commands - header', () => {
		let settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
		};

		expect(removeFormatting(screens(settings).help())).toContain('COMMANDS:');

		settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
			arguments: ['list'],
		};

		expect(removeFormatting(screens(settings).help())).not.toContain('COMMANDS:');
	});

	test('Commands - description', () => {
		const settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
		};

		expect(removeFormatting(screens(settings).help())).toContain('Order a pizza');
	});

	test('Data - header', () => {
		let settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
			arguments: ['list'],
		};

		expect(removeFormatting(screens(settings).help())).toContain('DATA:');

		settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
		};

		expect(removeFormatting(screens(settings).help())).not.toContain('DATA:');
	});

	test('Data - description', () => {
		const settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
			arguments: ['order', 'dine-in'],
		};

		expect(removeFormatting(screens(settings).help())).toContain('What type of pizza to order');
	});

	test('Data - no description', () => {
		const settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
			arguments: ['order', 'descriptionless-data'],
		};

		expect(removeFormatting(screens(settings).help())).toContain('DATA:');

		expect(removeFormatting(screens(settings).help())).toContain('This command allows data to be passed in');
	});

	test('Data - description (required + accepts)', () => {
		const settings = {
			...defaultSettings,
			mainFilename: `${__dirname}/programs/pizza-ordering/cli/entry.js`,
			usageCommand: 'node entry.js',
			arguments: ['list'],
		};

		expect(removeFormatting(screens(settings).help())).toContain(
			'What you want to list (required) (accepts: toppings, crusts, two words)'
		);
	});
});
