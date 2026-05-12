For example, if you have an OIDC setting variable called `subdomain`, then you can set your **Redirect URI** string to `https://{app.subdomain}.example.org/strawberry/login`. When your customer admin sets their `subdomain` setting value to `berryfarm`, then `https://berryfarm.example.org/strawberry/login` is their redirect URL.

> **Note**: A variable can include a complete URL (for example, `https://example.com`). This enables you to use global variables, such as `app.baseURL`.

The following are Expression Language specifics for OIDC properties:

* OIDC [tenant settings](#tenant-settings) that you define in the OIN Wizard are considered [application properties](/docs/reference/okta-expression-language/#application-properties) and have the `app.` prefix when you reference them in Expression Language. For example, if your tenant variable name is `subdomain`, then you can reference that variable with `app.subdomain`.

* OIDC properties support [Expression Language conditional expressions](/docs/reference/okta-expression-language/#conditional-expressions) and evaluates everything between curly brackets. For example, the following is an expression for the **Redirect URI** property:

    ```js
    {String.stringContains(app.environment, 'PROD') ? 'https://app.data.one/' : 'https://app-sandbox.data.one/'}
    ```