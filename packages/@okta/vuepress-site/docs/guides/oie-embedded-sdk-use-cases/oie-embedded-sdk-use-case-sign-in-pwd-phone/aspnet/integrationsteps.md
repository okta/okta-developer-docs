### Step 1: Build a signin page on the client

Build a sign in page that captures both the user’s name and
password. An example is shown below:

<div class="common-image-format">

![Sign in page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in.png
 "Sign in page")

</div>

### Step 2: Authenticate user credentials

When the user initiates the sign in (for example, Continue button click),
create a `AuthenticationOptions` object and set it’s `Username` and
`Password` properties to the values entered in by the user. Send this
object to the `IdxClient’s AuthenticateAsync` method.

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

### Step 3: Handle the response from the sign in

Assuming the username and password is valid, `AuthenticateAsync` should
return an `AuthenticationStatus` of
`AwaitingChallengeAuthenticatorSelection`. `AwaitingChallengeAuthenticatorSelection`
indicates that there is an additional factor that needs to be verified before
the sign in.  In addition to the status, the `Authenticators` property should
return the **phone** factor.

The user should be redirected to the authenticator list page, that displays
the phone factor as an authenticator to be verified. See the sample code
below for more details.

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

### Step 4: Show phone factor in authenticator list - show phone factor to user

The next step is to show the phone factor in an authenticator list page.
If not already done, this page needs to be built out and display the list
of authenticators from the previous step.  In this case only the **phone**
factor will be displayed. See below for a sample screenshot.

<div class="common-image-format">

![Verify phone](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-in-pwd-phone-screen-verify-phone.png
 "Verify phone")

</div>

### Step 5: Call SelectChallengeAuthenticatorAsync - user selects phone factor

When the user selects the **phone** factor, a call to
`SelectChallengeAuthenticatorAsync` is made that sends a verification code
to the user’s phone via SMS. Note that the method accepts a
`SelectAuthenticatorOptions` parameter which is used to pass in the phone
factor id.

If the call is successful the method should return
`AwaitingAuthenticatorEnrollmentData` which indicates the SDK is
needs a phone number in order to send the verification code.
The next step is to redirect the user to a page to enter in the phone number.

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

### Step 6: Build out phone number entry page - show user phone number entry page

Build out the phone number entry page that accepts the phone number the user will
enroll and verify.

<div class="common-image-format">

![Verify phone](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-num.png
 "Verify phone")

</div>

> ***Note:*** The SDK requires the phone number format needs to be
in the format `+#######` including the beginning plus (+) sign.
[See Data Requirements - Phone number](/docs/guides/oie-embedded-sdk-common/aspnet/main/#phone-number)
for more information.

### Step 7: Call EnrollAuthenticatorAsync to submit phone number and send SMS  - user clicks send code via SMS button

When the user enters their phone number and clicks on the
send code via sms button,  a call to `EnrollAuthenticatorAsync`
is made passing in the following values:

1. Authenticator id
1. Phone number
1. Methodtype (only SMS is currently supported)

> **Note:** Only SMS is currently supported for the phone authenticator type.

The above values are passed in via the `EnrollPhoneAuthenticatorOptions`
parameter. See code snippet below for more details.

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

If the call to `EnrollAuthenticatorAsync` was successful, it
should return an `AuthenticationStatus` of `AwaitingAuthenticatorVerification`.
When `AwaitingAuthenticatorVerification` is returned, a code is sent to
the phone number via SMS.

In the code snippet below, the user is redirected to a reusable code
verification page that handles the code for both email and SMS. Your
implementation may vary.

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

### Step 9: Build out (or reuse) phone verification code page - show user phone verification page

Build out a page that accepts the code sent to your phone number
via SMS. Depending on your implementation, this page can be the
same page that verifies the email code or different. The sample
app reuses the same page for both the email and phone verifications.

<div class="common-image-format">

![Verify phone](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-code.png
 "Verify phone")

</div>

### Step 10: Call VerifyAuthenticatorAsync to verify phone code - user enters code and clicks verify

The next step is to call `VerifyAuthenticatorAsync`. In the case of
the phone verification, the code passed into `VerifyAuthenticatorAsync` will
be the code that was sent via SMS to the phone number.

```csharp
var idxAuthClient = new IdxClient(null);
           var verifyAuthenticatorOptions = new VerifyAuthenticatorOptions
           {
               Code = code,
           };

var authnResponse = await idxAuthClient.VerifyAuthenticatorAsync(verifyAuthenticatorOptions, (IIdxContext)Session["idxContext"]);
```

### Step 11: Handle response from VerifyAuthenticatorAsync - factor verifications completed

The next step is to handle the response from `VerifyAuthenticatorAsync`. If
the phone SMS code was valid, the method should return `AuthenticationStatus`
of `Success`. This status signifies that there are no more factors (required
or optional) waiting to be enrolled and verified. The user should now be
registered with no more factors to be verified and be sent to the default
page after they have successfully registered. In the case of the sample
application, the user is sent to the user profile page.

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

### Step 12: Get user profile information - optional

Optionally, you can obtain basic user information after a successful sign
in by making a request to Okta’s Open ID Connect authorization server.
See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/aspnet/main/#get-user-profile-information-after-sign-in) for more details.
