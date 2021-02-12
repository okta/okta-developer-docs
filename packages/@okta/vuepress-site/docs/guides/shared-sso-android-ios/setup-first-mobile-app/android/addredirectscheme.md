To add a redirect scheme for Android, you must define a gradle manifest placeholder in your app's `build.gradle`.

In your app's `build.gradle`, add the redirect scheme inside the `defaultConfig` property. The redirect scheme should match what you used when you modified the config.json file.

For example, if your redirect URI is `com.first.sample:/callback`, then the appAuth redirect scheme is `com.first.sample`.

Example
```groovy
    manifestPlaceholders = [
        "appAuthRedirectScheme": "com.first.sample"
    ]
```
### Native sign in
To compile your project, you need to set up the `AuthenticationClient` with an `Org URL`.

The `Org URL` can found on the Admin Console's global header in the upper-right corner. Click the section which displays your email and company name.  A drop-down menu will appear and display general org information including the `Org URL` (e.g. subdomain.okta.com).
 
Once you find your `Org URL`, add the following to your `local.properties` file:

Example
```groovy
    authn.orgUrl="https://${yourOktaDomain}"
```

> **Note:** When you finish, you can build and run the app.
