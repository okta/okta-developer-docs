| <div style="width:150px">Property</div> | Description  |
| ----------------- | ------------ |
| **Redirect URIs** `*` | Specify one or more redirect URIs for your app. If your URI varies per tenant, include the variable names that you created in your URI. For example: `https://{app.subdomain}.example.org/strawberry/login`<br>The maximum field length is 1024 characters.<br>Click **+ Add another** to add more URIs.|
|**Initiate login URI** | Specify the URI to redirect users when they select your app from their Okta End-User Dashboard. This URI is optional and is used if your integration handles constructing an authorization request and redirecting the end user back to Okta. You can use integration variables if your initiate-login URI varies per tenant. For example: `https://{app.subdomain}.example.org/strawberry/start-login` |
| **Post-logout URI** | Specify the sign-out redirect URIs for your app. Include a sign-out URI if you have a location where you want to send your end user after they sign out of your app.<br> You can use integration variables if your sign-out URI varies per tenant. For example: `https://{app.subdomain}.example.org/strawberry/logout`<br>Click **+ Add another** to add more URIs.|
|**Link to configuration guide** `*` | Specify the URL link to your customer-facing instructions on how to configure SSO between Okta and your app with OIDC. See [Customer configuration document guidelines](/docs/guides/submit-app-prereq/main/#customer-configuration-document-guidelines).|

`*` Required properties
