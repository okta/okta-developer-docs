Since several steps in the enrollment and challenge flows are nearly identical, it's recommended to componentize the logic to reduce duplicate code and increase reusability. Specifically, the common areas include:

* [Initiating sign-in and returning a list of authenticators to the user](#initiate-sign-in-and-return-a-list-of-authenticators)
* [Polling Okta](#polling-okta)

A description and step-by-step integration for each of these common steps follow.

### Initiate sign-in flow and return a list of authenticators

All four flows start with the same steps that enable a user to sign in with a username and password, and then choose Okta Verify from a list of authenticators. The following diagram shows this common flow:

<div class="common-image-format">

![Sequence diagram showing the shared sign-in initiation flow for Okta Verify challenge and enrollment](/img/authenticators/java-authenticators-okta-verify-shared-code-initiate-signin.png "All steps in the shared sign-in flow")

</div>

#### 1: Authenticate the user credentials

After a user initiates the sign-in flow by submitting their username and password add the following code:

```java
// create an IDX Authentication Wrapper (can be an application scoped singleton)
IDXAuthenticationWrapper idxAuthenticationWrapper = new IDXAuthenticationWrapper();
// begin transaction
// The proceedContext needs to be persisted between interactions (for example, stored in a HttpSession for web apps)
ProceedContext proceedContext = idxAuthenticationWrapper.begin().getProceedContext();  // TODO this needs request context
// set the user's credentials
AuthenticationOptions authenticationOptions = new AuthenticationOptions(username, password);
// start authentication flow
AuthenticationResponse authenticationResponse =
    idxAuthenticationWrapper.authenticate(authenticationOptions, proceedContext);
```

#### 2: Handle the response from the sign-in flow

The `AuthenticationResponse` contains the current state of the authentication process. It could be a `SUCCESS` or may indicate that more information is needed to complete the flow, for example, require an additional factor.

Query the `authenticationStatus` property of the `AuthenticationResponse` object returned by `authenticate()` method to discover the current status of the authentication process.

```java
// Update the context each time a request is made to Okta
// make sure it is persisted for web applications
proceedContext = authenticationResponse.getProceedContext();
// get the authenticationStatus
AuthenticationStatus authenticationStatus = authenticationResponse.getAuthenticationStatus();
switch (authenticationStatus) {
    case SUCCESS:
        … your code …
    case PASSWORD_EXPIRED:
        … your code …
}
```

#### 3: Display a list of possible authenticator factors

Your application will need to display the list of authenticators (including Okta Verify).

```java
private AuthenticationResponse selectAuthenticator(AuthenticationResponse authenticationResponse) {

    List<Authenticator> authenticators = authenticationResponse.getAuthenticators();

    // show authenticators to user
    IntStream.range(0, authenticators.size()).forEach(index -> {
        console.writer().println(index + " - " + authenticators.get(index).getLabel());
    });

    // prompt user to select a factor
    String selection = console.readLine("Select a Factor: ");
    Authenticator authenticator = authenticators.get(Integer.parseInt(selection));

    return idxAuthenticationWrapper.selectAuthenticator(proceedContext,  authenticator);
}
```

The available authenticators are listed along with Okta Verify.

At this point, the next steps differ depending on whether you are working with an enrollment flow or a challenge flow. Go to the specific flows (enroll with [QR Code](#integrate-enrollment-using-qr-code) or enroll with [other channels](#integrate-enrollment-using-other-channels)) to understand how.

### Polling Okta

Polling is used during enrollment using a [QR Code](#integrate-enrollment-using-qr-code), enrollment using [other channels](#integrate-enrollment-using-other-channels), and challenge using [push notification flows](#integrate-challenge-using-push-notification-option) to determine when the user completes the verification action in Okta Verify.

The user steps out of your app during these flows to complete actions within Okta Verify. While your app waits for the user, it should poll Okta using the SDK to determine when they finish with Okta Verify. Once polling has finished the status will be updated to `SUCCESS`, or another state indication more information is needed.

#### Poll the Okta Server for current state of flow

The `AuthenticationResponse` object contains information on the frequency a client may poll the Okta server.

```java
private AuthenticationResponse poll(AuthenticationResponse authenticationResponse) {
    sleep(Integer.parseInt(authenticationResponse.getProceedContext().getRefresh())); // TODO this string typing should be fixed in: https://github.com/okta/okta-idx-java/issues/316
    return idxAuthenticationWrapper.poll(proceedContext);
}
```
Once polling is complete the `authenticationStatus` property should be one of the following statuses:

* **SUCCESS** : The user is signed in successfully.
* **PASSWORD_EXPIRED** : The user needs to change their password.
* **AWAITING_AUTHENTICATOR_ENROLLMENT** : The user successfully enrolled Okta Verify, but there are other authenticators that the user could enroll.
* **AWAITING_CHALLENGE_AUTHENTICATOR_SELECTION** : The user has successfully enrolled Okta Verify and all other authenticators. The user now needs to select an authenticator to sign in with.

This common code is shared by all the flows documented below that use the polling mechanism.

