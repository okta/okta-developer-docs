### 1 - 4: Start flow and display authenticator list

The challenge flow follows the same first four steps as the [enrollment flow](#integrate-sdk-for-authenticator-enrollment):

* Build a sign-in page on the client
* Authenticate the user credentials
* Handle the response from the sign-in flow
* Display a list of possible authenticator factors

### 5: Check Authenticator Status

When the user selects Google Authenticator to authenticate themselves and clicks **Submit**, the application checks whether the user is in challenge flow or in enrollment flow by posting back to `SelectAuthenticatorAsync`.

When in challenge flow, a call is made to `idxClient.SelectChallengeAuthenticatorAsync`, using its `selectAuthenticatorOptions` parameter to pass in the Google Authenticator factor ID.

```csharp
var selectAuthenticatorOptions = new SelectAuthenticatorOptions
{
    AuthenticatorId = model.AuthenticatorId,
};

selectAuthenticatorResponse = await _idxClient.SelectChallengeAuthenticatorAsync(
    selectAuthenticatorOptions, (IIdxContext)Session["IdxContext"]);
```

If the call is successful, the returned `selectAuthenticatorResponse` object has an `AuthenticationStatus` of `AwaitingAuthenticatorVerification`, and the Challenge page should appear.

```csharp
Session["IdxContext"] = selectAuthenticatorResponse.IdxContext;

switch (selectAuthenticatorResponse?.AuthenticationStatus)
{
    case AuthenticationStatus.AwaitingAuthenticatorVerification:
        var action = (model.IsWebAuthnSelected)
            ? "VerifyWebAuthnAuthenticator"
            : "VerifyAuthenticator";
        if (model.IsWebAuthnSelected)
        {
            Session["currentWebAuthnAuthenticator"] =
                selectAuthenticatorResponse.CurrentAuthenticatorEnrollment;
        }
        return RedirectToAction(action, "Manage");

    // other case statements

    default:
        return View("SelectAuthenticator", model);
}

```

### 6: Get one-time passcode from Google Authenticator

The user’s copy of Google Authenticator now displays the time-based one-time passcode for the newly added account which they will enter into a challenge page.

<div class="half">

![A one-time passcode being shown in Google Authenticator](/img/authenticators/authenticators-google-one-time-password.png)

</div>

### 7 - 8: Display challenge page and process passcode

The challenge flow now follows the same final steps as the [Enrollment flow](/docs/guides/authenticators-google-authenticator/aspnet/main/#integrate-sdk-for-authenticator-enrollment):

* Display challenge page
* Process the one-time passcode
