1. Create a new Java Android project with an **Empty Activity** using Android Studio (we called it `browser_sign_in`). For information on creating a project, see the [Android Studio documentation](https://developer.android.com/training/basics/firstapp/creating-project).

2. Add the following permissions to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

3. The code samples use features from Java 11. [Configure Android Studio to use Java 11](https://developer.android.com/studio/intro/studio-config#jdk) and update `compileOptions.sourceCompatibility` and `compileOptions.targetCompatibility` in `app/build.gradle` to the following:

```gradle
compileOptions {
  sourceCompatibility JavaVersion.VERSION_11
  targetCompatibility JavaVersion.VERSION_11
}
```

> **Note**: If you're using the Okta CLI, you can also run `okta start android-java` to create an app. This command creates an OIDC app in Okta, downloads the [okta-android-java-sample](https://github.com/okta-samples/okta-android-java-sample), and configures it to work with the OIDC app. This quickstart uses a basic Android project instead, as it's easier to understand the Okta-specific additions if you work through them yourself.
