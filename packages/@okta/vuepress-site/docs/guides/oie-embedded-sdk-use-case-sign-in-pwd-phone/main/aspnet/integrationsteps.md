### 1: Build a sign-in page on the client

Build a sign-in page that captures the user's name and password, similar to the following wireframe.

<div class="half wireframe-border">

![Sign-in form with a 'Forgot your password?' link](/img/oie-embedded-sdk/wireframes/pwd-optional-sign-up-link-sign-in-page-g2r2.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 2

-->

### 2: Authenticate the user credentials

When the user initiates the sign-in flow (for example, by clicking the **Continue** button),
create an `AuthenticationOptions` object and set its `Username` and `Password` properties to the values entered in by the user. Send this object to the  `AuthenticateAsync` method for the `IdxClient`.

```csharp
 var idxAuthClient = new IdxClient();
 var authnOptions = new Okta.Idx.Sdk.AuthenticationOptions()
      {
          Username = model.UserName,
          Password = model.Password,
      };

var authnResponse = await idxAuthClient.AuthenticateAsync(authnOptions).ConfigureAwait
(false);
```

### 3: Handle the response from the sign-in flow

If the username and password are valid, `AuthenticateAsync` should return an `AuthenticationStatus` of `AwaitingChallengeAuthenticatorSelection`. This status indicates that there is an additional factor that needs to be verified before the sign-in. In addition to the status, the `Authenticators` property should return the phone factor.

The user should be redirected to the authenticator list page that displays
the phone factor as an authenticator to be verified. See the following sample code for more details.

```csharp
var authnResponse = await _idxClient.AuthenticateAsync(authnOptions).ConfigureAwait(false);
Session["idxContext"] = authnResponse.IdxContext;

switch (authnResponse?.AuthenticationStatus)
     {
         ...
         case AuthenticationStatus.AwaitingChallengeAuthenticatorSelection:
              Session["authenticators"] =
              ViewModelHelper.ConvertToAuthenticatorViewModelList(authnResponse.Authenticators);
              Session["isChallengeFlow"] = true;
              return RedirectToAction("SelectAuthenticator", "Manage");
```

### 4: Show the phone factor in the authenticator list

The next step is to show the phone factor in an authenticator list page. Build a page to display the list of authenticators from the previous step. In this use case, only the phone factor appears, similar to the following wireframe.

<div class="half wireframe-border">

![Choose authenticator form with phone option](/img/oie-embedded-sdk/wireframes/choose-authenticator-phone-form-g3r18.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 3, row 18

-->

### 5: Select the phone factor by calling the SelectChallengeAuthenticatorAsync method

When the user selects the **Phone** factor, a call to `SelectChallengeAuthenticatorAsync` is made that sends a verification code to the user's phone through SMS. This method accepts the `SelectAuthenticatorOptions` parameter that is used to pass in the phone factor ID.

If the call is successful, the method returns the `AwaitingAuthenticatorEnrollmentData` status that indicates that the SDK needs a phone number to send the verification code. The next step is to redirect the user to a page to enter the phone number.

```csharp
var enrollResponse = await _idxClient.SelectEnrollAuthenticatorAsync(enrollAuthenticatorOptions, (IIdxContext)Session["IdxContext"]);

Session["IdxContext"] = enrollResponse.IdxContext;
Session["isPasswordSelected"] = model.IsPasswordSelected;

switch (enrollResponse?.AuthenticationStatus)
      {
            ...
            case AuthenticationStatus.AwaitingAuthenticatorEnrollmentData:
                 Session["methodTypes"] = enrollResponse.CurrentAuthenticator.MethodTypes;
                 return RedirectToAction("EnrollPhoneAuthenticator", "Manage");
```

### 6: Build the phone number entry page

Build the phone number entry page that accepts the phone number that the user will enroll and verify.

<div class="half wireframe-border">

![Phone number entry form](/img/oie-embedded-sdk/wireframes/auth-enter-phone-number-form-g2r32.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 32

-->

> **Note:** The SDK requires that the phone number be in the following format: `+##########`, including the beginning plus (+) sign, for example, `+5551234567`.

### 7: Call the EnrollAuthenticatorAsync method to submit the phone number and send the SMS

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

### 8: Handle the response from the EnrollAuthenticatorAsync method

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

### 9: Build or reuse the phone verification code page

Build a page that accepts the code sent to your phone number through SMS. Depending on your implementation, this page can be the same page that verifies the email code or a different page. The sample app reuses the same page for both the email and phone verifications.

<div class="half wireframe-border">

![Phone number entry form](/img/oie-embedded-sdk/wireframes/sms-enter-verification-code-form-g2r42.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 42

-->

### 10: Call the VerifyAuthenticatorAsync method to verify the phone code

The next step is to call `VerifyAuthenticatorAsync`. For phone verification, the code that is passed into `VerifyAuthenticatorAsync` is the code that was sent by SMS to the phone number.

```csharp
var idxAuthClient = new IdxClient(null);
           var verifyAuthenticatorOptions = new VerifyAuthenticatorOptions
           {
               Code = code,
           };

var authnResponse = await idxAuthClient.VerifyAuthenticatorAsync(verifyAuthenticatorOptions, (IIdxContext)Session["idxContext"]);
```

### 11: Handle the response from the VerifyAuthenticatorAsync method (factor verifications completed)

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

### 12 (Optional): Get the user profile information

Optionally, you can obtain basic user information after the user successfully signs
in by making a request to Okta's Open ID Connect authorization server. See [Get the user profile information](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/aspnet/main/#get-the-user-profile-information) for more details.
