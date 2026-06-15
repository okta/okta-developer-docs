Now that you've configured your Okta org, create the Android app.

1. In Android Studio, select **File** > **New** > **New Project**.
1. Choose **Empty Activity** (the Jetpack Compose template), and then click **Next**.
1. Configure your project:
    * **Name**: `OktaPasswordAuth`
    * **Package name**: `com.okta.android.passwordauth`
    * **Language**: Kotlin
    * **Minimum SDK**: `API 23: Android 6.0 (Marshmallow)`
1. Click **Finish**.

The Okta SDK uses Java 8 APIs, so enable core library desugaring. Add the following to your `app/build.gradle`:

```groovy
android {
    compileOptions {
        coreLibraryDesugaringEnabled true
    }
}

dependencies {
    coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:2.0.4'
}
```
