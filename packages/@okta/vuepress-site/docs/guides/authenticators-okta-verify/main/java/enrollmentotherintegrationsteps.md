#### 1. Initiate sign-in flow and return a list of authenticators

The user signs in with a username and password, and then chooses Okta Verify from a list of authenticators. This is covered in the earlier [Shared Code](#initiate-sign-in-flow-and-return-a-list-of-authenticators) section.

#### 2 - 3. Retrieve QR code, display QR code

Follow steps 2 and 3 of [Integrate Enrollment Using QR code](#integrate-enrollment-using-qr-code).

#### 4. Display a list of other enrollment channels

If you need to support other enrollment channels for Okta Verify. The list of supported factors is available in the `Authenticator` object from the previous step.

```java
private AuthenticationResponse selectAuthenticatorToEnroll(AuthenticationResponse authenticationResponse) {

    // The user selects an available authenticator
    Authenticator authenticator = selectAuthenticator(authenticationResponse);

    // Tell Okta which authenticator was chosen
    AuthenticationResponse selectAuthenticatorResponse =
        idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);

    // If a QR Code is avialble, show it to the user
    if (selectAuthenticatorResponse.getContextualData().getQrcode() != null) {
        String imageData = selectAuthenticatorResponse.getContextualData().getQrcode().getHref(); // TODO this should be fixed in the SDK, this is NOT an href
        console.writer().println("QR Code image data: " + imageData);
    }

    // Okta Verify can be enrolled in one of three ways, QR Code, email, and SMS
    if (authenticator.getFactors().size() > 1) {

        // prompt the user which method they will use
        List<Authenticator.Factor> factorTypes = authenticator.getFactors();
        IntStream.range(0, factorTypes.size()).forEach(index -> {
            console.writer().println(index + " - " + factorTypes.get(index).getLabel());
        });

        String selection = console.readLine("Select an enrollment type:");
        this.selectedEnrollFactor = factorTypes.get(Integer.parseInt(selection));

        // QR Code is the default, for other factors tell Okta which one was selected
        if (!"qrcode".equals(this.selectedEnrollFactor.getChannel())) {
            return idxAuthenticationWrapper.selectFactor(authenticationResponse.getProceedContext(),
                this.selectedEnrollFactor);
        }
    }
    return selectAuthenticatorResponse;
}
```

#### 5. Initiate email or SMS enrollment on server-side

When the user selects **Email** or **SMS** in the previous section, the response authentication status will be `AWAITING_CHANNEL_DATA_ENROLLMENT`. You will need return additional information about the factor:

- SMS - requires a phone number in an international format (e.g. `+12025551234`).
- Email - requires the email address associated with the user's account.

```java
case AWAITING_CHANNEL_DATA_ENROLLMENT:
    String channelValue = null;
    String channelName = this.selectedEnrollFactor.getChannel();

    // prompt user for additional information
    if ("email".equals(this.selectedEnrollFactor.getChannel())) {
        console.writer().println("Check your Email for instructions");
        channelValue = username; // use the username from the initial sign-in, if they are email addresses
    }
    else if ("sms".equals(this.selectedEnrollFactor.getChannel())) {
        channelName = "phoneNumber";
        channelValue = console.readLine("Mobile Number: ");
        console.writer().println("Check your phone for instructions");
    }

    // Send the information to Okta
    VerifyChannelDataOptions verifyChannelDataOptions = new VerifyChannelDataOptions(channelName, channelValue);
    return idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyChannelDataOptions);
```

After the user submits their email or mobile phone number, Okta sends an activation link to that address.

<div class="common-image-format">

![An email that contains the Okta Verify Push activation link](/img/authenticators/dotnet-authenticators-okta-verify-enrollment-email-text.png "An email containing the activation link")

</div>

#### 9. Prompt user to check email and start polling

Prompt the user to check their email or phone to continue signing in, then continue to poll as defined in the [common steps](#polling-okta) section.

#### 10. Click the link in the email and complete Okta Verify setup

The user opens the email on their mobile device and taps **Activate Okta Verify Push** that sends them to Okta Verify to complete the account setup.

<div class="common-image-format">

![A prompt for a user to install Okta Verify and activate it](/img/authenticators/java-authenticators-okta-verify-enrollment-email-prompt-user-to-check-email.png "An activation prompt for Okta Verify")

</div>

#### 11. Exit polling

After the user completes the setup and finishes enrolling their account, the next time the polling method is called, it returns a status of `SUCCESS` along with access and ID tokens. The user is now authenticated.
