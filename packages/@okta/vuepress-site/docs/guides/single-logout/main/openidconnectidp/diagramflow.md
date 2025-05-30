<div class="three-quarter">

![A flow diagram that displays the single logout steps for identity providers](/img/slo-idp.png)

</div>

#### Event 1

* The user signs out of App 1 using the browser.

#### Event 2

* App 1 initiates the logout (SP-initiated) by sending a front-channel inbound logout request to Okta using the browser. For example:

    `GET https://{yourOktaDomain}/oauth2/v1/logout?id_token_hint=<idToken>&post_logout_redirect_uri=<configuredPostLogoutRedirectUri>&state=<someState>`

* Okta ends the Okta session. The user can still access Apps 2 and 3 within the scope of each app session.

#### Event 3

* Okta initiates the logout (SP-initiated) to end the session with the IdP.
* Okta also initiates the outbound logout request (IdP-initiated) to the downstream apps (Apps 2 and 3). For example:

    `POST https://idp.example.com/slo/logout`

    > **Note:** This URL is whatever the `slo.url` is that you specify when you [configure your IdP for SLO for IdPs](/docs/guides/single-logout/openidconnectidp/main/#configure).

* If a downstream app is a SAML app, the SAML app makes a POST or REDIRECT request to the Okta `/app/{app}/{key}/slo/saml/callback` endpoint in response to the Okta outbound logout request. The SAML logout response is included in the request body.
