### 1. Authenticate the user credentials

After a user starts the sign-in process by entering the username and password, create an `AuthenticationOptions` object and set its `username` and `password` fields to the values set by the user. Pass this object as a parameter to the `authenticate()` method on the `IdxAuthenticationWrapper` that you have instantiated.

```java
// Begin the authentication flow
AuthenticationResponse authenticationResponse = idxAuthenticationWrapper.begin();
// TODO: add device info

// remember the user's state
proceedContext = authenticationResponse.getProceedContext();

// set the user's credentials
AuthenticationOptions authenticationOptions = new AuthenticationOptions(username, password);

// submit username/password
authenticationResponse = idxAuthenticationWrapper.authenticate(authenticationOptions, proceedContext);
```

### 2. Handle the response from the sign-in flow

Query the `AuthenticationStatus` property of `AuthenticationResponse` returned by `authenticate()` to discover the current status of the authentication process.

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

If you configured your Okta org correctly, you need to respond to two specific authenticator statuses to handle this scenario:

* `AWAITING_AUTHENTICATOR_SELECTION` that is covered in this section
* `AWAITING_AUTHENTICATOR_VERIFICATION` that is covered in a later section

### 3. Display a list of possible authenticators

You can find the names of the available authenticators for enrollment or challenge in the `AuthenticationResponse` object's `authenticators` collection. Display all of the authenticators that the user has enrolled and are ready for use.

```java
case AWAITING_AUTHENTICATOR_SELECTION:
    List<Authenticator> authenticators = authenticationResponse.getAuthenticators();

    // show authenticators to user
    IntStream.range(0, authenticators.size()).forEach(index -> {
        console.writer().println(index + " - " + authenticators.get(index).getLabel());
    });

    // prompt user to select a factor
    String selection = console.readLine("Select an Authenticator: ");
    Authenticator authenticator = authenticators.get(Integer.parseInt(selection));

    // tell Okta which Authenticator is used
    return idxAuthenticationWrapper.selectAuthenticator(proceedContext,  authenticator);
```

When the email authenticator is selected, an email will be sent to the user.

### 4. Check authenticator status

The next authentication status will be `AWAITING_AUTHENTICATOR_VERIFICATION` which indicates information is needed. A client can either accept a TOTP code from the email address or poll until the user has completed the flow in a different browser window.

### 5. Display OTP input page or poll

The user needs to leave your application and check their email. While they are doing this, your application can continue to poll Okta, and accept the input of a TOTP code:

```java
case AWAITING_AUTHENTICATOR_VERIFICATION:
    String factorType = authenticationResponse.getCurrentAuthenticatorEnrollment().getValue().getType();

    if ("email".equals(factorType)) {
      // Tell the use to check their email
      console.writer().println("Check your email...");

      // The user could enter a TOTP code from the email address, or you can poll
      String code = console.readLine("TOTP Code [press enter to continue polling]: ");
      if (!Strings.isEmpty(code)) {
        return idxAuthenticationWrapper.verifyAuthenticator(proceedContext, new VerifyAuthenticatorOptions(code));
      }

      // poll the server looking for updates, the emails also contain a TOTP code,
      // you could implement both polling and the ability to enter a code.
      sleep(Integer.parseInt(authenticationResponse.getCurrentAuthenticatorEnrollment().getValue().getPoll().getRefresh())); // TODO this should be fixed in: https://github.com/okta/okta-idx-java/issues/316
      return idxAuthenticationWrapper.poll(proceedContext);
    }

    throw new IllegalStateException("Unsupported factor type selected: " + factorType);
```

### 6. User clicks the email magic link

Next, the user opens their email and clicks the magic link. The following screenshot shows the magic link in the email.

<div class="common-image-format">

![Magic link in email](/img/authenticators/authenticators-email-challenge-magic-link-in-email.png)

**TODO:** need java version

</div>

After the user completes this step, the next authentication response returns a status of `SUCCESS` along with access and ID tokens. The user is now authenticated.

