* **Redirect URI** &mdash; Provide one or more login redirect URIs where Okta sends the OAuth responses. The URIs must be absolute URIs. You must add at least one redirect URI.

* **Optional: Initiate Login URI** &mdash; Provide a URI if you want the Okta integration to handle redirecting your users to your app to start the sign-in request. When end users click a tile in their Okta dashboard, they are redirected to the `initiate_login_uri` of the client application, which constructs an authorization request and redirects the end user back to Okta.

* **Platform** &mdash; Select from the drop-down box whether your app is deployed as a web app, a native app, or as a single page app.

* **Optional: Post Logout Redirect URI** &mdash; If you have a logout URI that you want to send your end user to after they log out of your app, add it here. It must be an absolute URI.
