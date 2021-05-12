1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-blazor.git`
2. In Visual Studio, open the `okta-blazor-server-side-example` solution file in the `okta-hosted-login` directory.
3. Open the <StackSelector snippet="configfile" noSelector inline /> file and, in the `Okta` section, add the information that you copied in previous steps:

    ```json
    "Okta": {
        "OktaDomain": "https://oietiger147.oktapreview.com",
        "ClientId": "0oaywibbsnwZpjBNf0h7",
        "ClientSecret": "_FG3_au--d_SPoxggTUo8LcgFUXt6d2sx4XjfwIR",
        "AuthorizationServerId": "default"
    }
    ```

You have now created your app in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> sample app.
