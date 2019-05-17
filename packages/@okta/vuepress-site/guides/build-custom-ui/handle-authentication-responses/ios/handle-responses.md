### Response handling

To initiate a particular flow please make a call to one of the available functions in OktaAuthSdk.swift:

```swift
// Authentication
public class func authenticate(with url: URL,
                               username: String,
                               password: String?,
                               onStatusChange: @escaping (_ newStatus: OktaAuthStatus) -> Void,
                               onError: @escaping (_ error: OktaError) -> Void)

// Unlock account
public class func unlockAccount(with url: URL,
                                username: String,
                                factorType: OktaRecoveryFactors,
                                onStatusChange: @escaping (_ newStatus: OktaAuthStatus) -> Void,
                                onError: @escaping (_ error: OktaError) -> Void)

// Forgot password
public class func recoverPassword(with url: URL,
                                  username: String,
                                  factorType: OktaRecoveryFactors,
                                  onStatusChange: @escaping (_ newStatus: OktaAuthStatus) -> Void,
                                  onError: @escaping (_ error: OktaError) -> Void)

// Restore authentication
public class func fetchStatus(with stateToken: String,
                              using url: URL,
                              onStatusChange: @escaping (_ newStatus: OktaAuthStatus) -> Void,
                              onError: @escaping (_ error: OktaError) -> Void)
```

Please note that the closure `onStatusChange` returns `OktaAuthStatus` instance as a parameter. An instance of the `OktaAuthStatus` class represents the current status that is returned by the server. It's the developer's responsibilty to handle current status in order to proceed with the initiated flow. Check the status type by calling `status.statusType` and downcast to a concrete status class. Here is an example handler function:

```swift
func handleStatus(status: OktaAuthStatus) {

    switch status.statusType {
        case .success:
            let successState: OktaAuthStatusSuccess = status as! OktaAuthStatusSuccess
            handleSuccessStatus(successStatus: successStatus)

        case .passwordWarning:
            let warningPasswordStatus: OktaAuthStatusPasswordWarning = status as! OktaAuthStatusPasswordWarning
            handlePasswordWarning(passwordWarningStatus: warningPasswordStatus)

        case .passwordExpired:
            let expiredPasswordStatus: OktaAuthStatusPasswordExpired = status as! OktaAuthStatusPasswordExpired
            handleChangePassword(passwordExpiredStatus: expiredPasswordStatus)

        case .MFAEnroll,
             .MFAEnrollActivate,
             .MFARequired,
             .MFAChallenge.
             .recovery,
             .recoveryChallenge,
             .passwordReset,
             .lockedOut:
             let alert = UIAlertController(title: "Error", message: "Not implemented", preferredStyle: .alert)
             alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
             present(alert, animated: true, completion: nil)
    }
}
```

### Success status handling

Downcast the received status to OktaAuthStatusSuccess class and get access to `sessionToken` property. You now can exchange session token to access token via `OktaOidc` library.

```swift
let successState: OktaAuthStatusSuccess = status as! OktaAuthStatusSuccess
let alert = UIAlertController(title: "Success", message: "Sesssion token: \(successState.sessionToken)", preferredStyle: .alert)
alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
present(alert, animated: true, completion: nil)
```

### Error handling

Errors are returned via `onError` closure. Handle `error` parameter of type `OktaError` to get the idea of error condition. `OktaError` definition if following:

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
switch error {
    case .serverRespondedWithError(let errorResponse):
        print("Error: \(errorResponse.errorSummary ?? "server error")")
    default:
        return
}
```
