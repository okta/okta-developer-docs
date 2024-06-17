You can run the [sample embedded Sign-In Widget Vue.js app](https://github.com/okta/samples-js-vue/tree/master/custom-login) to quickly view a simple working Vue.js app with the Sign-In Widget.

1. Ensure that you [set up your Okta org for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/##set-up-your-okta-org-for-a-password-factor-only-use-case) and [create an app integration in Okta](#create-an-okta-app-integration) for your sample app.
2. Download the sample app: `git clone https://github.com/okta/samples-js-vue.git`
3. Go to the `custom-login` directory: `cd samples-js-vue/custom-login`
4. Install the app and its dependencies: `npm install`
5. Set the environment variables with your [Okta org app integration configuration settings](#okta-org-app-integration-configuration-settings):

  ```bash
  export ISSUER=https://{yourOktaDomain}/oauth2/default
  export CLIENT_ID={yourAppClientId}
  export USE_INTERACTION_CODE=true
  ```

6. Run the app: `npm start`

7. Open a browser window and navigate to the app's home page: [http://localhost:8080](http://localhost:8080). Try to sign in to the sample app with an existing user from your Okta org.
