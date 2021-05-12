1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-golang.git`

2. From the command line, enter the  `okta-hosted-login` directory and run `go get` to install the dependencies.

3. Create an <StackSelector snippet="configfile" noSelector inline /> file in the `okta-hosted-login` directory and add the information that you copied in previous steps:

    ```ini
    CLIENT_ID={ClientID}
    CLIENT_SECRET={ClientSecret}
    ISSUER=https://{yourOktaDomain}/oauth2/default
    ```

You have now created your App in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> sample app.
