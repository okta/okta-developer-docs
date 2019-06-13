### Building UI

There are different techniques how to build UI flows in iOS application. You can choose from MVVM, Viper or just use massive view controllers. Managing transitions between view controllers is also up to you, however we recommend to use [flow coordinator pattern](https://medium.com/@dkw5877/flow-coordinators-333ed64f3dd). Your flow coordinator instance will handle all the status updates and manage UI navigation. We've also implemented this pattern in our [sample application](https://github.com/okta/samples-ios/tree/master/custom-sign-in)

As an example your application could have the following view controllers:
- `LoginViewController` - responsible for reading username and password information from a user and initiate authentication flow via `OktaAuthSdk`
- `PasswordChangeViewController` - responsible for changing password or skip actions
- `MFARequiredViewController` - responsible for showing to the user the list of enrolled active factors
- `MFAChallengeViewController` - responsible for factor verification and retry actions
- and etc.

Your flow coordinator have to decide what next view controller to show based on current status received from the server. If for example current status is `OktaAuthStatusPasswordChange` then the flow coordinator will show `PasswordChangeViewController` and inject current status as a dependency.

### Primary authentication

With the primary authentication flow(no MFA, no Password management and etc.) you typically need one view controller  `LoginViewController`.
`LoginViewController` is your root view controller that expectes username and password inputs from the user.
Let's assume that your view controller has the following UI outlets: `userNameTextField`, `passwordTextField` and `signInButton`. Then handler for the tap on `signInButton` could be the following:

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

If the user has been successfully authenticated then SDK will return `OktaAuthStatusSuccess` status in `onStatusChange` closure parameter.

Below is an example of `AuthFlowCoordinator` implementation. Let's assume that your `LoginViewController` view controller has property `flowCoordinatorDelegate`. Property declared with `AuthFlowCoordinatorProtocol` type and required for delegating status handling responsilbity to `AuthFlowCoordinator` object.

#### `AuthFlowCoordinatorProtocol`:

```swift
protocol AuthFlowCoordinatorProtocol: class {
    func onStatusChanged(status: OktaAuthStatus)
    func onCancel()
    func onReturn(prevStatus: OktaAuthStatus)
}
```

#### `AuthFlowCoordinator`:

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
                print("Recieved unknown status")
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
