For example, if you have a SAML configuration variable called `subdomain`, then you can set your **ACS URL** string to `https://${org.subdomain}.example.org/strawberry/login`. When your customer admin sets their `subdomain` variable value to `berryfarm`, then `https://berryfarm.example.org/strawberry/login` is their ACS URL.

> **Note**: A variable can include a complete URL (for example, `https://example.com`). This enables you to use global variables, such as `org.baseURL`.

The following are OEL specifics for SAML properties:

* SAML [integration variables](#integration-variables) you define in the OIN Wizard are considered [Organization properties](/docs/reference/okta-expression-language/#organization-properties) and have the `org.` prefix when you reference them in an OEL expression. For example, if your integration variable name is `subdomain`, then you can reference that variable with `org.subdomain`.

* SAML properties support [OEL conditional expressions](/docs/reference/okta-expression-language/#conditional-expressions) and evaluates everything between `${` and `}`. For example, the following is an expression for the **ACS URL** property:

    ```js
    ${empty org.baseUrl ? 'https://app.mySubdomain.com' : org.baseUrl}
    ```

* SAML properties don't support OEL [String functions](https://developer.okta.com/docs/reference/okta-expression-language/#string-functions). Use [JSTL functions](https://docs.oracle.com/javaee/5/jstl/1.1/docs/tlddocs/fn/tld-summary.html) instead. For example:

    ```js
    ${fn:substringAfter(org.base_url, '//')}
    ```

    ```js
    ${fn:substringBefore(user.userName, '@')}@example.com
    ```

    ```js
    https://${fn:endsWith(org.site_url, 'host1.com') ? 'host1.com' : fn:endsWith(org.site_url, 'host2.com') ? 'host2.com' : '.host.com'}/sso/saml
    ```

    ```js
    https://host.com/${fn:contains(org.environment, 'production') ? 'prod/sso/saml' : 'preview/sso/saml'}
    ```
