## Order of the configuration options

When multiple configurations options are used simultaneously, the SDK selects the configuration to use based on the following order:

1. As a YAML file in your home directory
2. As part of an appsettings.json file in your application’s working directory
3. As a YAML file in your application’s working directory
4. In environment variables
5. In the client constructor for the application

This is the order that the locations are searched for configuration information. If information is set in more than one location, it is overwritten so if, for example, the `Issuer` is set in both an `okta.yaml` file and in environment variables, the value in the environment variables takes precedence. If the `Issuer` was also set in the client constructor, that value would be used instead of either of the other two.

> **Note:** To avoid confusion as to which configuration values that are used by the SDK, you should use only one configuration option in your solution.
