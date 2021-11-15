Begin to integrate the SDK into your own app by following these steps:

1. [Set up your app with the prerequisites](#set-up-your-app-with-the-prerequisites).
1. [Import the packages and add the Spring Boot framework](#import-the-packages-and-add-the-spring-boot-framework).
1. [Instantiate the IDXAuthenticationWrapper object](#instantiate-the-idxauthenticationwrapper-object).

#### Set up your app with the prerequisites

1. In your Okta Org, [create a new application integration](/docs/guides/oie-embedded-common-org-setup/java/main/#create-a-new-application) for your app and [update your Custom Authorization Server](/docs/guides/oie-embedded-common-org-setup/android/main/#update-the-default-custom-authorization-server) to use the Interaction Code flow.
1. Ensure that you have all the Identity Engine Java SDK [software requirements](#software-requirements).
1. Clone the [Identity Engine Java SDK (`okta-idx-java`)](https://github.com/okta/okta-idx-java) repository.
1. Ensure that you've set the [dependencies](#software-requirements) in your project with the latest [Identity Engine Java SDK released version](https://github.com/okta/okta-idx-java/releases).

#### Import the packages and add the Spring Boot framework

The embedded authentication with SDK sample app uses the Spring Boot framework with the Identity Engine Java SDK. Import the Identity Engine SDK packages as well as any Spring Boot packages that you need.

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

#### Instantiate the IDXAuthenticationWrapper object

Start integrating your app using the Identity Engine Java SDK. Begin the Okta authentication flow by instantiating the `IDXAuthenticationWrapper` object.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin()
```

See [Okta Java SDK Usage guide](https://github.com/okta/okta-idx-java#usage-guide) for more information on SDK usage.

Before running your app, ensure that you [set the configuration values](#set-the-configuration-values) for your embedded app with one of the available SDK options. See [Run the embedded SDK sample app](/docs/guides/oie-embedded-common-run-samples/java/main/#run-the-embedded-sdk-sample-app) for step-by-step instructions on how to run a sample app.
