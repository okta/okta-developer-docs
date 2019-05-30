### Response handling

Please note that the closure `onStatusChange` returns `OktaAuthStatus` instance as a parameter. An instance of the `OktaAuthStatus` class represents the current status that is returned by the server. It's the developer's responsibilty to handle current status in order to proceed with the initiated flow. Check the status type by calling `status.statusType` and downcast to a concrete status class. Here is an example handler function:

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

Downcast the received status to OktaAuthStatusSuccess class and get access to `sessionToken` property. You now can exchange session token to access token via `OktaOidc` library.

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

Errors are returned via `onError` closure. Handle `error` parameter of type `OktaError` to get the idea of error condition. `OktaError` definition is following:

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
Note that some errors has underlying raw values of different types: `String`, `Error`, `OktaAPIErrorResponse` and etc. Raw values give additional context about the error and simplify error handling and troubleshooting. As an example `serverRespondedWithError` indicates API level errors and also carries server-side data encapsulated in `OktaAPIErrorResponse` class. Example below shows how to extract server-side error response:

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
