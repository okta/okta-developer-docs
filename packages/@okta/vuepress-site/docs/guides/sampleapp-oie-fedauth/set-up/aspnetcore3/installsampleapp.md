1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-aspnetcore.git`
2. In Visual Studio, open the `okta-aspnetcore-mvc-example` solution file in the `okta-hosted-login` directory.
3. Open the <StackSelector snippet="configfile" noSelector inline /> file in the `okta-aspnetcore-mvc-example` folder, and in the `Okta` section, add the information that you copied in previous steps:

    ```json
    "Okta": {
    	"OktaDomain": "https://{yourOktaDomain}",
    	"ClientId": "{ClientId}",
    	"ClientSecret": "{ClientSecret}",
    	"AuthorizationServerId": "default"
         }
    ```

You have now created your App in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> sample app.
