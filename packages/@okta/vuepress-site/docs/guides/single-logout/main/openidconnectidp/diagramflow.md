<div class="three-quarter">

![Flow diagram that displays three event examples of a single logout flow that includes and IdP](/img/slo-idp.png)

</div>

**Event 1**

* The user signs out of App 1 using the Browser.

**Event 2**

* App 1 initiates the logout (SP-initiated) by sending a front-channel inbound logout request to Okta using the Browser. For example:

    `GET https://{yourOktaDomain}/oauth2/v1/logout?id_token_hint=<idToken>&post_logout_redirect_uri=<configuredPostLogoutRedirectUri>&state=<someState>`

* Okta ends the Okta session. The user can still access Apps 2 and 3 within the scope of each app session.

**Event 3**

* Okta initiates the logout (SP-initiated) to end the session with the IdP.
* Okta also initiates the outbound logout request (IdP-initiated) to the downstream apps (Apps 2 and 3) in an embedded IFrame that's invisible to the user. For example:

    `POST https://myapp.exampleco.com/slo/logout`

    > **Note:** This URL is whatever the `slo.url` is that you specify when you [configure your IdP for SLO for IdPs](/docs/guides/single-logout/openidconnectidp/main/#configure).

* If a downstream app is a SAML app, the SAML app makes a POST or REDIRECT request to the Okta `/app/{app}/{key}/slo/saml/callback` endpoint in response to the Okta outbound logout request. The SAML logout response is included in the request body.
