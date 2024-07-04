For example, if you have a SAML configuration variable called `subdomain`, then you can set your **ACS URL** string to `https://${org.subdomain}.example.org/strawberry/login`. When your customer admin sets their `subdomain` variable value to `berryfarm`, then `https://berryfarm.example.org/strawberry/login` is their ACS URL.

> **Note**: A variable can include a complete URL (for example, `https://example.com`). This enables you to use global variables, such as `org.baseURL`.

SAML [integration variables](#integration-variables) you define in the OIN Wizard are considered [Organization properties](/docs/reference/okta-expression-language/#organization-properties) and have the `org.` prefix when you reference them in an OEL expression. For example, if your integration variable name is `subdomain`, then you can reference that variable with `org.subdomain`.

SAML properties support [OEL conditional expressions](/docs/reference/okta-expression-language/#conditional-expressions) and evaluates everything between `${` and `}`. For example, the following is an expression for the **ACS URL** property:

```js
${empty org.baseUrl ? 'https://app.clicdata.com' : org.baseUrl}
```