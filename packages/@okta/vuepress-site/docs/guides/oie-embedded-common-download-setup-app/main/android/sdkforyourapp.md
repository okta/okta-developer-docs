Follow these steps to integrate the SDK into your own app.

#### Step: Set up your app with the prerequisites

1. In your Okta Org, [create a new application integration](/docs/guides/oie-embedded-common-org-setup/java/main/#create-a-new-application) for your app.
1. Ensure that you have all the [software requirements](#software-requirements).

#### Step: Import the packages and add the Android framework

The embedded authentication with SDK sample apps use the Android framework with the Okta Identity Engine Java SDK. Import the Okta API packages as well as any Android packages that you need.

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

#### Step: Instantiate the IDXAuthenticationWrapper object

You can invoke authentication Okta APIs after the `IDXAuthenticationWrapper` object is instantiated.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin()
```

See [Okta Java SDK Usage guide](https://github.com/okta/okta-idx-java#usage-guide) for more information.
