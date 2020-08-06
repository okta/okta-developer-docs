Use the [Okta OIDC](https://github.com/okta/okta-oidc-android) library, available through [JCenter](https://bintray.com/okta/com.okta.oidc.android/okta-oidc-android).

To install it, add the following to your `build.gradle`:

```groovy
implementation 'com.okta.oidc.android:okta-oidc-androidx:1.0.1'
```

For projects that don't yet use AndroidX:

```groovy
repositories {
    maven {
        url  "https://dl.bintray.com/okta/com.okta.android"
    }
}
```

```groovy
implementation 'com.okta.oidc.android:okta-oidc-android:1.0.1'
```
