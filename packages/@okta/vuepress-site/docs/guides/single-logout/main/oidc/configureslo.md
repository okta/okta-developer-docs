4. Scroll down to the **LOGOUT** section and do the following to configure SLO:
    * **Logout redirect URIs**: Enter the URI where you want to redirect the browser after SLO is complete.
    * **Single Logout (SLO)**: Select the checkbox to enable IdP-initiated SLO for the app.
    * **Logout request URL**: Enter the URL where Okta sends the IdP-initiated logout request. For example: `http:/myapp.exampleco.com/slo/logout`
    * **User session details**: Select to include the session ID (`sid`) and issuer (`iss`) as part of the IdP-initiated logout request. This ends a specific user’s session rather than all active user sessions within that browser.
5. Click **Save**.
