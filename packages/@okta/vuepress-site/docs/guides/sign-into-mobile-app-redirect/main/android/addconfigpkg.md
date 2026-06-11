Add the latest [Okta Mobile Kotlin library](https://github.com/okta/okta-mobile-kotlin) to the `dependencies` block of the `app/build.gradle` file:

```gradle
// Ensure that all dependencies are compatible using the Bill of Materials (BOM).
implementation(platform('com.okta.kotlin:bom:2.0.3'))

// Add the SDK libraries used in this guide to the project.
implementation('com.okta.kotlin:auth-foundation')
implementation('com.okta.kotlin:oauth2')
implementation('com.okta.kotlin:web-authentication-ui')
```
