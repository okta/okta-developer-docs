### Run the sample Vue.js app

You can run the [sample embedded SIW Vue.js app](https://github.com/okta/samples-js-vue/tree/master/custom-login) to quickly view a simple working Vue.js app with the Sign-In Widget.

1. Download the sample app: `git clone https://github.com/okta/samples-js-vue.git`
2. Go to the `custom-login` directory: `cd samples-js-vue/custom-login`
3. Install the app and its dependencies: `npm install`
3. Set the environment variables with your [Okta org app integration configuration settings](#okta-org-app-integration-configuration-settings):

  ```bash
  export ISSUER=https://${yourOktaDomain}/oauth2/default
  export CLIENT_ID=${yourAppClientId}
  export USE_INTERACTION_CODE=true
  ```

4. Run the app: `npm start`

5. Open a browser window and navigate to the app's home page: http://localhost:8080.
