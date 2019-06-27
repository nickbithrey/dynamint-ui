module.exports = {
	verbose: true,
	setupFilesAfterEnv : ["<rootDir>setupTests.js"],
	snapshotSerializers: ["enzyme-to-json/serializer"],
	moduleDirectories: ["node_modules", "src"],
	moduleNameMapper: {
		"~(.*)$": "<rootDir>/src/$1",
		'office-ui-fabric-react/lib/(.*)$': 'office-ui-fabric-react/lib-commonjs/$1'
	}
}