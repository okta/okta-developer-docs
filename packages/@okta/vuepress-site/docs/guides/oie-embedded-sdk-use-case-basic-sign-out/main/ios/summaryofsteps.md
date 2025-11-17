You can sign a user out of your app by revoking their tokens or deleting their credentials. See [Implement token cleanup](#implement-token-cleanup).

Also, if you have an active Okta browser session, you need to end the session. See [End the Okta browser session](#end-the-okta-browser-session-optional).

### Best practices and considerations

* **Do both when applicable:** Local token cleanup and browser end-session are separate concerns. Handle both for a complete sign-out.
* **Revoke before remove:** Always attempt `revoke()` before `remove()`. If the revoke fails, you should still still remove the token to ensure that sign out occurs.
* **Multiple accounts:** If your app supports multiple profiles/tenants, iterate over all credentials during sign-out.
* **Logout redirect URI:** If you call browser sign-out, ensure that `logout_redirect_uri` is configured in `Okta.plist` and your URL scheme handler is implemented.
* **Handle errors gracefully:** Network errors can occur when revoking tokens. Consider falling back to local deletion if revocation fails.
* **Clear app state:** After signing out, ensure you clear any cached user data and reset your app's UI state.
* **Background operations:** Token revocation is an async operation. Ensure that you handle it appropriately in your UI flow to avoid blocking the user experience.
