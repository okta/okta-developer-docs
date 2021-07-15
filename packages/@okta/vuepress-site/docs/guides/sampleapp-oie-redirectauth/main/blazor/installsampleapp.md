1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-blazor.git`
2. In Visual Studio, open the `okta-blazor-server-side-example` solution file in the `server-side` > `okta-hosted-login` directory.
3. Open the `appsettings.json` file and, in the `Okta` section, add the information that you copied in previous steps:

    ```json
    "Okta": {
        "OktaDomain": "https://oietiger147.oktapreview.com",
        "ClientId": "0oaywibbsnwZpjBNf0h7",
        "ClientSecret": "_FG3_au--d_SPoxggTUo8LcgFUXt6d2sx4XjfwIR",
        "AuthorizationServerId": "default"
    }
    ```

You have now created your App in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> sample app.
