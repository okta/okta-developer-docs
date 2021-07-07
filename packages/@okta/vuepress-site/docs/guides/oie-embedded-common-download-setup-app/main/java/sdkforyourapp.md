#### Step 1: Set up your app with prerequisites

Ensure you have all the [software requirements](#software-requirements) and have cloned the [okta-idx-java](https://github.com/okta/okta-idx-java) repository.

#### Step 2: Import packages and add framework

The Java SDK includes the Sprint Boot framework, which are used in both embedded authentication sample apps. Import the Okta API packages as well as any Sprint Boot packages you need.

For example:

```java
package com.okta.spring.example;

import com.okta.idx.sdk.api.client.IDXAuthenticationWrapper;
import com.okta.idx.sdk.api.client.ProceedContext;
import com.okta.idx.sdk.api.response.AuthenticationResponse;
import com.okta.idx.sdk.api.response.TokenResponse;
import com.okta.spring.example.helpers.HomeHelper;
import com.okta.spring.example.helpers.ResponseHandler;
import com.okta.spring.example.helpers.Util;
```

#### Step 3: Instantiate IDXAuthenticationWrapper

Authentication Okta APIs can be invoked after the `IDXAuthenticationWrapper` object is instantiated.

Code snippet example:

```java
import com.okta.idx.sdk.api.client.IDXAuthenticationWrapper;
import com.okta.idx.sdk.api.client.ProceedContext;
import com.okta.idx.sdk.api.response.AuthenticationResponse;
import com.okta.idx.sdk.api.response.TokenResponse;


AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin()
```