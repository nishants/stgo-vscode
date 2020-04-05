module.exports = {
  verbose: true,
  roots: ["ui"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  coverageReporters: ["text"],
  globals: {
    acquireVsCodeApi: () => {
    }
  },
  transform: {"\\.js$": ['babel-jest']},
  "setupFiles": ["./ui/jestsetup.js"],
};