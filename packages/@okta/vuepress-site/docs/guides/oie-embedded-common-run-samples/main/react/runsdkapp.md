
Set up and run the [React Embedded SDK sample app](https://github.com/okta/okta-auth-js/tree/master/samples/generated/react-embedded-auth-with-sdk) with the following steps:

1. [Set up your Okta org for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/react/main/#set-up-your-okta-org-for-a-password-factor-only-use-case), if you haven't already done so.

2. Clone the Okta Auth JavaScript (JS) SDK repository.

```shell
git clone https://github.com/okta/okta-auth-js.git
```

3. Inside the `okta-auth-js` directory install all the dependencies of the project.

```shell
yarn install
```

4. Navigate to the sample app's root directory (`/samples/generated/react-embedded-auth-with-sdk`) and create a file named `testenv` with no extension. Add the `ISSUER` and `CLIENT_ID` values from your Okta org's application integration.

```yaml
ISSUER=https://${yourOktaDomain}/oauth2/default
CLIENT_ID=0oa1kelclsb...
```

5. From the sample app's root directory start the app.

```shell
yarn start
```

6. Open a browser window and navigate to the app's home page: `http://localhost:8080`. Sign in to the sample app with an existing user from your org.

### Troubleshoot

If the app doesn't load in the browser, open the app in private or incognite mode. This allows the app to run with an empty browser cache and may resolve issues related to stale caches.
