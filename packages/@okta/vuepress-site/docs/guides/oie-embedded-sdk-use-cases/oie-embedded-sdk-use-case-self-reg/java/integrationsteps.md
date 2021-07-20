## Integration steps

### Step 1: Create a sign-up link for new users

The self-registration flow begins when the user clicks the **Register** link on your app's sign-in page. You need to create an HTML page for the **Register** link to capture new account parameters.

For example, the user to enters their first name, last name, and email in the following Create Account page:

<div class="common-image-format">

![Create user for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-create-java.png
 "Create user for Java SDK")

</div>

### Step 2: Register new user

The next step is to begin the authentication process by calling the [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `begin` method.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();
```

After the authentication transaction begins, you need to get the `ProceedContext`:

```java
ProceedContext beginProceedContext = beginResponse.getProceedContext();

AuthenticationResponse newUserRegistrationResponse = idxAuthenticationWrapper.fetchSignUpFormValues(beginProceedContext);
```

Enroll the user with basic profile information captured from the Create Account page by calling the `register` method.

```java
UserProfile userProfile = new UserProfile();
userProfile.addAttribute("lastName", lastname);
userProfile.addAttribute("firstName", firstname);
userProfile.addAttribute("email", email);

ProceedContext proceedContext = newUserRegistrationResponse.getProceedContext();

AuthenticationResponse authenticationResponse = idxAuthenticationWrapper.register(proceedContext, userProfile);
```

### Step 3: Handle the response from Okta

If you configured your org and app with the [Set up your Okta org for multifactor use cases](/docs/guides/oie-embedded-common-org-setup/java/main/#set-up-your-okta-org-for-multifactor-use-cases) instructions, `IDXAuthenticationWrapper` returns an [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) with the following:

1. [AuthenticationStatus](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java) = `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` <br>
   This status indicates that there are required Authenticators that needs to be verified.

2. [Authenticators](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/Authenticator.java) = List of Authenticators (in this case, there is only the `password` Authenticator). <br>

   ```java
   List<Authenticator> authenticators = (List<Authenticator>) session.getAttribute("authenticators");
   ```

After receiving `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` status and the list of Authenticators, you need to provide the user with the required factors that need to be verified. Build an Authentication list page that is generic to handle different lists returned from the SDK.

<div class="common-image-format">

![Verify password](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-password-java.png
 "Verify password")

</div>

```java
List<String> factorMethods = new ArrayList<>();
for (Authenticator authenticator : response.getAuthenticators()) {
   for (Authenticator.Factor factor : authenticator.getFactors()) {
         factorMethods.add(factor.getMethod());
   }
}
```

### Step 4: Enroll required Authenticator

Pass the user-selected Authenticator (in this case, **Password**) to [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `selectAuthenticator` method.

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

This request returns an [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with  [AuthenticationStatus](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java) = `AWAITING_AUTHENTICATOR_VERIFICATION`. You need to build a form to verify the required **Password** Authenticator.

<div class="common-image-format">

![Confirm password for Java](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-confirm-password-java.png
 "Confirm password for Java")

</div>

### Step 5: Verify Authenticator and display additional factors

After the user enters their new password, call [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `verifyAuthenticator` method with the new password.

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(newPassword);
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

The response from this request is an [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_SELECTION` and `Authenticators` list containing required **email** and optional **phone**. Reuse the Authentication list page from [Step 3: Handle the response from Okta](#step-3-handle-the-response-from-okta) to display the list of factors to the user.

<div class="common-image-format">

![Authenticator list for Java](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-auth-list-email-phone-java.png
 "Authenticator List for Java")

</div>

> **Note:** In the previous Authenticator list page, you can implement a **Skip** option for optional Authenticators. However, since **email** is required, this example did not implement a **Skip** option.

### Step 6: User selects email Authenticator for verification

In this use case, the user selects **Email** to verify the Authenticator. Pass this user-selected Authenticator to [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `selectAuthenticator` method. If this request is successful, a code is sent to the user's email and `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` is returned. You need to build a form to verify the email code.

<div class="common-image-format">

![Authenticator email verify for Java](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-email-code-java.png
 "Authenticator email verify for Java")

</div>

> **Note:** The email sent to the user has a **Verify Email Address** link that isn't yet
supported. Accordingly, there are two recommended options to mitigate this limitation.
See
[Email verify email link does not work](/docs/guides/oie-embedded-sdk-limitations/main/#email-link-to-verify-email-address-not-working).

When the user submits their email code, send the code to [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `verifyAuthenticator` method:

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(code);

AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```
---

The `AwaitingAuthenticatorEnrollment` status is returned because the required **email** and optional **phone** factors await to be enrolled and verified.

> **Note:** The email sent to the user has a **Verify Email Address** link that isn't yet
supported. Accordingly, there are two recommended options to mitigate this limitation.
See
[Email verify email link does not work](/docs/guides/oie-embedded-sdk-limitations/main/#email-link-to-verify-email-address-not-working).


The code snippet below shows how the response is handled. `AwaitingAuthenticatorEnrollment` identifies that there are additional factors (in this use case, email and optionally phone). The Authenticator list page is loaded again (the first time was for password) with the two additional
factors.

```csharp
switch (authnResponse.AuthenticationStatus)
   {
       ...
       case AuthenticationStatus.AwaitingAuthenticatorEnrollment:
           TempData["authenticators"] =
              ViewModelHelper.ConvertToAuthenticatorViewModelList(authnResponse.Authenticators);
              TempData["canSkip"] = authnResponse.CanSkip;
            return RedirectToAction("SelectAuthenticator", "Manage");
...
```

> **Note** The `CanSkip` property in the code sample above is used for optional factors. See the SDK sample for more information.

### Step 11: Call EnrollAuthenticatorAsync to verify the email authenticator

If the user selects the **email** authenticator, a call to `EnrollAuthenticatorAsync` is made and passes in the **email** `AuthenticatorId`. If successful, this call should send a code to the user's email.

```csharp
var enrollAuthenticatorOptions = new EnrollAuthenticatorOptions
{
     AuthenticatorId = model.AuthenticatorId,
};

var enrollResponse = await idxAuthClient.EnrollAuthenticatorAsync(enrollAuthenticatorOptions, (IIdxContext)Session["IdxContext"]);
```

> **Note:** The email sent to the user has a **Verify Email Address** link that isn't yet
supported. Accordingly, there are two recommended options to mitigate this limitation.
See
[Email verify email link does not work](/docs/guides/oie-embedded-sdk-limitations/main/#email-link-to-verify-email-address-not-working).

### Step 13: Handle the response to EnrollAuthenticatorAsync

If the call to `EnrollAuthenticatorAsync` was successful, it should return an `AuthenticationStatus` of `AwaitingAuthenticatorVerification`. When `AwaitingAuthenticatorVerification` is returned, a code is sent to the user's email, and the user needs to verify this code.

The following sample app code snippet shows that the user is redirected to the **Verify Authenticator** page to verify that the code was sent in the email.

```csharp
var enrollResponse = await idxAuthClient.EnrollAuthenticatorAsync(enrollAuthenticatorOptions, (IIdxContext)Session["IdxContext"]);

switch (enrollResponse?.AuthenticationStatus)
{
   case AuthenticationStatus.AwaitingAuthenticatorVerification:
        return RedirectToAction("VerifyAuthenticator", "Manage");
...
}
```

### Step 14: Build the email verification code page

Build the email verification code page that accepts the code from the email.

<div class="common-image-format">

![Authenticator list](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-email-code.png
 "Authenticator List")

</div>

### Step 15: Call VerifyAuthenticatorAsync to verify email code

The next step is to call `VerifyAuthenticatorAsync`. In the email verification, the code that is passed into `VerifyAuthenticatorAsync` is the code found in the verification email.

```csharp
var idxAuthClient = new IdxClient(null);
           var verifyAuthenticatorOptions = new VerifyAuthenticatorOptions
           {
               Code = code,
           };

var authnResponse = await idxAuthClient.VerifyAuthenticatorAsync(verifyAuthenticatorOptions, (IIdxContext)Session["idxContext"]);
```

### Step 16: Handle response from VerifyAuthenticatorAsync

The next step is to handle the response from `VerifyAuthenticatorAsync`. If the email code was valid, the method should return `AuthenticationStatus` of `AwaitingAuthenticatorEnrollment`. This status signifies that there is another factor (required or optional) waiting to be enrolled and verified. If the steps described in [Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multifactor-use-cases) were properly followed, the user should be sent back to the Authenticator list page that shows only the **phone** authenticator.

```csharp
var authnResponse = await _idxClient.VerifyAuthenticatorAsync(verifyAuthenticatorOptions,
     (IIdxContext)Session["idxContext"]);
Session["idxContext"] = authnResponse.IdxContext;

switch (authnResponse.AuthenticationStatus)
      {
          case AuthenticationStatus.AwaitingAuthenticatorEnrollment:
               TempData["authenticators"] =
               ViewModelHelper.ConvertToAuthenticatorViewModelList
               (authnResponse.Authenticators);
               TempData["canSkip"] = authnResponse.CanSkip;
               return RedirectToAction("SelectAuthenticator", "Manage");
           ...
      }
```

### Step 17: Show the remaining list of authenticators

The remaining authenticator should display the phone factor to the user. Since this factor is currently optional and no other required factors need to be verified, the user should have the ability to skip the factor. Create a **Skip** button for this use case. This **Skip** button is governed by the `CanSkip` property on the `AuthenticationResponse`. See the following screenshot for an illustration.

<div class="common-image-format">

![Phone list](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-auth-list-phone.png
 "Phone List")

</div>

The user can either enroll in the phone factor or skip the phone factor. Your code should handle both scenarios that will be described in the following steps.

### Step 18a, Option 1, Enroll and verify the phone authenticator

If the user selects the phone authenticator (instead of skipping it), the steps to enroll and verify are similar to the email factor verification flow in this section with subtle differences.

### Step 18b: Option 1: Call EnrollAuthenticatorAsync (1st time) to start phone verification

If the user selects the **phone** authenticator, a call to `EnrollAuthenticatorAsync` is made passing in the **phone** `AuthenticatorId`. If successful, the method should return an `AwaitingAuthenticatorEnrollmentData` response. The `AwaitingAuthenticatorEnrollmentData `response indicates that the enrollment data is required before continuing to verification. 

In the use case to verify the phone authenticator, the phone number is required, and the user should be redirected to a page where they can enter in a phone number. See the following code snippet from the sample app.

```csharp
var enrollResponse = await _idxClient.EnrollAuthenticatorAsync(enrollAuthenticatorOptions,
     (IIdxContext)Session["IdxContext"]);
...

switch (enrollResponse?.AuthenticationStatus)
     {
          ...
          case AuthenticationStatus.AwaitingAuthenticatorEnrollmentData:
               return RedirectToAction("EnrollPhoneAuthenticator", "Manage");
          ...
      }
```

### Step 18c, Option 1: Build the phone number entry page

Build the phone number entry page that accepts the phone number. The user uses the phone number entry page to enroll and verify.

<div class="common-image-format">

![Verify phone](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-num.png
 "Verify phone")

</div>

> **Note:** The SDK requires that the phone number be in the following format: `+#######`, including the beginning plus (+) sign. See [Data Requirements - Phone number](/docs/guides/oie-embedded-sdk-common/aspnet/main/#phone-number).

### Step 18d, Option 1: Call EnrollAuthenticatorAsync (2nd time) to submit the phone number and send SMS

When the user enters their phone number and clicks the send code using the SMS button, a call to `EnrollAuthenticatorAsync` is made and passes the following values:

* Authenticator ID
* Phone number
* Method type (only SMS is currently supported)

> **Note:** Only SMS is currently supported for the phone authenticator type.

The above values are passed using the `EnrollPhoneAuthenticatorOptions` parameter. See the following code snippet for more details.

```csharp
 var enrollPhoneAuthenticatorOptions = new EnrollPhoneAuthenticatorOptions
     {
        AuthenticatorId = Session["phoneId"].ToString(),
        PhoneNumber = model.PhoneNumber,
        MethodType = AuthenticatorMethodType.Sms,
     };

var enrollResponse = await _idxClient.EnrollAuthenticatorAsync(enrollPhoneAuthenticatorOptions,
      (IIdxContext)Session["IdxContext"]);
      Session["IdxContext"] = enrollResponse.IdxContext;
```

### Step 18e, Option 1: Handle the response to EnrollAuthenticatorAsync

If the call to `EnrollAuthenticatorAsync` is successful, it should return an `AuthenticationStatus` of `AwaitingAuthenticatorVerification`. When `AwaitingAuthenticatorVerification` is returned, a code is sent to the phone number through SMS.

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

### Step 18f, Option 1: Build or reuse a phone verification code page

Build a page that accepts the code sent to your phone number through SMS. Depending on your implementation, the page can be the same page that verifies the email code or different. The sample app reuses the same page for both email and phone verification.

<div class="common-image-format">

![Enter code from phone](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-code.png
 "Enter code from phone")

</div>

### Step 18g, Option 1: Call VerifyAuthenticatorAsync to verify phone code

After the user enters the phone code and clicks verify, a call is made to `VerifyAuthenticatorAsync`. In the phone verification use case, the code that passes into `VerifyAuthenticatorAsync` is the code that was sent through SMS to the phone number.

T)

```csharp
var idxAuthClient = new IdxClient(null);
           var verifyAuthenticatorOptions = new VerifyAuthenticatorOptions
           {
               Code = code,
           };

var authnResponse = await idxAuthClient.VerifyAuthenticatorAsync(verifyAuthenticatorOptions, (IIdxContext)Session["idxContext"]);
```

### Step 18h: Option 1, Handle response from VerifyAuthenticatorAsync

The next step is to handle the response from `VerifyAuthenticatorAsync`. If the phone SMS code was valid, the method should return an `AuthenticationStatus` of `Success`. This status signifies that no more factors (required or optional) are waiting to be enrolled and verified. 

If the steps described in[Set up your Okta org (for multifactor use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multi-factor-use-cases) were properly followed, the user should now be registered with no more factors to be verified. The user should then be sent to the default page after they have successfully registered. In the sample application, the user is sent to the user profile page.

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

### Step 19, Option 2: Call SkipAuthenticatorSelectionAsync

If the user opts to skip phone enrollment, a call to `SkipAuthenticatorSelectionAsync` needs to be made. This method skips phone enrollment and eliminates the need to verify the factor. See the following code snippet for more details.

```csharp
var skipSelectionResponse = await _idxClient.SkipAuthenticatorSelectionAsync((IIdxContext)Session["IdxContext"]);
switch (skipSelectionResponse.AuthenticationStatus)
    {
         case AuthenticationStatus.Success:
              ClaimsIdentity identity = await
              AuthenticationHelper.GetIdentityFromTokenResponseAsync(_idxClient.Configuration,
              skipSelectionResponse.TokenInfo);
              _authenticationManager.SignIn(new AuthenticationProperties(), identity);
              return RedirectToAction("Index", "Home");
         case AuthenticationStatus.Terminal:
              TempData["MessageToUser"] = skipSelectionResponse.MessageToUser;
              return RedirectToAction("Login", "Account");
   }
```

The method `SkipAuthenticatorSelectionAsync` can return these different response statuses: `Success` or `Terminal`. For a `Success` status, the user is signed in, the response is stored in session, and the user is redirected to the default sign-in page. In the csample app, the default sign-in page is the user profile page.

### Step 20: User is sent to the user profile page

After the factor verifications are successful and there're no more authenticators to enroll and verify, the user is now successfully registered and can be sent to the default sign-in page. In the sample app, the default sign-in page is the user profile page. See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/aspnet/main/#getuserprofileinfo) for more details on how to fetch user information.

### Troubleshooting Tips

When you test this use case, ensure that you use a new email for each time. If you have a gmail account, you can reuse the same email by adding a plus (+) and additional text (for example, `myemail+1@gmail.com`, `myemail+2@gmail.com`, and so on). Ensure that the password that you use meets the minimum security requirements. For example, passwords such as `test123` fail.
