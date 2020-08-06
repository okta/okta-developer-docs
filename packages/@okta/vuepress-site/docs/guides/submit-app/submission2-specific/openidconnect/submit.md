* **Redirect URI** &mdash; Provide one or more login redirect URIs where Okta sends the OAuth responses. The URIs must be absolute URIs. You must add at least one redirect URI.

* **Does your Redirect URI vary by tenant?** &mdash; If **Yes**, enter which part of the Redirect URI is customizable. For example, the `subdomain` in `https://<subdomain>.example.com/oidc/`.

* **Optional: Initiate Login URI** &mdash; Provide a URI if you want the Okta integration to handle redirecting your users to your application to start the sign-in request. When end users click a tile in their Okta dashboard, they are redirected to the `initiate_login_uri` of the client application, which constructs an authorization request and redirects the end user back to Okta.

* **Does your Initiate Login URI vary by tenant?** &mdash; If **Yes**, enter which part of the Initiate Login URI is customizable. For example, the `subdomain` in `https://<subdomain>.example.com/signin/`.

* **Platform** &mdash; Select from the drop-down box whether your application is a web app, a native app, or a single page app.

* **Optional: Post Logout Redirect URI** &mdash; If you have a logout URI that you want to send your end user to after they log out of your application, add it here. It must be an absolute URI.

* **Does your Post Logout URI vary by tenant?** &mdash; If **Yes**, enter which part of the Post Logout URI is customizable. For example, the `subdomain` in `https://<subdomain>.example.com/signout/`.

* **Optional: Link to configuration guide** &mdash; Your configuration guide (in either HTML or PDF format) should have step by step instructions on how to set up SSO between Okta and your systems. See [Prepare a customer-facing configuration guide](/docs/guides/submit-app/create-guide).

* **What type(s) of sign-in flows do you support?** &mdash; Choose from IdP or SP initiated, or both.
