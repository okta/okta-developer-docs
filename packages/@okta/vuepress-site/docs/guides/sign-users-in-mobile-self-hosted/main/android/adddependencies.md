Add the [Okta Client SDK for Kotlin](https://github.com/okta/okta-mobile-kotlin) libraries to the `dependencies` block of your `app/build.gradle`:

```groovy
dependencies {
    // Ensure that the core libraries are compatible using the Bill of Materials (BOM).
    implementation(platform('com.okta.kotlin:bom:2.0.3'))
    implementation('com.okta.kotlin:auth-foundation')

    // OktaDirectAuth is published separately and isn't part of the BOM, so pin its version.
    implementation('com.okta.kotlin:okta-direct-auth:0.0.1')

    // Used by the Compose UI to host a ViewModel.
    implementation('androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7')
}
```

> **Note:** `okta-direct-auth` is a pre-release library (`0.0.1`). It isn't included in the `com.okta.kotlin:bom`, so set its version explicitly. Check the [SDK releases](https://github.com/okta/okta-mobile-kotlin/releases) for the latest version.

The code snippets read your configuration from `BuildConfig`. Enable that feature in the `android` block of `app/build.gradle`:

```groovy
android {
    buildFeatures {
        buildConfig = true
    }
}
```
