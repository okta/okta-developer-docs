## Order of the configuration options

When multiple configurations options are used simultaneously, the SDK selects the configuration to use based on the following order:

1. SDK Client constructor
2. Environment variables
3. Configuration

For example, values set in the SDK Client constructor override the
environment variables and configuration file settings. Subsequently,
the environment variables take precedence over the configuration file.

> **Note:** To avoid confusion as to which configuration values that are used by the SDK, you should use only one configuration option in your solution.
