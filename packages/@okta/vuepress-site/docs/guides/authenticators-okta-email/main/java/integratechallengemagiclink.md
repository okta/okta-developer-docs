### 1. Build a sign-in page on the client

Build a sign-in page that captures the user's name and password, as shown in the following example.

<div class="half border">

![A simple sign-in form with username and password fields](/img/authenticators/dotnet-authenticators-sign-in-form.png)

</div>

### 2. Authenticate the user credentials

After a user starts the sign-in process by entering the username and password, create an `AuthenticationOptions` object and set its `username` and `password` fields to the values set by the user. Pass this object as a parameter to the `authenticate()` method on the `IdxAuthenticationWrapper` that you have instantiated.

```java
// Begin the authentication flow
AuthenticationResponse authenticationResponse = idxAuthenticationWrapper.begin(
        new RequestContext()
                .setIpAddress("11.22.333.4") // ip address of request
                .setUserAgent("Mozilla/5.0 ..."));

// remember the user's state
proceedContext = authenticationResponse.getProceedContext();

// set the user's credentials
AuthenticationOptions authenticationOptions =
   new AuthenticationOptions(username, password);

// submit username/password
authenticationResponse =
   idxAuthenticationWrapper.authenticate(authenticationOptions, proceedContext);
```

### 3. Handle the response from the sign-in flow

Query the `AuthenticationStatus` property of `AuthenticationResponse` returned by `authenticate()` to discover the current status of the authentication process.

```java
// Update the context each time a request is made to Okta
// make sure it is persisted for web applications
proceedContext = authenticationResponse.getProceedContext();
// get the authenticationStatus
AuthenticationStatus authenticationStatus = 
   authenticationResponse.getAuthenticationStatus();
switch (authenticationStatus) {
    case SUCCESS:
        … your code …
    case PASSWORD_EXPIRED:
        … your code …
}
```

If you configured your Okta org correctly, you need to respond to two specific authenticator statuses to handle this scenario:

* `AWAITING_AUTHENTICATOR_SELECTION` that is covered in this section
* `AWAITING_AUTHENTICATOR_VERIFICATION` that is covered in a later section

### 4. Display a list of available authenticators

You can find the names of the available authenticators for enrollment or challenge in the `AuthenticationResponse` object's `authenticators` collection. Display all of the authenticators that the user has enrolled and are ready for use.

```java
case AWAITING_AUTHENTICATOR_SELECTION:
    List<Authenticator> authenticators = 
      authenticationResponse.getAuthenticators();

    // show authenticators to user
    IntStream.range(0, authenticators.size()).forEach(index -> {
        console.writer().println(
            index + " - " + authenticators.get(index).getLabel());
    });

    // prompt user to select a factor
    String selection = console.readLine("Select an Authenticator: ");
    Authenticator authenticator = authenticators.get(Integer.parseInt(selection));

    // tell Okta which Authenticator is used
    return idxAuthenticationWrapper.selectAuthenticator(
      proceedContext, authenticator);
```

### 5. Submit the email authenticator

When the email authenticator is selected, an email will be sent to the user.

The next authentication status will be `AWAITING_AUTHENTICATOR_VERIFICATION` which indicates information is needed. A client can either accept a TOTP code from the email address or poll until the user has completed the flow in a different browser window.

### 6. Display OTP input page

Build a form that allows the user to enter the one-time passcode (OTP) sent to them by email. Although this use case covers the magic link scenario, displaying an OTP page allows for an OTP verification fallback in cases where the OTP may be required or simply more convenient. For example, a user checking their email from a different device must use an OTP. [Integrate different browser and device scenario](#integrate-different-browser-and-device-scenario-with-magic-links) covers the integration details for the different browser and device scenarios.

### 7. User clicks the email magic link

Next, the user opens their email and clicks the magic link. The following screenshot shows the magic link in the email.

<div class="full">

![Magic link in email](/img/authenticators/authenticators-email-challenge-magic-link-in-email.png)

</div>

After the user completes this step, the next authentication response returns a status of `SUCCESS` along with access and ID tokens. The user is now authenticated.

The link points to your Okta org as in: `https://yourorg.okta.com/email/verify/0oai9ifvveyL3QZ8K696?token=ftr2eAgsg...`

When the user clicks the magic link, your org receives the request, gets the OTP and state parameters, and forwards the request with these parameters to your application. The org combines the callback URI that you defined in [Update configurations](#update-configurations) with the OTP and state parameters to produce a final callback URL for the user. For example, `http://localhost:8080/magiclink/callback?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32`

### 8. Handle the magic link redirect in your app

Create a callback handler method that checks if the user has opened the magic link in the same browser and on the same device that they used for the previous steps of the challenge flow. If this is true, take the `otp` parameter in the query string and pass it as a parameter to `verifyAuthenticator()`.

> **Note**: The sample code below demonstrates a very simple check, assuming a different browser or device if the context can't be recovered from a session variable. Use a more robust check in your final application.

```java
// correlate received state with the client context
if ((Strings.hasText(otp))
         && proceedContext != null
         && (Strings.isEmpty(state) || !state.equals(proceedContext.getClientContext().getState()))) {
   ModelAndView mav = new ModelAndView("error");
   mav.addObject("errors",
            "Could not correlate client context with the received state value " + state + " in callback");
   return mav;
}

AuthenticationResponse authenticationResponse;

// if otp is present, proceed with introspect to finish the flow
if (Strings.hasText(otp)) {
   if (proceedContext == null) {
         // different browser case
         ModelAndView mav = new ModelAndView("info");
         mav.addObject("message",
               "Please enter OTP " + otp + " in the original browser tab to finish the flow.");
         return mav;
   }

   VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(otp);
   authenticationResponse = authenticationWrapper
            .verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
   return responseHandler.handleKnownTransitions(authenticationResponse, session);
}
```

### 9. Complete challenge and sign user in

If the `otp` value is valid, the `AuthenticationStatus` property of the `AuthenticationResponse` object returned by `VerifyAuthenticatorAsync` is `Success`. In this case, call `getTokenResponse()` to retrieve the user's ID and access tokens.

```java
case SUCCESS:
    TokenResponse tokenResponse = authenticationResponse.getTokenResponse();
    String accessToken = tokenResponse.getAccessToken();
    … your code …
```
