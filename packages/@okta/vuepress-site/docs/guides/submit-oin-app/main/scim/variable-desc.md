For example, if you have a SCIM configuration variable called `subdomain`, then you can set your **Base URL** string to ` 'https://' + app.subdomain + '.example.org/strawberry/scim2/'`. When your customer sets their `subdomain` variable value to `berryfarm`, then `https://berryfarm.example.org/strawberry/scim2/` is their base URL.

> **Note**: A variable can include a complete URL (for example, `https://example.com/scim2/`). This enables you to use global variables, such as `app.baseURL`.

The following are Expression Language specifics for SCIM properties:

* SCIM [integration variables](#integration-variables) you define in the OIN Wizard are considered [Application properties](/docs/reference/okta-expression-language/#application-properties) and have the `app.` prefix when you reference them in Expression Language. For example, if your integration variable name is `subdomain`, then you can reference that variable with `app.subdomain`.

* SCIM properties support [Expression Language conditional expressions](/docs/reference/okta-expression-language/#conditional-expressions). For example:

    ```js
    'https://' + app.subdomain + '.example.org/strawberry/scim2/'`
    ```

    ```js
    'https://' + (app.region == 'us' ? 'myfruit' : 'myveggie') + '.example.com/strawberry/oauth/token'
    ```

* SCIM properties support Expression Language [String functions](https://developer.okta.com/docs/reference/okta-expression-language/#string-functions). For example:

    ```js
    (String.len(app.baseUrl) == 0 ? 'https://fruit.example.com/scim2/' : app.baseUrl) + 'v1/oauth_token'
    ```

    ```js
    (String.stringContains(app.environment,"PROD") ? 'https://fruit.example.com' : 'https://fruit-sandbox.example.com') + '/v1/oauth2/token'
    ```
