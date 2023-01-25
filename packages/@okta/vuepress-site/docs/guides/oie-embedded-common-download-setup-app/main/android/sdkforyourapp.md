Follow these steps to integrate the SDK into your own app.

<EmbeddedBrowserWarning />

#### 1: Set up your app with the prerequisites

1. In your Okta Org, [create a new application integration](/docs/guides/oie-embedded-common-org-setup/android/main/#create-a-new-application) for your app.
1. Ensure that you have all the [software requirements](#software-requirements).

#### 2: Import the packages and add the Android framework

The embedded authentication with SDK sample apps use the Android framework with the Identity Engine Java SDK. Import the Okta API packages as well as any Android packages that you need.

```java
package com.okta.android.example;

import com.okta.idx.sdk.api.client.IDXAuthenticationWrapper;
import com.okta.idx.sdk.api.client.ProceedContext;
import com.okta.idx.sdk.api.model.AuthenticationOptions;
import com.okta.idx.sdk.api.model.UserProfile;
import com.okta.idx.sdk.api.model.VerifyAuthenticatorOptions;
import com.okta.idx.sdk.api.response.AuthenticationResponse;
import com.okta.idx.sdk.api.response.TokenResponse;
```

#### 3: Instantiate the IDXAuthenticationWrapper object

Start integrating your app using the Identity Engine Java SDK. Begin the Okta authentication flow by instantiating the `IDXAuthenticationWrapper` object.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin()
```

See [IDX Kotlin SDK Documentation](https://github.com/okta/okta-idx-android#idx-kotlin-sdk-documentation) for more information.

Before running your app, ensure that you [set the configuration values](#set-the-configuration-values) for your embedded app. See [Run the embedded SDK sample app](/docs/guides/oie-embedded-common-run-samples/android/main/#run-the-embedded-sdk-sample-app) for step-by-step instructions on how to run a sample Android app.
