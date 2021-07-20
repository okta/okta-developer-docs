## Integration steps

### Step 1: Register new users

The self-registration flow begins when the user clicks the **Register** link on your app's sign-in page. You need to create a form for the **Register** link to capture new account parameters.

For example, the user to enters their first name, last name, and email in the following Create Account page:

<div class="common-image-format">

![Create user for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-create-java.png
 "Create Account sample form  for Java SDK")

</div>

### Step 2: User enters profile data

Begin the authentication process by calling the [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `begin` method.

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

### Step 3: Display enrollment factors

If you configured your org and app with instructions from [Set up your Okta org for multifactor use cases](/docs/guides/oie-embedded-common-org-setup/java/main/#set-up-your-okta-org-for-multifactor-use-cases), your app is configured with **Password** authentication, and additional **Email** or **Phone** factors. This step contains the request to enroll a password authenticator.

After the initial register request, `IDXAuthenticationWrapper` returns an [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) with the following:

1. [AuthenticationStatus](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java) = `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` <br>
   This status indicates that there are required authenticators that needs to be verified.

2. [Authenticators](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/Authenticator.java) = List of authenticators (in this case, there is only the password authenticator). <br>

   ```java
   List<Authenticator> authenticators = (List<Authenticator>) session.getAttribute("authenticators");
   ```

After receiving `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` status and the list of authenticators, provide the user with a form to verify the required authenticators. You need to build a generic authenticator enrollment form to handle single or multiple authenticators returned from the SDK.

<div class="common-image-format">

![Enroll password form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-password-java.png "Enroll password authenticator form for Java SDK")

</div>

```java
public ModelAndView selectAuthenticatorForm(AuthenticationResponse response, String title, HttpSession session) {
   boolean canSkip = authenticationWrapper.isSkipAuthenticatorPresent(response.getProceedContext());
   ModelAndView modelAndView = new ModelAndView("select-authenticator");
   modelAndView.addObject("canSkip", canSkip);
   List<String> factorMethods = new ArrayList<>();
   for (Authenticator authenticator : response.getAuthenticators()) {
      for (Authenticator.Factor factor : authenticator.getFactors()) {
            factorMethods.add(factor.getMethod());
      }
   }
   session.setAttribute("authenticators", response.getAuthenticators());
   modelAndView.addObject("factorList", factorMethods);
   modelAndView.addObject("authenticators", response.getAuthenticators());
   modelAndView.addObject("title", title);
   return modelAndView;
}
```

### Step 4: Enroll required authenticator

Pass the user-selected authenticator (in this case, the password authenticator) to [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `selectAuthenticator` method.

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

This request returns an [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with  [AuthenticationStatus](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java) = `AWAITING_AUTHENTICATOR_VERIFICATION`. You need to build a form for the user to enter their password in this authenticator verification step.

<div class="common-image-format">

![Confirm password for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-confirm-password-java.png "Verify password authenticator data sample form for Java SDK")

</div>

### Step 5: Verify authenticator and display additional factors

After the user enters their new password, call [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `verifyAuthenticator` method with the new password.

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(newPassword);
AuthenticationResponse authenticationResponse = idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

The response from this request is an [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` and an `Authenticators` list containing email and phone factors. Reuse the authentication enrollment form from [Step 3: Display enrollment factors](#step-3-display-enrollment-factors) to display the list of factors to the user.

<div class="common-image-format">

![Authenticator list for Java](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-auth-list-email-phone-java.png "Authenticator List for Java SDK")

</div>

### Step 6: User selects email authenticator

In this use case, the user selects the **Email** factor as the authenticator to verify. Pass this user-selected authenticator to [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `selectAuthenticator` method.

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

If this request is successful, a code is sent to the user's email and `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` is returned.

You need to build a form to capture the the verification code.

<div class="common-image-format">

![Authenticator email verify for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-email-code-java.png "Verify code sample form - email authenticator verify option for Java SDK")

</div>

> **Note:** The email sent to the user has a **Verify Email Address** link that isn't yet supported. There are two recommended options to mitigate this limitation. See [Email verify email link does not work](/docs/guides/oie-embedded-sdk-limitations/main/#email-link-to-verify-email-address-not-working) for details.

### Step 7: User submits email verification code

The user receives the verification code in their email and submits it in the verify code form. Use [VerifyAuthenticationOptions](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/VerifyAuthenticatorOptions.java) to capture the code and send it to [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `verifyAuthenticator` method:

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(code);
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

If the request to verify the code is successful, the SDK returns an [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` and an `Authenticators` list containing the phone factor. Reuse the authentication enrollment form from [Step 3: Display enrollment factors](#step-3-display-enrollment-factors) to display the list of factors to the user.

```java
public ModelAndView selectAuthenticatorForm(AuthenticationResponse response, String title, HttpSession session) {
   boolean canSkip = authenticationWrapper.isSkipAuthenticatorPresent(response.getProceedContext());
   ModelAndView modelAndView = new ModelAndView("select-authenticator");
   modelAndView.addObject("canSkip", canSkip);
   List<String> factorMethods = new ArrayList<>();
   for (Authenticator authenticator : response.getAuthenticators()) {
      for (Authenticator.Factor factor : authenticator.getFactors()) {
            factorMethods.add(factor.getMethod());
      }
   }
   session.setAttribute("authenticators", response.getAuthenticators());
   modelAndView.addObject("factorList", factorMethods);
   modelAndView.addObject("authenticators", response.getAuthenticators());
   modelAndView.addObject("title", title);
   return modelAndView;
}
```

Based on the configuration described in [Set up your Okta org for multifactor use cases)](/docs/guides/oie-embedded-common-org-setup/java/main/#set-up-your-okta-org-for-multifactor-use-cases), the app in this use case is set up to require one possession factor (either email or phone). After the email factor is verified, the phone factor becomes optional. In this step, the `isSkipAuthenticatorPresent` function returns `TRUE` for the phone authenticator. You can build a **Skip** button in your form to allow the user to skip the optional phone factor. If the user decides to skip the optional factor, they are authenticated since they have already verified the required factors. See [Skip optional remaining factors](#skip-optional-remaining-factors) for details.

<div class="common-image-format">

![Enroll phone form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-auth-list-phone-java.png
 "Enroll phone authenticator form for Java SDK")

</div>

---
### Step 8: User selects phone authenticator

In this use case option, the user selects the optional **Phone** factor as the authenticator to verify. Pass this selected authenticator to [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `selectAuthenticator` method.

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

The response from this request is an [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_DATA`. This status indicates that the user needs to provide additional authenticator information. In the case of the phone authenticator, the user needs to specify a phone number.

You need to build a form to capture the user's phone number.

<div class="common-image-format">

![Enroll phone number](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-num-java.png
 "Enroll phone number authenticator form for Java SDK")

</div>

> **Note:** The Java SDK requires the following phone number format: `{+}{country-code}{area-code}{number}`. For example, `+15556667777`.

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
