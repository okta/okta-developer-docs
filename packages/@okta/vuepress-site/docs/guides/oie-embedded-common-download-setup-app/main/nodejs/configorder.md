## Order of the configuration options

The sample app uses configuration values from `config.js`, and the `config.js` loads information from environment variables (`process.env`). You can set environment variables by either using the shell command or the `testenv` file.

When multiple configuration options are used simultaneously, the SDK selects the configuration to use based on the following order:

1. Sample app `config.js` file
2. Environment variables
3. `testenv` environment variable file

For example, values that are set in the sample app `config.js` override the environment variables and configuration file settings. Subsequently, the environment variables take precedence over the `testenv` file.

> **Note:** Use only one configuration option in your solution to avoid confusion with setting overrides.
