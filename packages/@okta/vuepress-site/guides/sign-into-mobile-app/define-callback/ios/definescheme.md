Open `Info.plist` in your application bundle and define a **URL Scheme** for your app, like: `com.okta.example`

This defines your **redirect scheme**. Add `:/callback` to the scheme to get the full redirect URI (like `com.okta.example:/callback`), which you'll need in the following steps.
