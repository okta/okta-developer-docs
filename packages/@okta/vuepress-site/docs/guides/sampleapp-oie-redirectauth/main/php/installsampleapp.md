1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-php.git`
2. From the command line, enter the `okta-hosted-login` directory and run `composer install` to install the dependencies.
3. Create an `.env` file in the `okta-hosted-login` directory and add the  information that you copied in previous steps:

    ```ini
    CLIENT_ID={yourAppClientID}
    CLIENT_SECRET={yourAppClientSecret}
    ISSUER=https://{yourOktaDomain}/oauth2/default
    ```

You have now created your App in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> sample app.
