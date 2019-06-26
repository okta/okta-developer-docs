### Response handling

The closure `onStatusChange` returns the `OktaAuthStatus` instance as a parameter. An instance of the `OktaAuthStatus` class represents the current status that is returned by the server. It's your responsibilty to handle current status in order to proceed with the initiated flow. Check the status type by calling `status.statusType` and downcast to a concrete status class.

Example handler function:

```swift
func handleStatus(status: OktaAuthStatus) {

    switch status.statusType {
        case .success:
            handleSuccessStatus(status: status)

        case .passwordWarning:
            handlePasswordWarning(status: status)

        case .passwordExpired:
            handleChangePassword(status: status)

        case .MFAEnroll,
             .MFAEnrollActivate,
             .MFARequired,
             .MFAChallenge.
             .recovery,
             .recoveryChallenge,
             .passwordReset,
             .lockedOut,
             .unauthenticated:
                let alert = UIAlertController(title: "Error", message: "Not implemented", preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                present(alert, animated: true, completion: nil)
         default:
                let alert = UIAlertController(title: "Error", message: "Unknown status - \(status.statusType.rawValue)", preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                present(alert, animated: true, completion: nil)
             
    }
}
```

### Success status handling

Downcast the received status to the `OktaAuthStatusSuccess` class and get access to the `sessionToken` property. You can then exchange the session token for an access token via the `OktaOidc` library.

```swift
func handleSuccessStatus(status: OktaAuthStatus) {
    let successStatus: OktaAuthStatusSuccess = status as! OktaAuthStatusSuccess
    let oidcClient = try? OktaOidc()
    oidcClient?.authenticate(withSessionToken: successStatus.sessionToken!,
                             callback: { [weak self] stateManager, error in
                                if let error = error {
                                    self.authStateManager = nil
                                    self.handleError(error)
                                    return
                             }

                             authStateManager?.writeToSecureStorage()
                             print("AccessToken: \(authStateManager.accessToken)")
                        }
}
```

### Error handling

Errors are returned via the `onError` closure. Handle the `error` parameter of type `OktaError` to get the error condition.

Example of the `OktaError` definition:

```swift
public enum OktaError: Error {
    case errorBuildingURLRequest
    case connectionError(Error)
    case emptyServerResponse
    case invalidResponse
    case responseSerializationError(Error, Data)
    case serverRespondedWithError(OktaAPIErrorResponse)
    case unexpectedResponse
    case wrongStatus(String)
    case alreadyInProgress
    case unknownStatus(OktaAPISuccessResponse)
    case internalError(String)
    case invalidParameters(String)
}
```
Note that some errors have underlying raw values of different types, such as `String`, `Error`, `OktaAPIErrorResponse`, and so on. Raw values give additional context about the error and simplify error handling and troubleshooting. For example, `serverRespondedWithError` indicates that the API errors and also carries server-side data encapsulated in the `OktaAPIErrorResponse` class. The following example shows how to extract a server-side error response:

```swift
func handleError(error: OktaError) {
    switch error {
        case .serverRespondedWithError(let errorResponse):
            print("Error: \(errorResponse.errorSummary ?? "server error")")
        default:
            print("Error: \(error.description)")
    }
}
```
