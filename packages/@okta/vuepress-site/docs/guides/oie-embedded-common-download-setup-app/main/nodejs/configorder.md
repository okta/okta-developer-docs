When multiple çonfigurations options are used simultaneously, the SDK chooses
the option based on the following order:

* SDK `config.js` file
* Environment variables
* `testenv` environment variable file

For example, values set in the SDK `config.js` override the
environment variables and configuration file settings. Subsequently,
the environment variables take precedence over the `testenv` file.

> **Note:** To avoid confusion on how the configuration values are being
set, we recommend that you only use one configuration option in your solution.
