1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-js-angular.git`
2. From the command line, enter the `okta-hosted-login` directory and run `npm install`.
3. Create a `testenv` file in the `samples-js-angular` directory with the information that you copied in previous steps:

    ```ini
        ISSUER=https://${yourOktaDomain}/oauth2/default
        CLIENT_ID={yourAppClientId}
    ```

You have now created your SPA in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> sample app.
