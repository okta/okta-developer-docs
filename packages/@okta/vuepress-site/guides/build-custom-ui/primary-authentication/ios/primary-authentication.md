### Building UI

There are different techniques how to build UI flows in iOS application. You can choose from MVVM, Viper or just use massive view controllers. Managing transitions between view controllers is also up to you, however we recommend to use [flow coordinator pattern](https://medium.com/@dkw5877/flow-coordinators-333ed64f3dd). Your flow coordinator instance will handle all the status updates and manage UI navigation. We've also implemented this pattern in our [sample application](https://github.com/okta/samples-ios/tree/master/custom-sign-in)

As an example your application could have the following view controllers:
- `LoginViewController` - responsible for reading username and password information from a user
- `PasswordChangeViewController` - responsible for changing password or skip actions
- `MFARequiredViewController` - responsible for showing user the list of available factors to choose from
- `MFAChallengeViewController` - responsible for factor verification and retry actions
- and etc.


### Primary authentication

With the primary authentication flow(no MFA, no Password management and etc.) you typically need one view controller  `LoginViewController`.
`LoginViewController` is your root view controller that expectes username and password inputs. Perform the following call once data is ready and a user has pressed the `login` button:

```swift
OktaAuthSdk.authenticate(with: URL(string: "https://{yourOktaDomain}")!,
                                   username: "username",
                                   password: "password",
                                   onStatusChange: { authStatus in
                                       handleStatus(status: authStatus)
                                   },
                                   onError: { error in
                                       handleError(error)
                                   })
```

The SDK will return `OktaAuthStatusSuccess` status in `onStatusChange` closure parameter.


#### `LoginViewController` example:

```swift
private extension LoginViewController {

@IBAction func signInTapped() {
    guard let username = usernameTextField.text, !username.isEmpty,
    let password = passwordTextField.text, !password.isEmpty else { return }

    progressHUD.show()
    OktaAuthSdk.authenticate(with: URL(string: urlString)!,
                             username: username,
                             password: password,
                             onStatusChange:
                    { [weak self] status in
                                progressHUD.dismiss()
                                self?.flowCoordinatorDelegate?.onStatusChanged(status: status)
                    })
                    { [weak self] error in
                                progressHUD.dismiss()
                                self?.showError(message: error.description)
                    }
    }
}
```

#### `AuthFlowCoordinator` example:

```swift
protocol AuthFlowCoordinatorProtocol: class {
    func onStatusChanged(status: OktaAuthStatus)
    func onCancel()
    func onReturn(prevStatus: OktaAuthStatus)
}
```

```swift
class AuthFlowCoordinator {
    func handleStatus(status: OktaAuthStatus) {

        currentStatus = status

        switch status.statusType {

        case .success:
            handleSuccessStatus(status: status as! OktaAuthStatusSuccess)
        
        case .passwordExpired,
             .passwordWarning,
             .MFARequired,
             .MFAChallenge,
             .MFAEnroll,
             .MFAEnrollActivate,
             .recoveryChallenge,
             .recovery,
             .passwordReset,
             .lockedOut,
             .unauthenticated:
                self.showError("Unsupported Status")
        }
    }

    func handleSuccessStatus(status: OktaAuthStatusSuccess) {
        let alert = UIAlertController(title: "Success", message: "We are logged in - \(status.sessionToken!)", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
        rootViewController.present(alert, animated: true, completion: nil)
    }
}

extension AuthFlowCoordinator: AuthFlowCoordinatorProtocol {
    func onStatusChanged(status: OktaAuthStatus) {
        self.handleStatus(status: status)
    }

    func onCancel() {
        rootViewController.popToRootViewController(animated: true)
    }

    func onReturn(prevStatus: OktaAuthStatus) {
        rootViewController.popViewController(animated: true)
    }
}
```
