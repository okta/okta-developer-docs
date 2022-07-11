1. Create a new Kotlin Android project called `browser_sign_in` with an **Empty Activity** in Android Studio. For information on creating a project, see the [Android Studio documentation](https://developer.android.com/training/basics/firstapp/creating-project).

2. Add the following code to the `app/build.gradle` to enable Android features used by the Okta SDK that aren't available on older Android versions:

```gradle
android {
    compileOptions {
        coreLibraryDesugaringEnabled true
    }
}

dependencies {
    coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:1.1.5'
}
```

> **Note**: The Okta CLI can create a Kotlin app for Android that's pre-configured for an Okta org by using the command `okta start android-kotlin`. This QuickStart uses a basic project to show you how to configure an app.
