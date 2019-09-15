module.exports = {
	globals: {'ts-jest': {tsConfig: 'tsconfig.json'}},
	moduleFileExtensions: ['ts','js'],
  testPathIgnorePatterns:["<rootDir>/test/controllers"],
	transform: {'^.+\\.(ts|tsx)$': './node_modules/ts-jest'},
	testMatch: ['**/jestine/test/all.test.(ts|js)'],
	testEnvironment: 'node'
};