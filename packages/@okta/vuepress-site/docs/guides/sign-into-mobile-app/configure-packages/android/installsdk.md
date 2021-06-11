Use the [Okta OIDC](https://github.com/okta/okta-oidc-android).

To install it, add the following to your `build.gradle`:

```groovy
implementation 'com.okta.android:oidc-androidx:1.0.18'
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
implementation 'com.okta.android:oidc-android:1.0.18'
```
