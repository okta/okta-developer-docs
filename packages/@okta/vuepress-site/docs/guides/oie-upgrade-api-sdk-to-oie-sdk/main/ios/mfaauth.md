### The Classic Engine Authentication SDK multifactor sign-in flow

The Classic Engine Authentication SDK methods that support the multifactor sign-in flow are as follows:

* `OktaAuthSdk.authenticate`
* `OktaAuthStatusFactorRequired.selectFactor`
* `OktaFactorOther.verify`
* `OktaFactorSms.verify`

The following steps detail how to integrate the multifactor sign-in flow using the Classic Engine Authentication SDK.

#### 1. Start sign-in

Start the sign-in flow by calling the `authenticate` type method on `OktaAuthSdk`. Pass your Okta org domain URL, username, password and a status change closure to the method.

```swift
OktaAuthSdk.authenticate(with: URL(string: "https://{yourOktaDomain}")!,
         username: username,
         password: password,
         onStatusChange: { authStatus in
         self.handleStatus(status: authStatus)
       },
              onError: { error in
              self.handleError(error)
       })

```

#### 2. Select factor

If the username and password are successfully authenticated, the closure function returns the status type of `MFARequired`. Pull a list of factors from the `availableFactors` property to display the list of available factors to the user. When the user chooses a factor, call `OktaAuthStatusFactorRequired.selectFactor` with the chosen factor and status change closure.

```swift
func handleFactorRequired(factorRequiredStatus: OktaAuthStatusFactorRequired) {
     updateStatus(status: factorRequiredStatus)

     let alert = UIAlertController(title: "Select verification factor", message: nil, preferredStyle: .actionSheet)
     factorRequiredStatus.availableFactors.forEach { factor in
        alert.addAction(UIAlertAction(title: factor.type.rawValue, style: .default, handler: { _ in
              factorRequiredStatus.selectFactor(factor,
                                               onStatusChange: { status in
                 self.handleStatus(status: status)
              },
                                               onError: { error in
                 self.handleError(error)
              })
        }))
     }
     alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: { _ in
        self.cancelTransaction()
     }))
     present(alert, animated: true, completion: nil)
  }

```

#### 3. Verify factor

After `OktaAuthStatusFactorRequired.selectFactor` completes, the `handleStatus` closure is called and returns a status type of `MFAChallenge`.  This status type indicates that a code has been sent to email or SMS and is awaiting verification.

```swift
func handleStatus(status: OktaAuthStatus) {
    self.updateStatus(status: status)
    currentStatus = status

    switch status.statusType {

    ...

    case .MFAChallenge:
        let mfaChallenge: OktaAuthStatusFactorChallenge = status as! OktaAuthStatusFactorChallenge
        let factor = mfaChallenge.factor
        switch factor.type {
        case .sms:
            let smsFactor = factor as! OktaFactorSms
            self.handleSmsChallenge(factor: smsFactor)

        ...

        default:
                let alert = UIAlertController(title: "Error", message: "Recieved challenge for unsupported factor", preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                present(alert, animated: true, completion: nil)
                self.cancelTransaction()
        }

...

}

```

Allow the user to enter the code and call `OktaFactorSms.verify` when they submit the code.

```swift
func handleSmsChallenge(factor: OktaFactorSms) {
  let alert = UIAlertController(title: "MFA", message: "Please enter code from SMS on \(factor.phoneNumber ?? "?")", preferredStyle: .alert)
  alert.addTextField { $0.placeholder = "Code" }
  alert.addAction(UIAlertAction(title: "OK", style: .default, handler: { [weak factor] action in
     guard let code = alert.textFields?[0].text else { return }
     factor?.verify(passCode: code,
                    onStatusChange: { status in
                       self.handleStatus(status: status)
     },
                    onError: { error in
                       self.handleError(error)
     })
  }))
  alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: { _ in
     self.cancelTransaction()
  }))
  present(alert, animated: true, completion: nil)
}
```

### The Identity Engine SDK multifactor authentication flow

The Identity Engine methods that support the multifactor authentication flow are as follows:

* Sample code methods
  * `MultifactorLogin.login`
  * `MultifactorLogin.select`
  * `MultifactorLogin.verify`
* SDK methods
  * `IDXClient.start`
  * `IDXClient.resume`
  * `Remediation.proceed`
  * `IDXClient.Response.exchangeCode`

The following steps detail how to integrate the multifactor authentication flow:

#### 1. Setup the multifactor sign-in flow

First, set up logic that handles each step in the multifactor sign-in process. Create an instance of `MultifactorLogin` and pass in a `configuration` object and `stephandler` closure. The `stephandler` closure is called whenever application interaction is requested during the sign-in flow.  In this closure, build out the following multifactor sign-in steps:

1. Choose the factor
1. Verify the email or SMS factor


```swift
self.authHandler = MultifactorLogin(configuration: configuration)
{ step in
  switch step {
  case .chooseFactor(let factors):
      // Use this to prompt the user for the factor you'd like to authenticate with.
      if factors.contains(.email) {
          self.authHandler?.select(factor: .email)
      }
  case .verifyCode(factor: let factor):
      // Prompt the user for the verification code; when they supply it, call the `verify` function.
      if factor == .email {
          self.authHandler?.verify(code: "123456")
      }
  }
  case .chooseMethod(let methods):
      // Use this to prompt the user for the method you'd like to authenticate with.
      if methods.contains(.sms) {
          self.authHandler?.select(factor: .phone,
                                   method: .sms,
                                   phoneNumber: "+15551234567")
      }
   }
}
```
