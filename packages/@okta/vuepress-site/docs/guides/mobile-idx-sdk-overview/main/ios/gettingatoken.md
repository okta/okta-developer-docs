This example shows part of the implementation of the `IDXClientDelegate` protocol functions the SDK calls for each response and for receiving the access token.

```swift

import OktaIdx

class SignInController {
    ...

    var currentResponse: Response? = nil

    ...

    // Delegate function called for each sign-in step.
    public func idx(client: IDXClient, didReceive response: Response) {
        currentResponse = response

        // If a response is successful, exchange the session token for an access token.
        guard !response.isLoginSuccessful else {
            response.exchangeCode()
            return
        }

        ...
    }

    // Delegate function called when a token is successfully exchanged.
    public func idx(client: IDXClient, didReceive token: Token) {
        // Save the token securely and finish the sign-in flow.
    }

```
