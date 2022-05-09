### 1: Build a sign-in page on the client

Build a sign-in page that capture's the user's name and password, as shown in the following example.

![Basic sign-in dialog](/img/authenticators/java-authenticators-signinform.png)

### 2: Authenticate the user credentials

Add the following code to initiate the sign-in flow using the credentials collected from the user.

```java
// create an IDX Authentication Wrapper (can be an application scoped singleton)
IDXAuthenticationWrapper idxAuthenticationWrapper = new IDXAuthenticationWrapper();

// Begin transaction
AuthenticationResponse authenticationResponse = idxAuthenticationWrapper.begin(
        new RequestContext()
                .setIpAddress("11.22.333.4") // ip address of request
                .setUserAgent("Mozilla/5.0 ..."));

// The proceedContext needs to be persisted between interactions (e.g. stored in a HttpSession for web apps)
ProceedContext proceedContext = authenticationResponse.getProceedContext();

// Set the user's credentials.
AuthenticationOptions authenticationOptions = new AuthenticationOptions(username, password);

// Start the authentication flow.
AuthenticationResponse authenticationResponse = idxAuthenticationWrapper.authenticate(authenticationOptions, proceedContext);
```

### 3: Handle the response from the sign-in flow

Find the current state of the authentication process by calling `AuthenticationResponse.getAuthenticationStatus()`. The return value either indicates a successful authentication (`SUCCESS`), or that more information is required, such as an additional authenticator.


```java
// Update the context each time a request is made to Okta.
// For web applications, ProceedContext must be persistent between requests.
proceedContext = authenticationResponse.getProceedContext();

AuthenticationStatus authenticationStatus = authenticationResponse.getAuthenticationStatus();

switch (authenticationStatus) {
    case SUCCESS:
        // Handle a successful sign-in.
    case PASSWORD_EXPIRED:
        // Handle an expired password error.
}
```

### 4: Select a possible authenticator factor

You need to handle two other authenticator status values in addition to `SUCCESS` and `PASSWORD_EXPIRED` for an Okta org that is configured using this guide:

* `AWAITING_PROFILE_ENROLLMENT` that is covered in this section
* `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` that is covered in [the challenge flow section](#integrate-sdk-for-authenticator-challenge).

The names of the available authenticators are found in the `authenticators` collection of the `AuthenticationResponse`.

Display a selector with the list of available authenticators:


```java
case AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION:

    // There are multiple potential factors, for this it is assumed that
    // Google Authenticator (OTP) is used
    Authenticator authenticator = authenticationResponse.getAuthenticators().stream()
            .filter(auth -> auth.getType().equals("otp"))
            .findFirst() // find the first "otp" factor or throw an exception
            .orElseThrow(() -> {
                String availableFactors = authenticationResponse.getAuthenticators().stream()
                        .map(auth -> auth.getLabel() + " - " + auth.getType())
                        .collect(Collectors.joining(", "));
                return new RuntimeException("OTP factor not found, existing options: " + availableFactors);
            });

    // Update the response with the selected authenticator and send the result back to the server.
    authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

### 5: Retrieve shared secret and QR Code

The next `AuthenticationResponse` object will contain information about the OTP factor and will contain a QR Code and shared secret.

> **NOTE:** the _shared secret_ is typically used when a QR code cannot be displayed or scanned.

Display the QR code and/or shared secret to the user, so they can register the factor with Google Authenticator.

```java
authenticationResponse.getContextualData().getSharedSecret()
authenticationResponse.getContextualData().getQrcode()
```

Prompt the user for a OTP code, and continue the authentication flow:

```java
// Send the code to Okta and handle the next response.
authenticationResponse = idxAuthenticationWrapper
    .verifyAuthenticator(proceedContext, new VerifyAuthenticatorOptions(code));
```

