#### Step 1: Set up your app with prerequisites

1. In your Okta Org, [create a new application integration](/docs/guides/oie-embedded-common-org-setup/java/main/#step-4-create-new-application) for your app.
1. Ensure that you have all the [software requirements](#software-requirements).
1. Clone the [okta-idx-java](https://github.com/okta/okta-idx-java) repository.
1. Ensure that you have set the Okta Java SDK [dependency](#software-requirements) for Apache Maven. Use the latest release version listed [here](https://github.com/okta/okta-idx-java#release-status).

#### Step 2: Import packages and add framework

Both the embedded authentication with SDK and the embedded Sign-In Widget sample apps use the Spring Boot framework with the Okta Java SDK. Import the Okta API packages as well as any Sprint Boot packages you need.

Code snippet example:

```java
package com.okta.spring.example;

import com.okta.idx.sdk.api.client.IDXAuthenticationWrapper;
import com.okta.idx.sdk.api.client.ProceedContext;
import com.okta.idx.sdk.api.model.AuthenticationOptions;
import com.okta.idx.sdk.api.model.UserProfile;
import com.okta.idx.sdk.api.model.VerifyAuthenticatorOptions;
import com.okta.idx.sdk.api.response.AuthenticationResponse;
import com.okta.idx.sdk.api.response.TokenResponse;
import com.okta.spring.example.helpers.HomeHelper;
import com.okta.spring.example.helpers.ResponseHandler;
import com.okta.spring.example.helpers.Util;
...
```

#### Step 3: Instantiate IDXAuthenticationWrapper

Authentication Okta APIs can be invoked after the `IDXAuthenticationWrapper` object is instantiated.

Code snippet example:

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin()
```

See [Okta Java SDK Usage guide](https://github.com/okta/okta-idx-java#usage-guide) for more information on using the SDK.