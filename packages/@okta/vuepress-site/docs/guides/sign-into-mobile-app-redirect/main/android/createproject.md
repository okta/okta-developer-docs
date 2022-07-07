1. Create a new Kotlin Android project with an **Empty Activity** using Android Studio (we called it `browser_sign_in`). For information on creating a project, see the [Android Studio documentation](https://developer.android.com/training/basics/firstapp/creating-project).

2. The SDK uses features not available in all Android versions, add the desugaring SDK.

```gradle
dependencies {
    coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:1.1.5'
}
```

> **Note**: If you're using the Okta CLI, you can also run `okta start android-kotlin` to create an app. This command creates an OIDC app in Okta, downloads the [okta-android-kotlin-sample](https://github.com/okta-samples/okta-android-kotlin-sample), and configures it to work with the OIDC app. This quickstart uses a basic Android project instead, as it's easier to understand the Okta-specific additions if you work through them yourself.
