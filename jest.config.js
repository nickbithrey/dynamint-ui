module.exports = {
	verbose: true,
	setupFilesAfterEnv : ["<rootDir>/test/setupEnzyme.ts"],
	snapshotSerializers: ["enzyme-to-json/serializer"],
	moduleDirectories: ["node_modules", "src"],
	moduleNameMapper: {
		'~/(.*)$': '<rootDir>/src/$1',
		'office-ui-fabric-react/lib/(.*)$': 'office-ui-fabric-react/lib-commonjs/$1'
	},
	moduleFileExtensions: [
		"ts",
		"tsx",
		"js"
	],
	modulePathIgnorePatterns: [
		"js"
	],
	roots: [
		"<rootDir>/src",
		"<rootDir>/test"
	],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest"
	},
	preset: 'ts-jest'
}