## Integration steps

### Step 1: User launches sign-in page

Build a sign-in page for your app that captures both the username and password.

<div class="common-image-format">

![Displays the Java SDK sign-in page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in-java.png)

</div>

Begin the authentication process by calling Java SDK's [`IDXAuthenticationWrapper.begin()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java#L603) method and getting a new [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();
ProceedContext proceedContext = beginResponse.getProceedContext();
```

### Step 2: User enters credentials

 After the user submits their credentials, call `IDXAuthenticationWrapper.authenticate()` with the credential values.

```java
AuthenticationResponse authenticationResponse =
     idxAuthenticationWrapper.authenticate(new AuthenticationOptions(username, password.toCharArray()), proceedContext);
```

If the password is validated, the `IDXAuthenticationWrapper.authenticate()` method returns an [`AuthenticationResponse`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with the following properties:

1. `AuthenticationStatus` = `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` <br>
     This status indicates that there are required authenticators that need to be enrolled.

2. `Authenticators` = List of [authenticators](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/Authenticator.java) to be enrolled (in this case, there is only the phone authenticator). <br>
    Authenticators are the factor credentials that are owned or controlled by the user. These are verified during authentication.

> **Note:** If the user already has the phone authenticator enrolled, `AuthenticationStatus` = `AWAITING_AUTHENTICATOR_SELECTION` is returned (instead of `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION`) and the user does not have to enroll the phone authenticator with a phone number, bypassing steps [3](#step-3-user-selects-phone-authenticator) and [4](#step-4-user-enters-phone-number).

After receiving the `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` status and the list of authenticators to be enrolled, provide the user with a form to select the authenticator to enroll. In the following example, phone is the only authenticator:

<div class="common-image-format">

![Displays the enroll phone authenticator selection page for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-in-pwd-phone-enroll-phone-java.png)

</div>

> **Tip:** Build a generic authenticator selection form to handle single or multiple authenticators returned from the SDK.

### Step 3: User selects phone authenticator

In this use case, the user selects the **Phone** as the authenticator to enroll. Pass this user-selected authenticator to the `IDXAuthenticationWrapper.selectAuthenticator()` method.

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

The response from this request is an `AuthenticationResponse` object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_DATA`. This status indicates that the user needs to provide additional authenticator information. In the case of the phone authenticator, the user needs to specify a phone number.

> **Note:** Only SMS is currently supported for the phone authenticator factor type. In the future, if your org supports the voice factor, you will need to add a voice or SMS factor selection form for your app.

### Step 4: User enters phone number

You need to build a form to capture the user's phone number, for example:

<div class="common-image-format">

