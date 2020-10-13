module.exports = {
	preset: 'ts-jest',
	rootDir: __dirname,
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
	testMatch: ['<rootDir>/packages/**/__tests__/**/*spec.[jt]s?(x)'],
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
