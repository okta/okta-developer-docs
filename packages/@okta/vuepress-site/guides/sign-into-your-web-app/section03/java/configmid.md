Plugging this in in case it is still relevant - from old quick start guide.

{% include domain-admin-warning.html %}

```properties
okta.oauth2.issuer=https://{yourOktaDomain}/oauth2/default
okta.oauth2.clientId={clientId}
okta.oauth2.clientSecret={clientSecret}
# Configure the callback URL to match the previous section
security.oauth2.sso.loginPath=/authorization-code/callback
```
