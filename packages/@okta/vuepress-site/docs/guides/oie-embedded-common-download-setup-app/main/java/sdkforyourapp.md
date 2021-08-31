After you run the sample app and explore its available use cases, you can begin to integrate the SDK and/or the widget into your own app. To get started follow these steps:

#### 1: Set up your app with the prerequisites

1. In your Okta Org, [create a new application integration](/docs/guides/oie-embedded-common-org-setup/java/main/#create-a-new-application) for your app.
1. Ensure that you have all the [software requirements](#software-requirements).
1. Clone the [okta-idx-java](https://github.com/okta/okta-idx-java) repository.
1. Ensure that you have set the Okta Identity Engine Java SDK [dependency](#software-requirements) for Apache Maven. Use the [latest released version](https://github.com/okta/okta-idx-java/releases).

#### 2: Import the packages and add the Spring Boot framework

Both the embedded authentication with SDK and the embedded Sign-In Widget sample apps use the Spring Boot framework with the Identity Engine Java SDK. Import the Okta API packages as well as any Spring Boot packages you need.

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
```

#### 3: Instantiate the IDXAuthenticationWrapper object

Authentication Okta APIs can be invoked after the `IDXAuthenticationWrapper` object is instantiated.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin()
```

See [Okta Java SDK Usage guide](https://github.com/okta/okta-idx-java#usage-guide) for more information on SDK usage.
