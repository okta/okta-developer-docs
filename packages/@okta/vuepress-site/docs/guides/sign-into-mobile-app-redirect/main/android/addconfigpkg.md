Add the latest [Okta Mobile Kotlin library](https://github.com/okta/okta-mobile-kotlin) to the `dependencies` block of the `app/build.gradle` file:

```gradle
// Ensure all dependencies are compatible using the Bill of Materials (BOM).
implementation(platform('com.okta.kotlin:bom:1.0.0'))

// Add the web-authentication-ui SDK to the project.
implementation('com.okta.kotlin:web-authentication-ui')
```
