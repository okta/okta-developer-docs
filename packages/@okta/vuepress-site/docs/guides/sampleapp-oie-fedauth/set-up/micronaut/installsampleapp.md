1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-java-micronaut.git`
2. From the command line, enter the `okta-hosted-login` directory and set the following dependencies with the information that you copied in a previous step:

```
    `export OIDC_ISSUER_DOMAIN=https://{yourOktaDomain}`
    `export OAUTH_CLIENT_ID={clientID}`
    `export OAUTH_CLIENT_SECRET={clientSecret}`
    `export OIDC_ISSUER_AUTHSERVERID=default`
```

You have now created your App in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> sample app.