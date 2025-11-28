The SDK's token management system is built on a few key components that work together to provide a seamless and secure developer experience.

* `Credential`: This is the main convenience class for interacting with tokens. It acts as a runtime wrapper for a `Token` object, exposing simplified methods for the entire token lifecycle. Each `Credential` instance is uniquely tied to a corresponding `Token`.
* `Token`: An immutable data object that represents the full set of OAuth 2.0 tokens (access token, refresh token, ID token) that your app receives from the authorization server. This object persists across app launches to keep your user signed in.
