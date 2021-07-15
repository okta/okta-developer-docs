1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-nodejs-express-4.git`
2. From the command line, enter the `samples-nodejs-express-4` directory and run `npm install` to install the dependencies.
3. Create a `testenv` file in the  `samples-nodejs-express-4` directory with the information that you copied in previous steps:

    ```ini
    ISSUER=https://${yourOktaDomain}/oauth2/default
    CLIENT_ID={yourAppClientID}
    CLIENT_SECRET={yourAppClientSecret}
    ```

You have now created your App in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> sample app.
