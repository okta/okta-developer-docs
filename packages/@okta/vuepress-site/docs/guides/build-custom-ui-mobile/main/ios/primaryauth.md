### Building the UI

There are several ways that you can build UI flows in iOS applications. You can use Model-View-ViewModel (MVVM), Viper, or massive view controllers. How you manage transitions between view controllers is up to you, however we recommend the use of the [flow coordinator pattern](https://medium.com/@dkw5877/flow-coordinators-333ed64f3dd). Your flow coordinator instance handles all of the status updates and manages UI navigation. We've also implemented this pattern in our [sample application](https://github.com/okta/samples-ios/tree/master/custom-sign-in).

For example, your application could have the following view controllers:
- `LoginViewController` - responsible for reading the username and password information from a user and initiating the authentication flow via `OktaAuthSdk`
- `PasswordChangeViewController` - responsible for the change password or skip actions
- `MFARequiredViewController` - responsible for showing the user their enrolled active factors
- `MFAChallengeViewController` - responsible for factor verification and retry actions

The flow coordinator decides which view controller to show next based on the current status that is received from the server. For example, if the current status is `OktaAuthStatusPasswordChange`, then the flow coordinator shows `PasswordChangeViewController` and injects the current status as a dependency.

### Primary authentication flow

With the primary authentication flow (no MFA, no password management, and so on), you typically just need `LoginViewController`. `LoginViewController` is your root view controller that expects the username and password to be input by the user. Let's assume that your view controller has the following UI outlets: `userNameTextField`, `passwordTextField`, and `signInButton`. Then, the handler for the tap on `signInButton` could be:

```swift

@IBOutlet private var userNameTextField: UITextField!
@IBOutlet private var passwordTextField: UITextField!
@IBOutlet private var signInButton: UIButton!

@IBAction private func signInTapped() {
    guard let username = userNameTextField.text, !username.isEmpty,
          let password = passwordTextField.text, !password.isEmpty else { return }

    OktaAuthSdk.authenticate(with: URL(string: {yourOktaDomain})!,
                             username: username,
                             password: password,
                             onStatusChange:
                            { [weak self] status in
                                self?.flowCoordinatorDelegate?.onStatusChanged(status: status)
                            })
                            { [weak self] error in
                                self?.showError(message: error.description)
                            }
}
```

If the user is authenticated, then the SDK returns the `OktaAuthStatusSuccess` status in the `onStatusChange` closure parameter.

The following is an example of an `AuthFlowCoordinator` implementation. Let's assume that your `LoginViewController` has the `flowCoordinatorDelegate` property. The property is declared with the `AuthFlowCoordinatorProtocol` type and required for delegating status handling responsibility to the `AuthFlowCoordinator` object.

**`AuthFlowCoordinatorProtocol`**

```swift
protocol AuthFlowCoordinatorProtocol: class {
    func onStatusChanged(status: OktaAuthStatus)
    func onCancel()
    func onReturn(prevStatus: OktaAuthStatus)
}
```

**`AuthFlowCoordinator`**

```swift
class AuthFlowCoordinator {
    public let rootViewController: UINavigationController
    var currentStatus: OktaAuthStatus?

    public class func instantiate() -> AuthFlowCoordinator {
        let mainStoryboard = UIStoryboard(name: "Login", bundle: nil)
        let loginViewController = mainStoryboard.instantiateViewController(withIdentifier: "LoginViewController") as! LoginViewController
        let navigationViewController = UINavigationController(rootViewController: loginViewController)
        let flowCoordinator = AuthFlowCoordinator(with: navigationViewController)
        loginViewController.flowCoordinatorDelegate = flowCoordinator
        return flowCoordinator
    }

    public init(with rootViewController: UINavigationController) {
        self.rootViewController = rootViewController
    }

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
                print("Status is not supported")
        default:
                print("Received unknown status")
        }
    }

    func handleSuccessStatus(status: OktaAuthStatusSuccess) {
        let alert = UIAlertController(title: "Success", message: "We are signed in - \(status.sessionToken!)", preferredStyle: .alert)
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