![Displays the Java SDK's enroll phone number authenticator form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-num-java.png)

</div>

> **Note:** The Java SDK requires the following phone number format: `{+}{country-code}{area-code}{number}`. For example, `+15556667777`.

<div class="common-image-format">

![Displays the Java SDK's phone factor (SMS or voice) form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-mode-java.png)

</div>

When the user enters their phone number and selects SMS to receive the verification code, capture this information and send it to the [`IDXAuthenticationWrapper.submitPhoneAuthenticator()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java#L398) method.

For example:

```java
ProceedContext proceedContext = Util.getProceedContextFromSession(session);

AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.submitPhoneAuthenticator(proceedContext,
         phone, getFactorFromMethod(session, mode));
```

The Java SDK sends the phone authenticator data to Okta. Otka processes the request and sends an SMS code to the specified phone number. After the SMS code is sent, Okta sends a response to the SDK, which returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` to your app. This status indicates that the user needs to provide the verification code for the phone authenticator.

You need to build a form to capture the user's SMS verification code.



### Step 5: User enters SMS code

...

The Java SDK sends this selection to Okta. Okta sends an SMS code to the user's phone and the Java SDK returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION`. This status indicates that the authentication flow is waiting for an authenticator verification, in this case, an SMS verification code. You need to build a form to capture the code from the user.

<div class="common-image-format">

![Displays the verification code input form for the Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-email-code-java.png)

</div>

> **Note:** The email sent to the user has a **Sign In** link that isn't yet supported. Use the provided code instead. See [Limitations: Passwordless sign-in with magic links](/docs/guides/oie-embedded-sdk-limitations/main/#passwordless-sign-in-with-magic-links).

## Integration steps

### Step 6: Build the phone number entry page

Build the phone number entry page that accepts the phone number that the user will enroll and verify.

<div class="common-image-format">

![Verify phone](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-num.png
 "Verify phone")

</div>

> **Note:** The SDK requires that the phone number follows the `+#######` format, which starts with a plus (+) sign. See [Data Requirements - Phone number](/docs/guides/oie-embedded-sdk-common/aspnet/main/#phone-number).

### Step 7: Call EnrollAuthenticatorAsync to submit phone number and send the SMS

When the user enters a phone number and clicks the send code through the SMS button, a call to `EnrollAuthenticatorAsync` is made that passes in the following values:

* Authenticator ID
* Phone number
* Methodtype (only SMS is currently supported)

> **Note:** Only SMS is currently supported for the phone authenticator type.

The values are passed in through the `EnrollPhoneAuthenticatorOptions` parameter. See the following code snippet for more details.

```csharp
var enrollPhoneAuthenticatorOptions = new EnrollPhoneAuthenticatorOptions
{
     AuthenticatorId = Session["phoneId"].ToString(),
     PhoneNumber = model.PhoneNumber,
     MethodType = model.MethodType,
};

var enrollResponse = await _idxClient.EnrollAuthenticatorAsync(enrollPhoneAuthenticatorOptions, (IIdxContext)Session["IdxContext"]);
```

### Step 8: Handle the response to EnrollAuthenticatorAsync

If the call to `EnrollAuthenticatorAsync` is successful, it should return an `AuthenticationStatus` of `AwaitingAuthenticatorVerification`. When the status is returned, a code is sent to the phone number through SMS.

In the following code snippet, the user is redirected to a reusable code verification page that handles the code for both email and SMS. Your implementation may vary.

```csharp
var enrollResponse = await _idxClient.EnrollAuthenticatorAsync(enrollPhoneAuthenticatorOptions,
    (IIdxContext)Session["IdxContext"]);
    ...
if (enrollResponse.AuthenticationStatus ==
    AuthenticationStatus.AwaitingAuthenticatorVerification)
    {
       return RedirectToAction("VerifyAuthenticator", "Manage");
    }
```

### Step 9: Build or reuse the phone verification code page

Build a page that accepts the code sent to your phone number through SMS. Depending on your implementation, this page can be the same page that verifies the email code or a different page. The sample app reuses the same page for both the email and phone verifications.

<div class="common-image-format">

![Verify phone](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-code.png
 "Verify phone")

</div>

### Step 10: Call VerifyAuthenticatorAsync to verify the phone code

The next step is to call `VerifyAuthenticatorAsync`. For phone verification, the code that is passed into `VerifyAuthenticatorAsync` is the code that was sent by SMS to the phone number.

```csharp
var idxAuthClient = new IdxClient(null);
           var verifyAuthenticatorOptions = new VerifyAuthenticatorOptions
           {
               Code = code,
           };

var authnResponse = await idxAuthClient.VerifyAuthenticatorAsync(verifyAuthenticatorOptions, (IIdxContext)Session["idxContext"]);
```

### Step 11: Handle the response from VerifyAuthenticatorAsync (factor verifications completed)

The next step is to handle the response from `VerifyAuthenticatorAsync`. If the phone SMS code is valid, the method should return an `AuthenticationStatus` of `Success`. This status signifies that no factors (required or optional) are waiting to be enrolled and verified. The user should now be registered with no more factors to be verified and sent to the default page after they have successfully registered. In the sample app, the user is sent to the user profile page.

```csharp
var authnResponse = await _idxClient.VerifyAuthenticatorAsync(verifyAuthenticatorOptions, (IIdxContext)Session["idxContext"]);
Session["idxContext"] = authnResponse.IdxContext;

switch (authnResponse.AuthenticationStatus)
{
   ...
   case AuthenticationStatus.Success:
         ClaimsIdentity identity = await
         AuthenticationHelper.GetIdentityFromTokenResponseAsync(_idxClient.Configuration,
         authnResponse.TokenInfo);
         _authenticationManager.SignIn(new AuthenticationProperties(), identity);
         return RedirectToAction("Index", "Home");
   ...
}
```

### Step 12: Get user profile information (optional)

See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/aspnet/main/#get-user-profile-information-after-sign-in) for more details.
