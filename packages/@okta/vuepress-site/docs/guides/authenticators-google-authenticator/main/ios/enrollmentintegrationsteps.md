>**Note:** The examples in this guide use Swift 5, SwiftUI, and a target of iOS 15 or later. The SwiftUI portions pass state information using multiple bindings, consider using more robust ways of sharing and updating data in production apps. For more information, see the [Apple developer documentation for state and data flow in SwiftUI](https://developer.apple.com/documentation/swiftui/state-and-data-flow/).

The code in this guide manages the sign-on flow using a singleton class (`SignInController`). The class handles asynchronous responses from the SDK by implementing the delegate functions of the `IDXClientDelegate` protocol. The SDK also provides completion handlers and Swift Concurrency (`async/await`).

### 1: Display the initial sign-in UI

Enable the user to start the sign-in flow, such as presenting a Sign In button or a form with fields for a username and password (you won't use those values until step 3 when you [authenticate the user credentials](#_3-authenticate-the-user-credentials)).

### 2: Start the sign-on flow

Initialize the SDK client and request the initial server response after the user starts the sign-in process.

This code also sets the caller as the delegate for asynchronous callbacks from the SDK:

```swift
// Initialize the SDK client using a Configuration object loaded previously.
IDXClient.start(with: configuration) { (client, error) in
    guard let client = client else {
		self.finish(with: error)
		return
	}

	self.client = client

    // Set this object as the delegate for asynchronous calls.
	client.delegate = self

	// Request the first response from the Okta org.
	client.resume()
}
```

The `configuration` (`IDXClient.IDXClientConfiguration`) parameter in the call to `IDX.start(with:)` contains the configuration information for your Okta org, and is usually initialized from an `Okta.plist` file. The call to `client.resume()` requests the first response of the sign-sequence.

### 3: Authenticate the user credentials

The SDK uses a `Response` object to represent the server request for the current sign-on step. It contains a collection of remediations (`Remedation`) that specify the type of step, any general messages, and a nested collection of forms (`Remedation.Form`) containing fields (`Remedation.Form.Field`) that represent the various elements of the UI, such as an entry field with a label. Completing a step usually requires setting the value of one or more fields. The remediation is then sent back to the server with the updated values by calling `proceed()`. The server processes the values and then sends the next step.

The kind of sign-on step is represented by the `type` property of the remediation. In this step the server is requesting the username and password, an `.identify` remediation type.

This code shows the singleton delegate function that handles the an SDK response indicating a next step and includes all the types of remediations that are part of a Google Authenticator flow:


```swift
public func idx(client: IDXClient, didReceive response: Response) {
    currentResponse = response

    // If a response is successful, immediately exchange it for a token.
    guard !response.isLoginSuccessful else {
        response.exchangeCode()
        // Handle a succesful login.
        return
    }

    // If no remediations are present, abort the login process.
    guard let remediation = currentResponse?.remediations.first else {
        // Handle the error.
        return
    }

    // Check for messages, such as entering an incorrect code.
    if let message = response.messages.allMessages.first {
        // Inform the view model to display the message.
        return
    }

    // Handle the different sign-in steps (remediations) for a policy.
    switch remediation.type {

    // Username and password, though password may be separate; see the next case.
    case .identify:
        handleIdentify(remediation)

        // Request a password or a passcode, such as one from Google Authenticator.
        // Identity-first policies request the password separately.
    case .challengeAuthenticator:
        handleChallenge(remediation)

        // Display a list of authenticators.
    case .selectAuthenticatorEnroll:
        handleSelectAuthenticatorToEnroll(remediation)

    // Enroll in an Authenticator
    case .enrollAuthenticator:
        handleEnrollAuthenticator(remediation)

    default:
        // Handle the case of an unrecognized step.
        // Note, there are several more types of remediations.
    }
}
```

The `handleIdentify(remediation:)` function updates the username and password fields in the remediation, and then calls `remediation.proceed()` which both sends the updated remediation to the server and requests the next step.


```swift
func handleIdentify(_ remediation: Remediation) {
    // Update the values in the remediation object and go to the next step.
    remediation["identifier"]?.value = username
    remediation["credentials.passcode"]?.value = password
    remediation.proceed()
}
```

Some types of policies ask for the passsword in a separate step using a `.challengeAuthenticator` remediation type. The `handleChallege(remediation:)` function sets the password and calls `proceed()`:


```swift
// Sometimes the password is requested in a separate step.
func handleChallenge(_ remediation: Remediation) {
    guard let authenticator = remediation.authenticators.first else {
        finish(with: .unexpectedAuthenticator)
        return
    }

    let type = authenticator.type
    switch type {
    case .password:
        remediation["credentials.passcode"]?.value = password
        remediation.proceed()

    default:
        // Handle the case of an unknown authenticator.
        return
    }
}

```

>**Note:** The response from the server specifies either the next step, an error, or a
message, such as an incorrect code. The code that handles the response may need to show
different UI, depending on the step. The `IDXClientDelegate` protocol includes two other functions: `idx(client:didReceive<Token>:)` handles receiving a sign-in token, and   `idx(client:didReceive<Error>:)` handles errors.

### 4: Display a list of possible authenticator factors

After verifying the username and password, the server sends a remediation of type `.selectAuthenticatorEnroll` that contains the possible authenticators. The list of choices are in the `options` property of a field with `name` set to `"authenticator"` in the remediation `forms` property.

The display name of an authenticator is in the `label` property of the field. Use this name to build your selection UI. For an example of using `label`, see the code that displays the the `Picker` in the code for `AuthenticatorSelectionView` later in this step.

When the user selects an option, set the `selectedOption` property of the field containing the options (the one with the `name` `"authenticator"`) to the field containing the selected option. Call `proceed()` on the remediation once the user has finalized their choice to send the information and request the next step.

This utility function returns a tuple (`AuthenticatorOptions` type alias) with the field that contains the options, an array of options, and the selected field:


```swift
typealias AuthenticatorOptions = (optionSelectorField: Remediation.Form.Field,
                                  optionFields: [Remediation.Form.Field],
                                  selectedField: Remediation.Form.Field?)


func authenticatorOptions() -> AuthenticatorOptions? {
    guard let fields = currentRemediation?.form.fields,
          let selectorField = fields.filter({ $0.name == "authenticator"}).first,
          let options = selectorField.options,
          options.count > 0 else {
              return nil
          }
    return (selectorField, options, selectorField.selectedOption)
}

```

The function that handles the remediation type checks that there's at least one option:

```swift
func handleSelectAuthenticatorToEnroll(_ remediation: Remediation) {
    guard let optionsInfo = authenticatorOptions(),
          optionsInfo.optionFields.count > 0 else {
              finish(with: .unexpectedAuthenticator)
              return
          }

    // Tell the caller to present a UI for choosing an authenticator.
}
```

Display a UI for selecting an authenticator, or if there no options or some other issue,
present an error.

One way to do this is building a picker using the results of the `authenticatorOptions()` utility function. For example, the following SwiftUI code displays the options using a `Picker` in a `Form`. In the code `SignInController` is the singleton that manages the sign-on flow. The view model uses a completion handler to receive results from the controller. The `.success` result type for this completion handler is:

`typealias SuccessResultType = (token: Token?, message: IDXClient.Message?)`

You may receive multiple enrollment requests during the sign-on flow when a policy includes more than one authenticator. When the policy allows the user to skip enrolling in additional authenticators the server returns at least one remediation with a `type` of `Remediation.RemediationType.skip`.

```swift
import SwiftUI
import OktaIdx

struct AuthenticatorSelectionView: View {
    // Controls displaying the view showing the sign-in forms.
    @Binding var showingSignIn: Bool
    // Controls what type of form to display.
    @Binding var currentState: Remediation.RemediationType
    // Controls what's displayed in the Apps' Home view.
    @Binding var signedIn: Bool

    // A message indicating an issue, such as "A selection is required."
    @State var message: String? = nil
    // True if the number of enrolled authenticators satisfies the policy.
    @State var showSkipButton: Bool = false

	// The array of possible authenticators
    @State var options: AuthenticatorOptions? = nil
    // The selected authenticator
    @State var selectedOption: Remediation.Form.Field? = nil

    var body: some View {
        NavigationView {
            Form {
                if let options = options {
                    Section("Authenticator Option") {
                        Picker("Choose an authenticator", selection: $selectedOption) {
                            ForEach(options.optionFields, id: \.self) {
                                Text($0.label!).tag(Optional($0))
                            }
                        }
                    }
                }
                // Display only if there's a message.
                if let message = message {
                    Section("Message") {
                        HStack {
                            Image(systemName: "exclamationmark.triangle.fill")
                                .foregroundColor(Color.yellow)
                            Text(message)
                        }
                    }
                }
                Section() {
                    Button("Continue") {
                        continueSignIn(skip: false)
                    }
                    if showSkipButton {
                        Button("Skip") {
                            continueSignIn(skip: true)
                        }
                    }
                    Button("Cancel Sign In", role: .destructive) {
                        // Handle the case of cancelling the sign-in.
                        currentState = .unknown
                        showingSignIn = false
                    }
                }
            }
            .onAppear() {
                guard let signInController = SignInController.shared else {
                    // Handle the error
                    return
                }
                if options == nil {
                    options = signInController.authenticatorOptions()
                    selectedOption = options?.selectedField
                }

                let remediations = signInController.currentResponse?.remediations
                showSkipButton = remediations?.filter({ $0.type == .skip }).first != nil
            }
        }
    }

    func continueSignIn(skip: Bool) {
        let completion: ((Result<SuccessResultType, LoginError>) -> Void) = { result in
            isWaiting = false
            message = nil
            switch result {
            case .success(let result):
                if let token = result.token {
                    // Succesful sign in
                    signedIn = true
                    showingSignIn = false
                } else if let message = result.message {
                    // Show a message on this form.
                    self.message = message.message
                } else {
                    // Handle moving to a new type of form.
                    currentState = SignInController.shared!.currentRemediation!.type
                }

            case .failure(let error):
                // Handle the error
            }
        }

        let signInController = SignInController.shared?
        if skip {
            // Call a utility function for skipping the selection step.
            signInController.skipAuthenticatorSelection(completion: completion)
        } else {
            // Select an authentictor and request the next step.
            signInController.selectAuthenticator(authenticator: selectedOption,
                                                 completion: completion)
        }
    }
}

```

The UI updates the sign-on controller with the selected authenticator by calling `selectAuthenticator(authenticator:completion)`, or `skipAuthenticatorSelection(completion:)` if the user chose to skip enrolling in additional authenticators:

```swift
public func skipAuthenticatorSelection(completion:@escaping (Result<SuccessResultType, LoginError>) -> Void) {
    // Set the current view model completion handler which is
    // called when recieving a response from the SDK.
    self.completion = completion

    guard let skipRemediation = currentResponse?.remediations.filter({ $0.type == .skip }).first else {
        // Handle the error
        return
    }

    // Request the next step.
    skipRemediation.proceed()
}


public func selectAuthenticator(authenticator: Remediation.Form.Field?, completion:@escaping (Result<SuccessResultType, LoginError>) -> Void) {
    // Set the selected authenticator.
    self.completion = completion

    guard let selectorFields = authenticatorOptions() else {
              self.finish(with: .cannotProceed)
              return
          }

    // Update the remediation and send it to the server,
    // requesting the next step.
    selectorFields.optionSelectorField.selectedOption = authenticator
    currentRemediation!.proceed()
}
```

### 5: Display the shared secret, QR Code, and request the code

After selecting the authenticator, the server sends an enrollment request in a remediation of type `.enrollAuthenticator`. Enrolling uses a secret key shared between Okta and Google Authenticator that's used to generate and verify the generated time-based one-time passcodes (TOTP).

The remediation includes the shared secret as both a QR Code and as text. It also includes a request to enter a Google Authenticator code after enrollment.

The sign-on controller code for `handleEnrollAuthenticator(remdiation:)` works for many different authenticators because the `form` property of the remediation contains the information required to build the UI:

```swift
func handleEnrollAuthenticator(_ remdiation: Remediation) {
    // Tell the caller to present a UI for enrolling in Google Authenticator.

}
```

The collection of authenticators related to the current request are in the `authenticators` property of the remediation. Each one is an instance of the `Authenticator` class which includes an identifier in the `key` property and a name for display in the UI in the `displayName` property.

Authenticators may include one or more capabilities that describe associated data and behaviors, such as the QR Code or the ability to send a code. This includes

This utility function finds the Google Authenticator (`key` set to `"google_otp"`), and then loads an image for the QR Code and the shared secret:


```swift
// The information for constructing a UI for enrollment.
typealias AuthenticatorEnrollment = (name: String?,
                                     qrCode: UIImage?,
                                     sharedSecret: String?)

func authenticatorEnrollment() -> AuthenticatorEnrollment? {
        guard let remediation = currentRemediation,
              let authenticator = remediation.authenticators.filter({ $0.key == "google_otp"}).first,
              let capability = authenticator.capabilities.filter({$0 is Capability.OTP}).first as? Capability.OTP,
              let qrCode = capability.image,
              let sharedSecret = capability.sharedSecret else {
                  return nil
              }

        return (authenticator.displayName, qrCode, sharedSecret)
    }
```

The model and view information for the one-time code entry field are nested in the forms of the remediation. First find a field with the `name` property set to `"credentials"` in the `form` property of the remediation. Then in the `form` property of that field, find the field with the `name` set to `"passcode"`:

```swift
typealias AuthenticatorCode = (codeField: Remediation.Form.Field,
                               entryField: Remediation.Form.Field)

    func authenticatorCodeField() -> AuthenticatorCode? {
    guard let codeField = currentRemediation?["credentials"],
          let entryField = currentRemediation?["credentials.passcode"] else {
              return nil
          }
        return (codeField, entryField)
    }

```

Set the `value` property of the  entry field, the one with a name `"passcode"` to the code entered by the user, and then submit the remediation to continue to the next step. This is the utility function from the sign-on manager:

```swift
public func authenticateWithCode(code: String?, completion:@escaping (Result<SuccessResultType, LoginError>) -> Void) {
    self.completion = completion

    guard let codeFields = authenticatorCodeFields() else {
              self.finish(with: .cannotProceed)
              return
          }

    codeFields.entryField.value = code

    currentRemediation!.proceed()
}
```

The following form displays the QR Code, secret key, and a form for entering the one-time code:

```swift
import SwiftUI
import OktaIdx

struct EnrollAuthenticatorView: View {
    // Controls displaying the view showing the sign-in forms.
    @Binding var showingSignIn: Bool
    // Controls what type of form to display.
    @Binding var currentState: Remediation.RemediationType
    // Controls what's displayed in the Apps' Home view.
    @Binding var signedIn: Bool

    // A message indicating an issue, such as "A selection is required."
    @State var message: String? = nil
    // True if the number of enrolled authenticators satisfies the policy.
    @State var showSkipButton: Bool = false

	// The date for enrolling in the authenticator, such as the QR Code.
    @State var enrollData: AuthenticatorEnrollment? = nil
	// The fields for the one-time code.
    @State var codeData: AuthenticatorCode? = nil

    @State var qrCode: UIImage? = nil
	// The entered code.
    @State var code: String = ""

    var body: some View {
        Form {
            if let qrCode = enrollData?.qrCode {
                Section("Enrollment Code") {
                    if let name = enrollData!.name {
                        Text(name)
                    }
                    Image(uiImage: qrCode)
                        .resizable()
                        .scaledToFit()
                        .frame(width: 200, height: 200)
                    Text("Enroll by scanning this code in the app or use the following code:")
                    Text((enrollData?.sharedSecret)!)
                }
            }
            // Display only if there's a message.
            if let message = message {
                Section("Message") {
                    HStack {
                        Image(systemName: "exclamationmark.triangle.fill")
                            .foregroundColor(Color.yellow)
                        Text(message)
                    }
                }
            }
            Section("Code") {
                let textLabel = (codeData?.entryField.label != nil) ?
                codeData?.entryField.label : "Enter the code"
                TextField(textLabel!,text: $code)
                    .textInputAutocapitalization(.never)
                    .disableAutocorrection(true)
                    .keyboardType(.numberPad)
            }
            Section() {
                Button("Continue") {
                    continueSignin()
                }
                Button("Cancel Sign In", role: .destructive) {
                    showingSignIn = false
                }
            }

        }
        .onAppear() {
            if let signInController = SignInController.shared {
                enrollData = signInController.authenticatorEnrollment()
                codeData = signInController.authenticatorCodeFields()
            }
        }
    }

    func skip() {
        print("SKIP")

    }

    func continueSignin() {
        print("Continue")
        SignInController.shared?.authenticateWithCode(code: code) {result in
             isWaiting = false
            switch result {
            case .success(let result):
                isWaiting = false
                    // Succesful sign in
                    signedIn = true
                    showingSignIn = false
                } else if let message = result.message {
                    // Show a message on this form.
                    self.message = message.message
                } else {
                    currentState = SignInController.shared!.currentRemediation!.type
                }

            case .failure(let error):
                // Handle the error
            }
        }
    }
}
```

There are three possible results after sending the code to the server:

- Sending the correct code signs the user in.
- Sending an incorrect code results in another `.enrollAuthenticator` response with a message indicating that the code doesn't match. The UI code handles that case by displaying a form that includes the message.
- An error, such as a disconnected server.


