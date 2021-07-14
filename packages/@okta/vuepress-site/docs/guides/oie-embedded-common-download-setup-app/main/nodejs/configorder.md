The sample app uses configuration values from `config.js`, and the `config.js` loads information from environment variables (`process.env`). You can add environment variables by either exporting from shell or using the `testenv` file.

When multiple configurations options are used simultaneously, the SDK chooses
the option based on the following order:

* Sample app `config.js` file
* Environment variables
* `testenv` environment variable file

For example, values set in the sample app `config.js` override the
environment variables and configuration file settings. Subsequently,
the environment variables take precedence over the `testenv` file.

> **Note:** To avoid confusion on how the configuration values are being
set, we recommend that you only use one configuration option in your solution.
