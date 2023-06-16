### 1: Build a sign-in page on the client

Build a sign-in page that captures the user's name and password.

<div class="half border">

![Basic sign-in dialog](/img/authenticators/java-authenticators-signinform.png)

</div>

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

Call `AuthenticationResponse.getAuthenticationStatus()` to retrieve the current state of the authentication process. The return value indicates either a successful authentication (`SUCCESS`) or that more information is required, such as an additional authenticator.


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

### 4: Display a list of possible authenticators

The names of the available authenticators are found in the `authenticators` collection of the `AuthenticationResponse`.

Display a selector with the list of available authenticators:

```java
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
```

### 5: Retrieve shared secret and QR code

When the user selects the Google Authenticator factor, call `selectAuthenticator()`, passing in the current context object and authenticator choice as parameters.

```java
// Update the response with the selected authenticator and send the result back to the server.
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

The returned `AuthenticationResponse` object contains a QR Code and shared secret.

### 6: Display shared secret and QR Code

Display the QR code and/or shared secret to the user, so they can register the factor with Google Authenticator.

```java
authenticationResponse.getContextualData().getSharedSecret()
authenticationResponse.getContextualData().getQrcode()
```

For example

<div class="half border">

![A page showing a QR code and a shared secret to enroll a mobile device running Google Authenticator](/img/authenticators/dotnet-authenticators-google-enroll-page.png)

</div>

> **NOTE:** The shared secret is typically used when a QR code cannot be displayed or scanned.

### 7: Copy shared secret to Google Authenticator

After the shared secret appears, the user installs the Google Authenticator app on their mobile device if it's not already installed. Next, they add the secret code to the Google Authenticator app by either taking a photo of the QR code or manually entering the secret string. Once added, Google Authenticator displays the time-based one-time passcode (TOTP) for the newly added account.

<div class="half">

![A time-based one-time passcode being shown in Google Authenticator](/img/authenticators/authenticators-google-one-time-password.png)

</div>

### 8: Challenge user for TOTP

Prompt the user for the TOTP. Call `verifyAuthenticator()` passing in the TOTP as a parameter to verify it with Identity Engine:

```java
case AWAITING_AUTHENTICATOR_VERIFICATION:
    // confirm the TOTP code with Okta and to back into the state machine
    authenticationResponse = idxAuthenticationWrapper
        .verifyAuthenticator(proceedContext, new VerifyAuthenticatorOptions(code));
```

### 9: Sign user in

After successful user authentication, Identity Engine returns an `AuthenticationStatus` of `SUCCESS`. Call `getTokenResponse()` to retrieve the user's ID and access tokens.

```java
case SUCCESS:
    TokenResponse tokenResponse = authenticationResponse.getTokenResponse();
    String accessToken = tokenResponse.getAccessToken();
    … your code …
```
