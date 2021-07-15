When multiple çonfigurations options are used simultaneously, the SDK chooses
the option based on the following order:

* SDK Client constructor
* Environment variables
* Configuration

For example, values set in the SDK Client constructor override the
environment variables and configuration file settings. Subsequently,
the environment variables take precedence over the configuration file.

> **Note:** To avoid confusion on how the configuration values are being
set, we recommend that you only use one configuration option in your solution.
