If you use the Okta CLI to create your okta app integration, it creates an `.okta.env` file in your current directory. This file includes your Okta domain, client ID, and client secret, and should have the following structure:

```properties
export OKTA_OAUTH2_ISSUER=https://${yourOktaDomain}/oauth2/${authorizationServerId}
export OKTA_OAUTH2_CLIENT_ID=${clientId}
export OKTA_OAUTH2_CLIENT_SECRET=${clientSecret}
```

Run `source .okta.env` in a terminal window to set the values above as environment variables. If you're on Windows, you can change `export` to `set` and rename the file to `okta.bat`, then execute it.

> **Note**: If you use `okta start go-gin` to create an app, it has an `.okta.env` file in it that looks a bit different. That's because it's configured to use [godotenv](https://github.com/joho/godotenv) to load its configuration.
