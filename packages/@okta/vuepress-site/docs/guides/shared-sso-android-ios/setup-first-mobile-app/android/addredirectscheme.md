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

You can find the `Org URL` in the Admin Console's global header in the upper-right corner of the page. Click the section that displays your email and company name.  A drop-down box appears and displays general org information including the `Org URL` (for example, subdomain.okta.com).
 
After you find your `Org URL`, add the following to your `local.properties` file:

Example
```groovy
    authn.orgUrl="https://${yourOktaDomain}"
```

> **Note:** When you finish, you can build and run the app.
