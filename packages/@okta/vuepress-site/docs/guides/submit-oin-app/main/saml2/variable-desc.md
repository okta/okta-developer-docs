For example, if you have a SAML configuration variable called `subdomain`, then you can set your **ACS URL** string to `https://${org.subdomain}.example.org/strawberry/login`. When your customer sets their `subdomain` variable value to `berryfarm`, then `https://berryfarm.example.org/strawberry/login` is their ACS URL.

> **Note**: A variable can include a complete URL (for example, `https://example.com`). This enables you to use global variables, such as `org.baseURL`.

The following are Expression Language specifics for SAML properties:

* SAML [integration variables](#integration-variables) you define in the OIN Wizard are considered [Organization properties](/docs/reference/okta-expression-language/#organization-properties) and have the `org.` prefix when you reference them in Expression Language. For example, if your integration variable name is `subdomain`, then you can reference that variable with `org.subdomain`.

* SAML properties support [Expression Language conditional expressions](/docs/reference/okta-expression-language/#conditional-expressions) and evaluate everything between `${` and `}`. For example, the following expressions are for the **ACS URL** property:

    ```js
    ${empty org.baseUrl ? 'https://app.mydomain.com' : org.baseUrl}
    ```

    ```js
    ${empty org.base_url ? 'https://' += org.subdomain += '.acme.com' : org.base_url}/sso/saml
    ```

    ```js
    ${org.integration_type == 'COMMUNITY' ? org.login_url : org.integration_type == 'PORTAL' && org.instance_type == 'SANDBOX' ? 'https://test.acme.com/secur/login_portal.jsp?orgId=' += org.org_id += '&portal_id=' += org.portal_id : org.integration_type == 'PORTAL' && org.instance_type == 'PRODUCTION' ? 'https://login.acme.com/secur/login_portal.jsp?orgId=' += org.org_id += '&portal_id=' += org.portal_id : org.integration_type == 'STANDARD' && org.instance_type == 'SANDBOX' ? 'https://test.acme.com/' : 'https://login.acme.com/'}
    ```


* SAML properties don't support Expression Language [String functions](https://developer.okta.com/docs/reference/okta-expression-language/#string-functions). Use [JSTL functions](https://docs.oracle.com/javaee/5/jstl/1.1/docs/tlddocs/fn/tld-summary.html) instead. For example:

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
    https://${fn:contains(org.environment, 'production') ? 'productiondomain.com' : 'previewdomain.com'}/sso/saml
    ```
