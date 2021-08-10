## Order of configuration options

When multiple configuration options are used simulteneously, the SDK chooses
which values to use in the following order of preference:

1. SDK Client constructor
1. Configuration file in application or project root directory
1. Configuration file in user's home directory
1. Environment variables

Values set in the SDK Client constructor are used in preference to
environment variables, which in turn are used in preference to those set
in the configuration files. If settings are missing from higher order locations,
than the SDK attempts to find the setting value at a lower order location. For example,
consider an application that runs on a machine where settings are stored in a configuration file
in the home directory and also in environment variables. During application load, the application
searches for the **client ID** value and will search the configuration file first.  If the
`clientId` setting is missing from configuration file but the `OKTA_IDX_CLIENTID` environment
variable is found, **client ID** is set to the environment variable value.

> **Note:** To avoid confusion on how the configuration values are being
set, we recommend that you only use one configuration option in your solution.
