#### 1. Initiate sign-in flow and return a list of authenticators

The user signs in with a username and password, and then chooses Okta Verify from a list of authenticators. This is covered in the earlier [Shared Code](#initiate-sign-in-flow-and-return-a-list-of-authenticators) section.

#### 2. Prompt user to use Okta Verify and start polling

Instruct Okta to send a push request to the user.

```java
case AWAITING_AUTHENTICATOR_SELECTION:
  Authenticator authenticator = selectAuthenticator(authenticationResponse);
  idxAuthenticationWrapper.selectAuthenticator(proceedContext,  authenticator);
```

The next response status will be `AWAITING_CHALLENGE_POLL` and should be handled using the common polling logic in the [Polling Okta](#polling-okta) section.

#### 3. Click prompt and complete challenge

The user opens Okta Verify on their device and clicks **Yes it's me** to complete the challenge and finish authenticating themselves.

#### 4. Exit Polling

The next polling request returns a status of `SUCCESS` along with access and ID tokens. The user is now authenticated.
