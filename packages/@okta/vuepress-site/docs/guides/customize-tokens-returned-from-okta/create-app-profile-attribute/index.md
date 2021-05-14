---
title: Include app-specific information in a custom claim
---

If you want to include certain app-specific information in a token claim, you can do so by first adding the metadata into the profile section of the app. You can access any values that are put inside the app profile using `app.profile` written in [Okta Expression Language](/docs/reference/okta-expression-language/).

To include, for example, the app `label` parameter in a token claim:

* Create an app with the Profile object.
* Add a custom claim to your Custom Authorization Server.

> **Note:** You can directly use both `app.id` and `app.clientId` as claims.

## Create an app with the Profile object

Create an app with the Profile object using the [Apps API](/docs/reference/api/apps/).

```json
{
      "name": "oidc_client",
      "label": "Example App",
      "signOnMode": "OPENID_CONNECT",
      "credentials": {
        "oauthClient": {
          "token_endpoint_auth_method": "client_secret_post"
        }
      },
      "profile": {
        "label": "Example App"
        },
      "settings": {
        "oauthClient": {
          "client_uri": null,
          "logo_uri": null,
          "response_types": [
            "token"
          ],
          "grant_types": [
            "client_credentials"
          ],
          "application_type": "service",
          "consent_method": "REQUIRED",
          "issuer_mode": "ORG_URL"
        }
      }
    }
```

## Add a custom claim

> **Note:** You can only add custom claims to a Custom Authorization Server, not the Org Authorization Server. See [Authorization Servers](/docs/guides/customize-authz-server/overview/) for more information on the types of authorization servers available to you and what you can use them for.

To add a custom claim:

1. In the Admin Console, go to **Security** > **API**.

2. On the **Authorization Servers** tab, select the name of the Custom Authorization Server that you want to add the claim to (or select **default** when you use the default Custom Authorization Server), and then click **Claims**.

3. Click **Add Claim**, and then configure the claim settings:

    > **Note:** For more information on these fields, see <GuideLink link="../add-custom-claim">Add a custom claim to a token</GuideLink>.

    * **Name** &mdash; Enter a name for the claim, such as **applabel**.

    * **Include in token type** &mdash; Leave the default of **Access Token**.

    * **Value type** &mdash; Leave the default of **Expression** to define the claim by an Expression written in Okta Expression Language.

    * **Value** &mdash; This option appears if you chose **Expression**. For this example, enter `app.profile.label`, which is referencing the app Profile attribute that you want to include in the claim.

    > **Note:** You can validate that your expression returns the results expected using the **Token Preview** tab.

    * **Disable claim** &mdash; Leave this clear for this example.

    * **Include in** &mdash; Leave **Any scope** selected for this example.

4. Click **Create**.

5. (Optional) Confirm that your custom claim was successfully added by retrieving a list of all claims from your Custom Authorization Server, including the custom claims, using the `/claims` endpoint. See <GuideLink link="../add-custom-claim/#verify-the-custom-claim">Verify the custom claim</GuideLink>.

## Request a token that contains the custom claim

In this example, the service application's `token_endpoint_auth_method` was set to `client_secret_post` when we created the app above. Include both the `client_id` and the `client_secret` values as additional parameters in the POST request body to your Custom Authorization Server's `/token` endpoint. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see <GuideLink link="../request-token-claim">Request a token that contains a custom claim</GuideLink>.

```bash
curl -v -X POST \
-H "Content-type:application/x-www-form-urlencoded" \
"https://${yourOktaDomain}/oauth2/default/v1/token" \
-d "client_id={client_id}&client_secret={client_secret}&grant_type=client_credentials&scope=aCustomScope"
```

If the credentials are valid, the access token is sent in the response:

```json
{
    "access_token": "eyJhbG[...]1LQ",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "aCustomScope"
}
```

<NextSectionLink>Next Steps</NextSectionLink>
