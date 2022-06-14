#### 1. Initiate sign-in flow and return a list of authenticators

The user signs in with a username and password, and then chooses Okta Verify from a list of authenticators. This is covered in the earlier [Shared Code](#initiate-sign-in-flow-and-return-a-list-of-authenticators) section.

#### 2 - 3. Retrieve and display a list of challenge methods

When the user selects Okta Verify, the user can either receive a push-request, or be prompted for a TOTP code.

```java
case AWAITING_AUTHENTICATOR_SELECTION:

    // prompt the user to select a factor
    Authenticator authenticator = selectAuthenticator(authenticationResponse);

    // if TOTP is available you may prompt the user to select TOTP or a push-notification
    if (authenticator.getFactors().size() > 1) {
        List<Authenticator.Factor> factorTypes = authenticator.getFactors();

        IntStream.range(0, factorTypes.size()).forEach(index -> {
            console.writer().println(index + " - " + factorTypes.get(index).getLabel());
        });

        String selection = console.readLine("Select an factor type:");
        Authenticator.Factor selectedFactor = factorTypes.get(Integer.parseInt(selection));
        return idxAuthenticationWrapper.selectFactor(proceedContext, selectedFactor);
    }

    // fallback to the default of the authenticator (push notification)
    return idxAuthenticationWrapper.selectAuthenticator(proceedContext,  authenticator);
```

#### 4. Prompt the user for the TOTP in Okta Verify

If the user clicks the link to "Enter a code", they will open Okta Verify on their device, and enter the TOTP code that appears:

```java
case AWAITING_AUTHENTICATOR_VERIFICATION:
    String code = console.readLine("Enter TOTP Code: ");
    return idxAuthenticationWrapper.verifyAuthenticator(proceedContext,
        new VerifyChannelDataOptions("totp", code));
```

The next response status will be `SUCCESS` and contain access and ID tokens. The user has been authenticated.
