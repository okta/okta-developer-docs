1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-js-vue.git`
2. From the command line, enter the `okta-hosted-login` directory and run `npm install` to install the dependencies.
3. Create a `testenv` file in the  `samples-js-vue` directory with the  information that you copied in previous steps:

    ```ini
    ISSUER=https://${yourOktaDomain}/oauth2/default
    CLIENT_ID={yourAppClientID}
    ```

You have now created your App in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> sample app.