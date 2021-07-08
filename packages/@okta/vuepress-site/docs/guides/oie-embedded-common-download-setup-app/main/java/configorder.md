When multiple çonfigurations options are used simultaneously, the SDK library selects the configurations based on the following order:

1. The `okta.yaml` file at the root of the app's classpath
2. The `okta.yaml` file in the `.okta` folder from your home directory (for instance, `~/.okta/okta.yaml` or `%userprofile%\.okta\okta.yaml`)
3. The environment variables
4. The Java system properties
5. Configurations in the SDK client constructor (configurations are explicitly declared in your app)

Each increasing configuration option supersedes the previous configuration. For example, if you configure the `~/.okta/okta.yaml` file and set the environment variables with different configuration values, the environment variable values will override the `~/.okta/okta.yaml` configuration values when the app starts.

> **Note:** We recommend that you only use one configuration option to avoid confusion.
