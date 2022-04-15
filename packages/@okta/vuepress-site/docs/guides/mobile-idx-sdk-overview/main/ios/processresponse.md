This example shows part of the implementation of the `IDXClientDelegate` protocol functions called by the SDK for each response and for errors.

```swift

import OktaIdx

class SignInController: IDXClientDelegate {
    ...

    var currentResponse: Response? = nil

    ...

    // Delegate function called for each sign-in step.
    public func idx(client: IDXClient, didReceive response: Response) {
        currentResponse = response

        // If a response is successful, exchange it for a token.
        guard !response.isLoginSuccessful else {
            // Handle retrieving the access token.
            return
        }


        // If no remediations are present, abort the sign-in flow.
        guard let remediation = currentResponse?.remediations.first else {
            // Handle the error and finish the sign-in flow.
            return
        }

        // Check for messages, such as entering an incorrect code.
        if let message = response.messages.allMessages.first {
            // Handle the messages as appropriate.
            return
        }

        // Build the UI using the information in the remediations and authenticators.

        ...
    }

    // Delegate function sent when an error occurs.
    public func idx(client: IDXClient, didReceive error: Error) {
        // Handle the error and finish the sign-in flow.
    }

```
