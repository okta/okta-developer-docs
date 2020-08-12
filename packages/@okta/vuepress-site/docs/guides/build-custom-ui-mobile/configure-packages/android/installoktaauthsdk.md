Add the following to your `build.gradle` file:

```groovy
dependencies {
    implementation 'com.okta.authn.sdk:okta-authn-sdk-api:0.4.0'
    runtimeOnly 'com.okta.authn.sdk:okta-authn-sdk-impl:0.4.0'
    runtimeOnly 'com.okta.sdk:okta-sdk-okhttp:1.5.2'
    runtimeOnly 'com.squareup.okhttp3:okhttp:3.14.1'
}
```
