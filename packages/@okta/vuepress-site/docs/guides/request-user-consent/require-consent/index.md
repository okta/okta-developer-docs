---
title: How to require user consent
---

Use the following procedure to display the user consent dialog box as part of an OpenID Connect or OAuth 2.0 request:

> **Note:** Currently OAuth Consent only works with custom authorization servers. See [Authorization Servers](/docs/concepts/auth-servers/) for more information on the types of authorization servers available to you and what you can use them for.

1. In the Developer Console, select **Applications** and then select the OpenID Connect app that you want to require user consent for.

2. Select the **General** tab and click **Edit**.

3. Scroll down to the **User Consent** section and select **Require consent**.

> **Note:** You can optionally enter the path for your Terms of Service and Privacy Policy pages in this section.

??If it doesn't you don't have the API Access Management feature and User Consent enabled. WHAT DO THEY DO to enable it??

4. Click **Save**.

5. Select **API** and then **Authorization Servers** to enable consent for the [scopes](/docs/reference/api/authorization-servers/#create-a-scope) that you want to require consent for. In this example, we are enabling consent for the default custom authorization server.





3. Enable consent for the [scopes](/docs/reference/api/authorization-servers/#create-a-scope) that you want to require consent. To do this, set the `consent` property to `REQUIRED`.

Optionally, you can create an OpenID Connect app via the [Apps API](/docs/reference/api/apps/#add-oauth-2-0-client-application). The value you specify for `consent_method` depends on the values for `prompt` and `consent`. Check the [Apps API](/docs/reference/api/apps/#add-oauth-2-0-client-application) tables for these three properties. In most cases, `REQUIRED` is the correct value.

Optionally, you can set the appropriate values for your Terms of Service (`tos_uri`) and Privacy Policy (`policy_uri`) notices using the same API request.

4. Prepare an authentication or authorization request with the correct values for `prompt` and `consent_method`. For details, see the [API documentation for `prompt`](/docs/reference/api/oidc/#parameter-details) and the [table of values relating to consent dialog](/docs/reference/api/apps/#settings-7).

5. Test your configuration by initiating an authentication or authorization request. For instance, if you set `consent` to `REQUIRED` for the `email` scope, you can open this URL in a browser:

    ```bash
    https://${yourOktaDomain}/oauth2/${authenticationServerId}/v1/authorize?client_id=${clientId}&response_type=token&response_mode=fragment&scope=email&redirect_uri=http://localhost:54321&state=${state}&nonce=${nonce}
    ```

    Opening this URL will show the user consent dialog. Click **Allow** to create the grant.