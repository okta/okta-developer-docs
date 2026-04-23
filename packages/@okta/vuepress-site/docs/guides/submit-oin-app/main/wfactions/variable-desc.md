For example, if you have a tenant variable called `subdomain`, then you can set your **Authorize endpoint** string to ` 'https://' + app.subdomain + '.example.org/oauth/v1/authorize'`. When your customer sets their `subdomain` variable value to `berryfarm`, then `https://berryfarm.example.org/oauth/v1/authorize` is their base URL.

> **Note**: A variable can include a complete URL (for example, `https://example.com/scim2/`). This enables you to use global variables, such as `app.baseURL`.

The following are Expression Language specifics for API Integrations Actions properties:

* Any [tenant variables](#tenant-settings) that you define in the OIN Wizard are considered [application properties](/docs/reference/okta-expression-language/#application-properties). They have an `app.` prefix when you reference them in Expression Language. For example, if your integration variable name is `subdomain`, then you can reference that variable using `app.subdomain`.

* API Integration Action properties support [Expression Language conditional expressions](/docs/reference/okta-expression-language/#conditional-expressions). For example:

    ```js
    'https://' + app.subdomain + '.example.org/oauth/v1/token'
    ```

    ```js
    'https://' + (app.region == 'us' ? 'myfruit' : 'myveggie') + '.example.com/oauth/v1/token'
    ```

* API Integration Action properties properties support Expression Language [String functions](https://developer.okta.com/docs/reference/okta-expression-language/#string-functions). For example:

    ```js
    (String.len(app.baseUrl) == 0 ? 'https://fruit.example.com/' : app.baseUrl) + 'v1/oauth_token'
    ```

    ```js
    (String.stringContains(app.environment,"PROD") ? 'https://fruit.example.com' : 'https://fruit-sandbox.example.com') + '/v1/oauth2/token'
    ```