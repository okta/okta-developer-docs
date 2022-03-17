### 1. Initiate sign and start magic link flow

First, the user initiates the sign-in and email challenge flow. Next, they click on the magic link, which redirects them back to your app. Your app validates that the `otp` and `state` parameters are included in the URL. The steps are identical to the first steps in [Integrate email challenge with magic links](#integrate-email-challenge-with-magic-links).


### 2. Verify the email and location of magic link click

Next call `OktaAuth.idx.handleEmailVerifyCallback()` passing in the query parameter containing the OTP and state (for example, `?state=8bae50c6e5a973e954b4ac7cd4d1a744&otp=482039`). This method performs the following checks:

* Ensures that the user clicked the magic link in the same browser (but different tab) as your application.
* Validates that the `otp` and `state` parameters originate from a nonexpired verification email


```javascript
  try {
      const transaction = await authClient.idx.handleEmailVerifyCallback(search);
      handleTransaction({ req, res, next, authClient, transaction });
  } catch (err) {
    next(err);
  }

```

#### 3: Handle error and inform user to use OTP on original tab

`OktaAuth.idx.handleEmailVerifyCallback()` throws a `EmailVerifyCallbackError` error if the user clicked on the magic link in a different browser or device. Handle the error and inform the user to enter the OTP on the original tab.

<div class="common-image-format">

![Screenshot of different device or browser error](/img/authenticators/authenticators-email-magic-link-error.png)

</div>
