<div class="three-quarter">

![Flow diagram that displays three event examples of a m???????](/img/slo-idp.png)

</div>

**Event 1**

* The user signs out of App 1 using the Browser.
* App 1 initiates the logout (SP-initiated) by sending a front-channel inbound logout request to Okta using the Browser. For example:

    `GET https://{yourOktaDomain}/oauth2/v1/logout?id_token_hint=<idToken>&post_logout_redirect_uri=<configuredPostLogoutRedirectUri>&state=<someState>`

* Okta ends the Okta session. The user can still access Apps 2 and 3 within the scope of each app session.

**Event 2**

* Okta initiates the logout (SP-initiated) to end the session with the IdP.

**Event 3**

* Okta determines that Apps 2 and 3 were also using the same IdP session.
* Okta initiates the outbound logout request (IdP-initiated) to the downstream apps (Apps 2 and 3) in an embedded IFrame that’s invisible to the user. For example:

    `POST https://myapp.exampleco.com/slo/logout`

    > **Note:** This URL is whatever the logout endpoint URL is that you [configure in the identity provider](#configure-slo).

* Okta makes a GET or POST redirection request to App 1.
* If a downstream app is a SAML app, the SAML app makes a POST or REDIRECT request to the Okta `/app/{app}/{key}/slo/saml/callback` endpoint in response to the Okta outbound logout request. The SAML logout response is included in the request body.
