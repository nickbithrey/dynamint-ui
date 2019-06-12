module.exports = {
	verbose: true,
	setupFilesAfterEnv : ["<rootDir>setupTests.js"],
	snapshotSerializers: ["enzyme-to-json/serializer"],
	moduleDirectories: ["node_modules", "src"],
	moduleNameMapper: {
		"~(.*)$": "<rootDir>/src/$1"
	}
}