const { defineConfig } = require('cypress')

module.exports = defineConfig({
  screenshotsFolder: 'tests/cypress/screenshots',
  videosFolder: 'tests/cypress/videos',
  fixturesFolder: 'tests/cypress/fixtures',
  chromeWebSecurity: false,
  scrollBehavior: 'center',
  video: true,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  viewportWidth: 1280,
  viewportHeight: 1024,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./tests/cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:8080/',
    specPattern: 'tests/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/cypress/support/index.js',
  },
})
