## Order of the configuration options

When multiple configuration options are used simultaneously, the SDK selects the configuration to use based on the following order:

1. SDK Client constructor
1. Configuration file in the application or project root directory
1. Configuration file in the user's home directory
1. Environment variables

The values set in the SDK Client constructor are preferred to the configuration files, which in turn are preferred to those set in the environment variables. If setting values are missing from higher order locations,
then the SDK attempts to find the setting values at a lower order location. For example,
consider an application that runs on a machine where settings are stored in a configuration file (in the home directory) and also in environment variables. When the application loads, it first looks for the setting in the configuration file. Using the **Client ID** as an example, if the
`clientId` setting is missing from the configuration file but the `OKTA_IDX_CLIENTID` environment
variable is found, then the **Client ID** is set to the environment variable value.

> **Note:** To avoid confusion as to which configuration values are used by the SDK, you should use only one configuration option in your solution.
