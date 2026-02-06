---
title: Configure Native to Web SSO
excerpt: Learn what Native to Web SSO is and how to use it
layout: Guides
---

<ApiLifecycle access="ea" />

Learn what Native to Web SSO is, why it matters, and how it actually connects your OpenID Connect (OIDC) apps to your web-based services.

---

#### Learning outcomes

* Understand the native to web SSO flow.
* Set up your allowlist for token exchange.
* Manage your allowlist.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* An OIDC app that you want to use as the origin app. Okta supports web, SPA, and native OIDC apps.
* An OIDC or SAML app that you want to use as the target web app

---

## Overview

Native to Web SSO creates a seamless, unified authentication experience when a user transitions from an OIDC origin app (like a native app) to a web app (either OIDC or SAML). It’s a one-way trust from the origin app to the target.

Native to Web SSO achieves this by exchanging a token with the `interclient_access` scope for a one-time token. This token is used to bootstrap an authentication into the target OIDC or SAML app using authentication information such as previous factor verifications from a session created when obtaining the original token. This eliminates repeated sign-in prompts and simplifies development by reducing authentication complexity.

### Handle different assurance levels and remediation

Sometimes the target web app has stricter security needs than the requesting app. For instance, the original app may have only required a username and password, but the target web app requires a second factor, like a one-time passcode (OTP).

Okta handles that during the transition by prompting the user to satisfy the missing requirement. The user sees a single prompt for the complimentary factor (OTP), not a full authentication restart.

### Common use cases

* **Incorporating SaaS**: You have an app, and you want to seamlessly incorporate a third-party SaaS app into it.
* **The application dashboard**: Your app acts as an "application dashboard" with links to multiple web apps.
* **Modernization**: You’re going through a large modernization project. This pattern lets your legacy apps continue to operate unmodified while you update the new parts of the system. This is especially helpful when you want to move towards a modern native app and incorporate the legacy web (hybrid native/web) app.
* **Integration limitations**: It’s critical when you can’t modify the target app integration to accommodate a special connection. The target source code isn’t accessible, but it already supports federation.

In all these cases, the Identity and Access Management (IAM) platform becomes the secure fabric that seamlessly weaves all of your apps together into one low-friction experience.

## Native to Web SSO flow

<div class="three-quarter">

   ![Sequence diagram that displays the interaction between the user, OIDC origin app, authorization server, and target web app for Native to Web SSO](/img/native-to-web-sso.png)

</div>

<!-- Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true
actor "User" as user
participant "Origin OIDC App" as oidcapp
participant "Authorization Server (Okta)" as okta
participant "Target Web App" as webapp

autonumber "<b>#."
user -> oidcapp: Signs in to OIDC app
oidcapp -> okta: Sends direct auth request for tokens with interclient_access scope
okta -> okta: Creates backend-only session
okta -> oidcapp: Returns tokens
user -> oidcapp: Requests to access resource from target app
oidcapp -> okta: Requests access token refresh
okta -> oidcapp: Sends new tokens back
oidcapp -> okta: Sends request to exchange access/ID tokens for interclient token
okta -> oidcapp: Validates trust relationship, user assigned to app, returns interclient token
oidcapp -> webapp: Redirects to web app
webapp -> okta: Receives token, sends authentication request
okta -> okta: Validates, loads the state, bootstraps state token, evaluates target app policy
okta -> webapp: Policy conditions are met, user is signed in
@enduml

-->

The flow steps:

