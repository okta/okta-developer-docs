To add a redirect scheme for Android, you must define a gradle manifest placeholder in your app's `build.gradle`.

In your app's `build.gradle`, add the redirect scheme inside the `defaultConfig` property. The redirect scheme should match what you used when you modified the config.json file.

For example, if your redirect URI is `com.first.sample:/callback`, then the appAuth redirect scheme is `com.first.sample`.

Example

```groovy
    manifestPlaceholders = [
        "appAuthRedirectScheme": "com.first.sample"
    ]
```

### Mobile sign-in flow

To compile your project, you need to set up the `AuthenticationClient` with an org URL.

1. Locate your org URL by clicking your username in the upper-right corner of the Admin Console. The Okta domain appears in the dropdown menu (for example, subdomain.okta.com).
1. Add the following to your `local.properties` file:

Example

```groovy
    authn.orgUrl="https://${yourOktaDomain}"
```

> **Note:** When you finish, you can build and run the app.
