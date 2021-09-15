* [Android Studio](https://developer.android.com/studio) 4.2.x or later
* [JDK 8](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html) or later

    Include the following Identity Engine Java SDK dependency for Apache Maven:

    ```groovy
    implementation 'com.okta.idx.sdk: okta-idx-java-api:$okta_sdk_version'
    ```

    where `$okta.sdk.version` is the latest release version. See [Release Status](https://github.com/okta/okta-idx-java#release-status) for the latest Identity Engine Java SDK version.

The Okta Identity Engine Android sample app uses the Identity Engine Java SDK. The Java SDK isn't Android-specific, but works with Android.
