Follow these steps to integrate the SDK into your own app.

#### 1: Set up your app with the prerequisites

1. In your Okta Org, [create a new application integration](/docs/guides/oie-embedded-common-org-setup/android/main/#create-a-new-application) for your app.
1. Ensure that you have all the [software requirements](#software-requirements).

#### 2: Import the packages and create a configuration object

The embedded authentication with SDK sample apps use the Android framework with the Identity Engine Kotlin SDK. Import the Okta API packages as well as any Android packages that you need.

```kotlin
import com.okta.idx.kotlin.client.IdxClientConfiguration
import com.okta.android.example.BuildConfig

...

val clientConfig = IdxClientConfiguration(
    issuer = BuildConfig.ISSUER.toHttpUrl(),
    clientId = BuildConfig.CLIENT_ID,
    scopes = setOf("openid", "email", "profile", "offline_access"),
    redirectUri = BuildConfig.REDIRECT_URI,
)
```

#### 3: Instantiate the IDXAuthenticationWrapper object

Start integrating your app using the Identity Engine Kotlin SDK. Begin the Okta authentication flow by calling `start()` on the `IdxClient` object.

```kotlin
@Volatile
private var client: IdxClient? = null

...

when (val clientResult = IdxClient.start(IdxClientConfigurationProvider.get())) {
    is IdxClientResult.Error -> {
        // handle error
    }
    is IdxClientResult.Success -> {
        client = clientResult.result
        // calls the IDX API resume to receive the first IDX response.
        when (val resumeResult = clientResult.result.resume()) {
            is IdxClientResult.Error -> {
               // handle error
            }
            is IdxClientResult.Success -> {
                handleResponse(resumeResult.result)
            }
        }
    }
}
```

See [Okta Kotlin SDK Usage guide](https://github.com/okta/okta-idx-android#introduction) for more information.

Before running your app, ensure that you [set the configuration values](#set-the-configuration-values) for your embedded app. See [Run the embedded SDK sample app](/docs/guides/oie-embedded-common-run-samples/android/main/#run-the-embedded-sdk-sample-app) for step-by-step instructions on how to run a sample Android app.
