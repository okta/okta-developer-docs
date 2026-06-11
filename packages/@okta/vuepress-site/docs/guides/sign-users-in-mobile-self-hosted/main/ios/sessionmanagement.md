One of the key features of this implementation is automatic session restoration. When users close and reopen the app, they remain signed in because of the following lines in `AuthService`:

```swift
.init() {
    // ... initialization code ...

    // Check for existing credential
    if Credential.default?.token != nil {
        authenticationState = .authenticated
    }
}
```

The `AuthFoundation` library stores tokens securely in the iOS keychain, which persists across app launches. This creates a seamless experience while maintaining security.

#### Understand the authentication flow

The authenticate method orchestrates the entire sign-in process:

1️⃣ Update state to show authentication is in progress.

`authenticationState = .authenticating`

This immediately updates the UI to show a loading indicator, providing instant feedback to the user that their sign-in attempt is being processed.

2️⃣ Send credentials to Okta using direct authentication.

`let response = try await directAuth.start(username, with: .password(password))`

This line does the heavy lifting. It sends the username and password to the Okta DirectAuth API endpoint. The `await` keyword means this is an asynchronous call. The app waits for the response from Okta without blocking the UI thread.

3️⃣ Process the authentication response.

Okta returns a response that can be one of several types. For password-only authentication, Okta primarily cares about the success case.

4️⃣ Store credential securely in the keychain.

```swift
case .success(let token):
    let credential = try Credential.store(token)
    Credential.default = credential
    authenticationState = .authenticated
```

When authentication succeeds, Okta returns a `Token` object that contains the following tokens:

* **Access token**: Used to authorize API requests
* **ID token**: Contains user identity information
* **Refresh token**: Used to obtain new access tokens without re-authentication

The `Credential.store(token)` method securely persists these tokens in the iOS keychain using the `AuthFoundation` library. Setting `Credential.default` makes this the active credential for the current session.

5️⃣ Handle unexpected responses.

```swift
default:
    authenticationState = .error("Authentication failed")
```

If you receive a response type you don't handle (like an MFA challenge when MFA isn't configured), treat it as an error.

6️⃣ Handle errors and update state.

```swift
catch {
    authenticationState = .error(error.localizedDescription)
    throw error
}
```

Any network errors, invalid credentials, or other issues are caught here. Update the state so the UI can show an error message, and re-throw the error so calling code can also handle it if needed.

#### Understand the log-out process

The `logout` method ensures a complete and secure log-out flow:

```swift
    1️⃣ Revoke tokens on the Okta server
    if let credential = Credential.default {
        try? await credential.revoke()
}
```

This tells Okta to invalidate the current tokens. Even if someone somehow obtained a copy of the tokens, they can no longer be used after revocation. Use `try?` because you want the log-out flow to succeed locally even if the network call fails.

2️⃣ Clear local credential from the keychain.

`Credential.default = nil`

This removes the stored tokens from the device's keychain, ensuring that no sensitive data remains locally.

3️⃣ Reset the authentication state.

`authenticationState = .notAuthenticated`

This updates the UI to show the sign-in screen again.

#### Understand token refresh

Access tokens have a limited lifetime (typically one hour) for security. Rather than forcing users to sign in again, use the refresh token:

1️⃣ Verify that a credential exists.

```swift
    guard let credential = Credential.default else {
        throw NSError(...)
}
```

You can't refresh if there's no stored credential. This guard ensures that you have a credential before attempting refresh.

2️⃣ Exchange the refresh token for a new access token.

```swift
try await credential.refresh()
```

This method automatically performs the following actions:

* Sends the refresh token to Okta
* Receives a new access token (and potentially a new refresh token)
* Updates the stored credential in the keychain

All of these actions occur without requiring the user to re-enter their password.

#### Understand user profile retrieval

The `getCurrentUser` method fetches user profile information from Okta:

1️⃣ Return cached user info if available

```swift
if let userInfo = Credential.default?.userInfo {
    return userInfo
}
```

After the first fetch, `AuthFoundation` caches the user info. This avoids unnecessary network calls for data that rarely changes.

2️⃣ Fetch user info from the Okta `/userinfo` endpoint

```swift
guard let userInfo = try await Credential.default?.userInfo() else {
    return nil
}
```

If not cached, this method calls the Okta `/userinfo` endpoint using the current access token. The response includes standard OpenID Connect claims:

* `sub`: Unique user identifier
* `name`: User's full name
* `email`: Email address
* `preferred_username`: Username or email used for sign-in

3️⃣ Return `nil` if fetch fails.

```swift
catch {
    return nil
}
```

If the network request fails or the token is invalid, return `nil` rather than crashing. The calling code can decide how to handle the missing data.

Finally, add user profile retrieval. Add this method after `refreshAccessToken`:

```swift
func getCurrentUser() async throws -> UserInfo? {
        // 1️⃣ Return cached user info if available
        if let userInfo = Credential.default?.userInfo {
            return userInfo
        }

        // 2️⃣ Fetch user info from the Okta /userinfo endpoint
        do {
            guard let userInfo = try await Credential.default?.userInfo() else {
                return nil
            }
            return userInfo
        } catch {
            // 3️⃣ Return nil if fetch fails
            return nil
        }
    }
```

Now add token refresh capability. Add this method after `logout`:

```swift
func refreshAccessToken() async throws {
        // 1️⃣ Verify that a credential exists
        guard let credential = Credential.default else {
            throw NSError(domain: "AuthService",
                         code: -1,
                         userInfo: [NSLocalizedDescriptionKey: "No credential available"])
        }

        // 2️⃣ Exchange refresh token for new access token
        try await credential.refresh()
    }
```

Next, implement the log-out functionality. Add this method after `authenticate`:

```swift
func logout() async throws {
        // 1️⃣ Revoke tokens on the Okta server
        if let credential = Credential.default {
            try? await credential.revoke()
        }

        // 2️⃣ Clear local credential from the keychain
        Credential.default = nil

        // 3️⃣ Reset authentication state
        authenticationState = .notAuthenticated
    }
```

Now implement the authentication methods. Add the following code after the `init()` method:

```swift
// MARK: - Authentication Methods

    func authenticate(username: String, password: String) async throws {
        // 1️⃣ Update state to show authentication is in progress
        authenticationState = .authenticating

        do {
            // 2️⃣ Send credentials to Okta using DirectAuth
            let response = try await directAuth.start(username, with: .password(password))

            // 3️⃣ Process the authentication response
            switch response {
            case .success(let token):
                // 4️⃣ Store credential securely in keychain
                let credential = try Credential.store(token)
                Credential.default = credential
                authenticationState = .authenticated

            default:
                // 5️⃣ Handle unexpected response
                authenticationState = .error("Authentication failed")
            }

        } catch {
            // 6️⃣ Handle errors and update state
            authenticationState = .error(error.localizedDescription)
            throw error
        }
    }
```
