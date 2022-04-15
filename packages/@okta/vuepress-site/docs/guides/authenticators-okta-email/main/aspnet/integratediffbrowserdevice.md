### 1 - 9. Sign in and get magic link email

First, the user attempts to sign in, initiating the email challenge flow. Next, they click the magic link that redirects them back to your app. These steps are identical to the steps 1 - 9 in [Integrate email challenge with magic links](#integrate-email-challenge-with-magic-links).

### 10. Handle the magic link redirect in your app

Create a callback handler method that takes the `otp` parameters in the query string and passes it as a parameter to the `VerifyAuthenticatorAsync` method on the `IdxClient`. More importantly, use the value of the state parameter to retrieve the current IDX context.

```csharp
IIdxContext idxContext = Session[state] as IIdxContext;
if (idxContext == null)
{
  idxContext = Session["idxContext"] as IIdxContext;
}
```

If your code can't retrieve the context using the state, assume that this is because the user is in a different browser. Advise the user to return to the original tab and enter the OTP value there.

```csharp
  if (idxContext != null)
  {
    // Process magic link
  }

  return View(new MagicLinkCallbackModel { Message = $"Enter the OTP code in the originating client: {otp}" });
}
```

<div class="common-image-format">

![Screenshot of different device or browser error](/img/authenticators/authenticators-email-magic-link-error.png)

</div>
