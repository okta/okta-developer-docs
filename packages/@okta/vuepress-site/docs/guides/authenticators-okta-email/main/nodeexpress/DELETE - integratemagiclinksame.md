### 1. Initiate sign-in and send email

For this example, the user signs in and initiates the email[challenge]() flow. During sign-in Okta send san email to the user's address to verify their identity.

### 2. Click on email magic link

Next, the user opens their email and clicks on the magic link. The following screenshots shows the magic link for the email enrollment and challenge.

<div class="common-image-format">

![Magic link in email](/img/authenticators/authenticators-email-magic-link-in-email.png)

</div>

The link is points to your Okta org as in: `https://yourorg.okta.com/email/verify/0oai9ifvveyL3QZ8K696?token=ftr2eAgsg...`

### 3. Send request to Okta

When the user clicks on the magic link, the request is first routed to you Okta org, which forwards the request to your application including the `OTP` and `state` parameters. The org uses the `Callback URI` you defined in [Update configuraitons](#update-configurations) to build the URL path and adds the OTP and state query parameters. An example callback URL: `http://localhost:8080/login/callback?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32`

### 4: Handle redirect in your app

Create a route to handle When the magic link redirect request.

```javascript
router.get('/login/callback', async (req, res, next) => {
  const { protocol, originalUrl } = req;
  const parsedUrl = new URL(protocol + '://' + req.get('host') + originalUrl);
});

```

### 5. Validate request is from a verification email

Call `OktaAuth.idx.isEmailVerifyCallback()` passing in the query parmaeter section of the URL. This method validates that the OTP and state query parameters are present. `?state=8bae50c6e5a973e954b4ac7cd4d1a744&otp=482039` is an example of the method's input parmaeter.

```javascript
    if (authClient.idx.isEmailVerifyCallback(search)) {
      //continue
    }
```

### 6. Verify the email and location of magic link click

Next call `OktaAuth.idx.handleEmailVerifyCallback()` passing in the query paramter containing the OTP and state (for example, `?state=8bae50c6e5a973e954b4ac7cd4d1a744&otp=482039`). This method performs the following checks:

* Ensures that the user clicked the magic link in the same browser (but different tab) as your application.
* Validates that the OTP and state parameters originate from a non expired verification email


```javascript
  try {
      const transaction = await authClient.idx.handleEmailVerifyCallback(search);
      handleTransaction({ req, res, next, authClient, transaction });
  } catch (err) {
    next(err);
  }

```

### 7: Complete successful sign-in

If your configuration is setup with only the email authenticator, `IdxTransaction` returns a status of `SUCCESS` along with access and ID tokens. Your app redirects the user to the default home page for the signed in user.

```json
{
  status: "SUCCESS",
  tokens: {
    accessToken: {
      accessToken: "eyJraWQiOiJTajV3...",
      },
      expiresAt: 1646673230,
    },
    idToken: {
      idToken: "eyJraWQiOiJTajV3cUUwO...",
      expiresAt: 1646673230,
    },
  }
}

```
