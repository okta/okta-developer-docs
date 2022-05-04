#### 1. Initiate sign-in flow and return a list of authenticators

The user signs in with a username and password, and then chooses Okta Verify from a list of authenticators. This is covered in the earlier [Shared Code](#initiate-sign-in-flow-and-return-a-list-of-authenticators) section.

#### 2. Request QR code

The user selects the Okta Verify Authenticator, using the common `selectAuthenticator()` method described above, then passing the result into `idxAuthenticationWrapper.selectAuthenticator()`.


```java
case AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION:
    return idxAuthenticationWrapper.selectAuthenticator(proceedContext,
        selectAuthenticator(authenticationResponse));
```

#### 3: Display QR code and start polling

When the user selects to enroll the Okta Verify `Authenticator` the form posts back to the `idxAuthenticationWrapper.selectAuthenticator()` method. This will trigger an `AWAITING_POLL_ENROLLMENT` state.  The state's `ContextualData` object contains a base64 encoded QR code image for display to the user.

```java
case AWAITING_POLL_ENROLLMENT:
  // show user QR code
  String imageData = authenticationResponse.getContextualData().getQrcode().getHref(); // TODO this should be fixed in the SDK, this is NOT an hreff

  // After displaying the QR code, poll while the user opens Okta Verify and scans the QR code
  return poll(authenticationResponse);
```

Display the instructions and QR code to the user, similar to the following screenshot:

<div class="common-image-format">

![A QR code to be scanned into Okta Verify to complete enrollment](/img/authenticators/java-authenticators-okta-verify-enrollment-scan-qr-code.png "A sample QR code to be scanned in Okta Verify")

</div>

> **Note:** There is a link to select an enrollment channel other than the QR code above ("Can't scan?"). The code for this and enrolling Okta Verify using other channels is in the [Integrate enrollment using other channels](#Integrate-enrollment-using-other-channels) section.

The polling logic and code is common across all the flows that use it and is covered in the [Polling Okta](#Polling-okta) section.

#### 4: Open Okta Verify

Next, the user installs Okta Verify (if not already installed on their device) and opens the app. To learn how to install and use the Okta Verify app, go to the [Okta Help Center](https://help.okta.com/en/prod/Content/Topics/Mobile/okta-verify-overview.htm).

#### 5: Scan QR code

After the user opens Okta Verify, they verify the account in the app by scanning the QR code on the screen using the device's camera.

#### 6: Exit polling

After the user scans the QR code and finishes enrolling their account, the next polling request will return a status of `SUCCESS` along with access and ID tokens.