1. The user signs in to an OpenID Connect (OIDC) origin app.
2. The app obtains tokens through a request to the `/token` endpoint. The request includes the `interclient_access` and `offline_access` (optional) scopes.
3. Okta checks that the app is an admin-configured trusted app that’s allowed to use this flow. Then, it creates a special backend-only session. This session tracks the user’s authentication level and security assurances, such as, "This user verified their identity with a strong factor on a trusted device."
4. Okta sends back the access token, the session-bound ID token, and a refresh token if `offline_access` was requested.
5. The user requests access to a resource from the target web app (client app).
6. The OIDC origin app now needs to launch the other app. It makes a request to [refresh the access token](/docs/guides/refresh-tokens/main/#use-a-refresh-token), if necessary.
7. Okta sends back the new tokens, and the refresh token (if requested).
8. The app then makes a request to the `/token` endpoint to exchange the access and ID tokens for a single-use `interclient_token`. This token is requested using the `requested_token_type` (`urn:okta:params:oauth:token-type:interclient_token`) and the Token Exchange grant type (`urn:ietf:params:oauth:grant-type:token-exchange`).
9. Okta validates the trust relationship and user assignment of the target web app, and returns the single-use `interclient_token` that’s bound to the assurance of the `id_token` and target app. This single-use token is the user’s ticket to the target web app.
10. The OIDC app launches the authorization server URI with intent for the target web app, securely passing the `interclient_token` to it.
11. The web app receives the token and sends it to Okta in an authorize request (`/authorize` or `/sso/saml`).
12. Okta validates the `interclient_token`, `audience`, target app ID, issuer, and so on.

    * **Look up context**: Okta looks up the associated backend session.
    * **Loads the state**: Okta then reconstructs the user’s state. This tells Okta who the user is and what security assurances (MFA, Device Trust, and so on) were already satisfied when they signed in to the OIDC origin app.
    * **Bootstraps the state token to the flow**: Rather than making the user start from a blank sign-in page, Okta uses this loaded context to bootstrap a new state token for the web app's policy evaluation.

13. Okta checks if the user has satisfied all of the target web app’s policy requirements. If all checks pass, the user is immediately signed in, otherwise the user is prompted to satisfy all policy requirements.

    > **Note**: The user isn’t allowed to cancel and switch users.

## Configure the app

The OIDC origin app exchanges access and ID tokens for a single-use interclient token from Okta. To do this, use the Token Exchange grant type in the exchange request.

To enable the Token Exchange grant type in your app, follow these steps:

1. Go to **Applications** > **Applications** in the Admin Console.
2. Locate your app and select it.
3. Click **Edit** in the **General Settings** section.
4. In the Grant type section, expand **Advanced**.
5. Select the **Token Exchange** checkbox and click **Save**.

> **Note**: To update the OIDC origin app using the Okta APIs, use the [Replace an app](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/replaceApplication!path=4/settings/oauthClient&t=request) method. In the `oauthClient` object of your PUT request, add the `urn:ietf:params:oauth:grant-type:token-exchange` value to the `grant_types` array.

## Configure the trust map

Define a list of apps that are allowed to request the single-use interclient token on the target web app. This allowlist is a trust map between the origin app and the target web app. It ensures that the SSO flow only happens between apps that you explicitly trust. You can define up to five trusted apps per target web app.

Okta checks this trusted relationship at two critical points in the flow:

* **During authentication**: The OIDC origin app can only request the special `interclient_access` scope if it has a trust relationship set up.

* **During token exchange**: When the OIDC origin app asks for the `interclient_token`, Okta explicitly checks to ensure that the app is on the target app's allowed list. If it's not there, the token exchange is denied.

Use the [Admin Console](https://help.okta.com/okta_help.htm?type=oie&id=apps-native-to-web) steps to configure the trust mapping.

> **Note**: To create an allowlist of apps using the Okta APIs, use the [Create an allowed app mapping for a target app](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationInterclientTrustMappings/#tag/ApplicationInterclientTrustMappings/operation/createInterclientTrustMapping) method (`POST /api/v1/apps/{appId}/interclient-allowed-apps`). The `appID` is the target app’s ID. In the body of the request, include the [app ID](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/listApplications!c=200&path=4/id&t=response) of the app that you want to add to the allowlist.

### Application Interclient Trust Mappings API

See the following new [Application Interclient Trust Mappings API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationInterclientTrustMappings/) endpoints to perform other Native to Web SSO tasks:

* To get a list of allowed apps for a target app, use the [List all allowed apps for a target app](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationInterclientTrustMappings/#tag/ApplicationInterclientTrustMappings/operation/listInterclientAllowedApplications) method (`GET https://{yourOktaDomain}/api/v1/apps/{appId}/interclient-allowed-apps`). The `appId` is the ID of the target web app (the one allowing the SSO).

* To get a list of target apps that allow an app to SSO, use the [List all target apps for an allowed app](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationInterclientTrustMappings/#tag/ApplicationInterclientTrustMappings/operation/listInterclientTargetApplications) method (`GET https://{yourOktaDomain}/api/v1/apps/{appId}/interclient-target-apps`). The `appId` is the ID of the requesting OIDC origin app (the one allowed to request the SSO).

* To delete a trust mapping, use the [Delete an interclient trust mapping](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationInterclientTrustMappings/#tag/ApplicationInterclientTrustMappings/operation/deleteInterclientTrustMapping) method.

### Scopes

There are two new OAuth 2.0 scopes available for the interclient endpoints:

* `okta.apps.interclientTrust.manage`: Use to create a resource, manage a resource, or delete a resource
* `okta.apps.interclientTrust.read`: Use to read information about a resource

## Flow specifics

The following section outlines the requests required to perform Native to Web SSO. These example requests use a native app as the origin app. You can obtain a token with the `interclient_access` scope using your preferred [authentication method](/docs/guides/implement-grant-type/authcode/main/). The example below uses Resource Owner Password as the authentication flow for simplicity.

### Request for initial tokens

Before you can begin this flow, collect the required credentials from the user in a manner of your choosing. Then, make a single API call to the Okta authorization server `/token` endpoint. Your request should look something like the following example:

```BASH
curl --request POST \
    --url https://{yourOktaDomain}/oauth2/v1/token \
    --header 'accept: application/json' \
    --header 'authorization: Basic MG9hYn...' \
    --header 'content-type: application/x-www-form-urlencoded' \
    --data 'grant_type=password
  &client_id={client_id}
  &username=testuser1%40example.com
  &password=%7CmCovrlnU9oZU4qWGrhQSM%3Dyd
  &scope=openid%20offline_access%20interclient_access'
```

Note the parameters that are passed:

* `client_id`: Matches the client ID of the OIDC origin app. You can find it at the top of your app's **General** tab
* `scope`: Must be `openid`, `interclient_access`, and optionally `offline_access`
* `grant_type`: `password`, which indicates that you're using the Resource Owner Password grant type.
* `username`: The username of a user registered with Okta.
* `password`: The password of a user registered with Okta.

> **Note**: For more information on these parameters, see the `/token` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token).

**Response example**

If the credentials are valid, Okta responds with the required tokens. This example response is truncated for brevity.

```JSON
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiItbkk . . . aIRQ",
    "scope": "openid offline_access interclient_access",
    "refresh_token": "DnZ77s5coFFJsj7CBO5NJU_wlZs0SZ0euCeiKXrN8T4",
    "id_token": "eyJraWQi . . . AHlwNmdw"
}
```

### Request to initialize Native to Web SSO

When the user requests access to a resource from the target web app, the native app needs to launch a trusted target web app. It makes a request to refresh the access token, if necessary, and gets back refreshed tokens from Okta. Then, the OIDC origin app needs to exchange the tokens for a single-use interclient token from an Okta authorization server. The Okta org authorization server is used in this example. Your request should look something like this example. The tokens are truncated for brevity.

**Request example**

```BASH
curl --request POST
    --url https://{yourOktaDomain}/oauth2/v1/token \
    --header 'content-type: application/x-www-form-urlencoded' \
    --header 'accept: application/json' \
    --data 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange
  &client_id={client_id}
  &actor_token=eyJra. . . tSXL-HCA
  &actor_token_type=urn:ietf:params:oauth:token-type:access_token
  &subject_token=eyJr. . .cbYGw
  &subject_token_type=urn:ietf:params:oauth:token-type:id_token
  &requested_token_type=urn:okta:params:oauth:token-type:interclient_token
  &audience=urn:okta:apps:0oa8vcy7h1eyj7wLL0g7'
```

Note the parameters that are passed:

* `client_id`: Matches the client ID of the OIDC origin app. You can find it at the top of your app's **General** tab
* `actor_token`: The value of the access token that you obtained in the last request
* `actor_token_type`: `urn:ietf:params:oauth:token-type:access_token`
* `subject_token`: A security token that represents the identity of the party on behalf of whom the request is being made, which is the value of the ID token that you obtained in the last request.
* `subject_token_type`: `urn:ietf:params:oauth:token-type:id_token`
* `requested_token_type`: The type of token that you’re requesting in exchange for the `actor_token` and `subject_token`. (`urn:okta:params:oauth:token-type:interclient_token`)
* `audience`: The target audience for the requested token bound to the target app using the IdP/Okta application/client ID (`urn:okta:apps:{target web app client_id}`)
* `grant_type`: `urn:ietf:params:oauth:grant-type:token-exchange`

**Response example**

This example response is truncated for brevity.

```JSON
{
    "token_type": "N_A",
    "expires_in": 300,
    "access_token": "eyJraWQiOiJNTG. . .GubhhEsg",
    "issued_token_type": "urn:okta:params:oauth:token-type:interclient_token"
}
```

### Authorize request by target app

The OIDC app launches the authorization server URI with intent for the target web app, securely passing the `interclient_token` to it. The web app receives the token and sends it to Okta in an authorize request (`/authorize` or `/sso/saml`). The OIDC request looks something like the following example. The example is truncated for brevity.

```BASH
curl --request POST
    --url http://{yourOktaDomain}/oauth2/v1/authorize \
    --header 'content-type: application/x-www-form-urlencoded' \
    --header 'accept: application/json' \
    --data 'client_id={client_id}
  &response_type=code
  &scope=openid
  &redirect_uri=http://localhost:8080/authorization-code/callback
  &state=1234
  &interclient_token=eyJraWQiOiJNTG. . .GubhhEsg
```

Note the parameters that are being passed:

* `client_id`: The client ID of the app integration that you created earlier. Find it in the Admin Console on your app integration's **General** tab.
* `response_type`: The value is `code`, which indicates that the target app is configured for the Authorization Code grant type. Okta returns the authorization code, which is then used by the app in the request to the `/token` endpoint. See [Implement authorization by grant type](https://developer.okta.com/docs/guides/implement-grant-type/authcode/main/#exchange-the-code-for-tokens) for specifics on the authorization code flow.
* `scope`: The value is `openid`, which means that the `/token` endpoint returns an ID token. **Note**: The `interclient_access` scope isn't allowed in the request when the `interclient_token` parameter is used.
* `redirect_uri`: The callback location where the user agent is directed to along with the `code`. This URI must match one of the **Sign-in redirect URIs** in the target app.
* `state`: An arbitrary alphanumeric string that the authorization server reproduces when redirecting the user agent back to the client. This is used to help prevent cross-site request forgery.
* `interclient_token`: The token that bootstraps an authentication into the target app using authentication information such as previous factor verifications from a session created when obtaining the original token.

> **Note**: A SAML request would look similar to the following request:<br>
<br>
`http://{yourOktaDomain}/app/{instanceName}/{externalKey}/sso/saml?interclient_token=eyJraWQi. . .w2H0OYlw`<br>

### Final checks by Okta

Okta validates the `interclient_token`, `audience`, target app ID, issuer, and so on. Okta then checks if the user has satisfied all of the target web app’s policy requirements. If all checks pass, the user is immediately signed in, otherwise the user is prompted to satisfy all policy requirements.

## Related topics

* [Implement authorization by grant type](/docs/guides/implement-grant-type/authcode/main/)
* [Application Interclient Trust Mappings API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationInterclientTrustMappings/)
