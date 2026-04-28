For example, if you have a tenant setting variable named `subdomain`, then you can set your **Authorize endpoint** string to ` 'https://' + app.subdomain + '.example.org/oauth/v1/authorize'`. When your customer admin sets their `subdomain` setting value to `berryfarm`, then `https://berryfarm.example.org/oauth/v1/authorize` is their base URL.

> **Note**: A variable can include a complete URL (for example, `https://example.com/strawberry/`). This enables you to use global variables, such as `app.baseURL`.

The following are Expression Language specifics for API Integrations Actions properties:

* Any [tenant settings](#tenant-settings) that you define in the OIN Wizard are considered [application properties](/docs/reference/okta-expression-language/#application-properties). They have an `app.` prefix when you reference them in Expression Language. For example, if your integration variable name is `subdomain`, then you can reference that variable using `app.subdomain`.

* Tenant setting variables that you define in the OIN Wizard appears in the Integration Buider's **Authentication mapping** section. You can map the API Integration Actions authentication parameters to the OIN Wizard tenant variables.
