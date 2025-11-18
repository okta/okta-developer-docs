#### Learning outcomes

* Implement a reliable, user-initiated sign-out flow.
* End the Okta browser session (SSO cookies) if your app uses a browser-based sign-in flow.

#### What you need

* An app that uses the [Okta Mobile Swift SDK](https://github.com/okta/okta-mobile-swift)
* One of the following combinations:
  * Redirect sign-in flow: [AuthFoundation](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/) and [BrowserSignin](https://okta.github.io/okta-mobile-swift/development/documentation/browsersignin/)
  * Direct password-in-app sign-in flow: [AuthFoundation](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/) and [OktaDirectAuth](https://okta.github.io/okta-mobile-swift/development/documentation/oktadirectauth/)
