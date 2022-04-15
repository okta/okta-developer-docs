This example shows part of the implementation of the `IDXClientDelegate` protocol functions called by the SDK for each response, for recieving the access token, and when an error occurs.

```swift

import OktaIdx

class SignInController {
    ...

    var currentResponse: Response? = nil


    ...

    // Delegate method called for each sign-in step.
    public func idx(client: IDXClient, didReceive response: Response) {
        currentResponse = response

        // If a response is successful, exchange it for a token.
        guard !response.isLoginSuccessful else {
            response.exchangeCode()
            return
        }

        ...
    }

    // Delegate method called when a token is successfully exchanged.
    public func idx(client: IDXClient, didReceive token: Token) {
        // Save the token securely and finish the sign-in flow.
    }

```
