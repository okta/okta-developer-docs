Add the following to your `build.gradle` file:

```groovy
dependencies {
    implementation 'com.okta.android:oidc-androidx:1.0.16'
    implementation 'com.okta.authn.sdk:okta-authn-sdk-api:2.0.0'
    implementation('com.okta.authn.sdk:okta-authn-sdk-impl:2.0.0') {
        exclude group: 'com.okta.sdk', module: 'okta-sdk-httpclient'
    }
    implementation 'com.okta.sdk:okta-sdk-okhttp:2.0.0'
}
```

Add the following to your `proguard-rules.pro`

```
-keep class com.okta.** { *; }
```
