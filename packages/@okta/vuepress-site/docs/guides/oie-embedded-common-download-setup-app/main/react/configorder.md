## Order of the configuration options

When multiple configurations are used simultaneously, the [sample app](https://github.com/okta/okta-auth-js/tree/master/samples/generated/react-embedded-auth-with-sdk) selects the configuration based on the following order:

1. [Directly in code](#directly-in-code)
1. [Environment variables](#environment-variables)
1. [External configuration file](#external-configuration-file)

> **Note:** Use only one configuration option in your solution to avoid confusion with setting overrides.
