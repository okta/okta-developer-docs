### The Classic Engine Authentication SDK password recovery flow

The Classic Engine Authentication SDK methods that support the password recovery flow are as follows:

* `OktaAuthSdk.recoverPassword`
* `OktaAuthStatusRecoveryChallenge.verifyFactor`
* `OktaAuthStatusRecovery.recoveryQuestion`
* `OktaAuthStatusPasswordReset.resetPassword`

The following steps detail how to integrate the password recovery flow using the Classic Engine Authentication SDK.

##### 1. Start password recovery

Start the password recovery flow by calling `OktaAuthSdk.recoverPassword` and pass in the username, factor type, and status change closure. In this example, the SMS factor type is used which indicates a verification code is sent to the user’s phone.

```swift
OktaAuthSdk.recoverPassword(with: orgUrl,
                           username: username,
                           factorType: .sms,
                           onStatusChange: { authStatus in
   self.handleStatus(status: authStatus)
}, onError: { error in
   self.handleError(error)
})
```

#### 2. Verify factor

If the username is valid, the `OktaAuthSdk.recoverPassword` status change closure is invoked and returns a status type of `recoveryChallenge`.  This status type indicates that the user needs to verify the code that was sent to them.  Build a screen to capture the user’s verification code and pass the code and closure function to `OktaAuthStatusRecoveryChallenge.verifyFactor`.

```swift
switch status.statusType {

   case .recoveryChallenge:
       let mfaChallenge = status as! OktaAuthStatusRecoveryChallenge

       let alert = UIAlertController(title: "Enter code",
                                       message: "Please enter the verification code you received",
                                       preferredStyle: .alert)
       alert.addTextField { textField in
           textField.placeholder = "000 000"
       }
       alert.addAction(.init(title: "OK", style: .default, handler: { action in
           let code = alert.textFields?.first?.text ?? ""
           mfaChallenge.verifyFactor(passCode: code) { newStatus in
               self.handleStatus(status: newStatus)
           } onError: { error in
               self.handleError(error)
           }
       }))
       present(alert, animated: true)
```

#### 3. Answer security question

If the verification code is valid, the `OktaAuthStatusRecoveryChallenge.verifyFactor` status change closure is invoked and returns a status type of `recovery`. Pull the security question from `OktaAuthStatusRecovery.recoveryQuestion` and display it to the user. After the user answers the security question, send the answer to `OktaAuthStatusRecovery.recoverWithAnswer`.

```swift
switch status.statusType {
 case .recovery:
   let mfaRecovery = status as! OktaAuthStatusRecovery
   if let question = mfaRecovery.recoveryQuestion {
       let alert = UIAlertController(title: "Security Question",
                                       message: question,
                                       preferredStyle: .alert)
       alert.addTextField { textField in
           textField.placeholder = "Answer"
       }
       alert.addAction(.init(title: "OK", style: .default, handler: { action in
           let answer = alert.textFields?.first?.text ?? ""
           mfaRecovery.recoverWithAnswer(answer) { newStatus in
               self.handleStatus(status: newStatus)
           } onError: { error in
               self.handleError(error)
           }
       }))
       present(alert, animated: true)
   } else if let token = mfaRecovery.recoveryToken {
       mfaRecovery.recoverWithToken(token) { newStatus in
           self.handleStatus(status: newStatus)
       } onError: { error in
           self.handleError(error)
       }
   }

```

#### 4. Reset password

If the answer is valid, `OktaAuthStatusRecovery.recoverWithAnswer` status closure is invoked and returns a status type of `passwordReset`. Display a screen for the user to enter their new password and call `OktaAuthStatusPasswordReset.resetPassword` to submit the new password.

```swift
case .passwordReset:
   let reset = status as! OktaAuthStatusPasswordReset
   let alert = UIAlertController(title: "Choose a new password",
                                   message: nil,
                                   preferredStyle: .alert)
   alert.addTextField { textField in
       textField.isSecureTextEntry = true
   }
   alert.addAction(.init(title: "OK", style: .default, handler: { action in
       let password = alert.textFields?.first?.text ?? ""
       reset.resetPassword(newPassword: password) { newStatus in
           self.handleStatus(status: newStatus)
       } onError: { error in
           self.handleError(error)
       }
   }))
   present(alert, animated: true)
```

If the password is updated successfully, `OktaAuthStatusPasswordReset.resetPassword` status closure is invoked with a status parameter set to an object of type `success`.

```swift
switch status.statusType {

  case .success:
      let successState: OktaAuthStatusSuccess = status as! OktaAuthStatusSuccess
      handleSuccessStatus(sessionToken: successState.sessionToken!)
```

### The Identity Engine SDK password recovery flow

The Identity Engine methods that support the password recovery flow are as follows:

* Sample code methods
  * `MultifactorLogin.login`
  * `MultifactorLogin.select`
  * `MultifactorLogin.verify`
* SDK methods
  * `IDXClient.start`
  * `IDXClient.resume`
  * `Remediation.proceed`
  * `IDXClient.Response.exchangeCode`

The following steps detail how to integrate the password recovery flow using the Identity Engine SDK.

##### 1. Setup the password recovery flow

First, set up the logic that handles each step in the password recovery process. Create an instance of `MultifactorLogin` and pass in a `configuration` object and `stephandler` closure. The `stephandler` closure is called whenever application interaction is requested during the password recovery flow.  In this closure, build out the following password recovery steps.

1. Choose the factor for password recovery.
1. Verify the email or SMS factor.
1. Update the password with a new value.


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

#### 2. Reset password

The next step is to call `MultifactorLogin.resetPassword` and pass in the username and completion closure. The completion is invoked after the sign-in completes and returns either an error or success with tokens.

```swift
self.authHandler.resetPassword(username: "user@example.com")
{ result in
   switch result {
   case .success(let token):
       print(token)
   case .failure(let error):
      print(error)
   }
}
```
