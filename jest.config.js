module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/*.vue', '!**/node_modules/**']
}
