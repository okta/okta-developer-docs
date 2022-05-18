### The Classic Engine Authentication SDK basic sign-in flow

The Classic Engine Authentication SDK methods that support the basic sign-in flow are as follows:

* `OktaAuthSdk.authenticate`

The following steps detail how to integrate the basic sign-in flow using the Classic Engine Authentication SDK.

#### 1. Start sign-in flow

Start the basic sign-in flow by calling the `authenticate` type method on `OktaAuthSdk`. Pass your Okta org domain URL, username, password and a status change closure to the method.

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

#### 2. Handle success return status

For successful sign-in flows, the closure function is called and returns a status type of `success`. Retrieve the session token using the `sessionToken` property and store it in session.

```swift
func handleStatus(status: OktaAuthStatus) {
  self.updateStatus(status: status)
  currentStatus = status

  switch status.statusType {

  case .success:
     let successState: OktaAuthStatusSuccess = status as! OktaAuthStatusSuccess
     handleSuccessStatus(sessionToken: successState.sessionToken!)
     ...

```

### The Identity Engine SDK basic sign-in flow

The Identity Engine methods that support the basic sign-in flow are as follows:

* Sample code methods
  * `BasicLogin.login`
* SDK methods
  * `IDXClient.start`
  * `Remediation.resume`
  * `Remediation.proceed`

The following steps detail how to integrate the basic sign-in flow using the Identity Engine SDK.

#### 1. Initialize and set up configurations

The first step is to create an instance of `BasicLogin` and pass in a `configuration` object.

```swift
self.authHandler = BasicLogin(configuration: configuration)
```

#### 2. Initiate sign-in flow

Next, initiate the sign-in flow by calling `BasicLogin.login`. Pass a username, password, and completion closure into the method. If the sign-in flow is successful, the completion closure is invoked with a status of either error or success with tokens.

```swift
self.authHandler.login(username: "user@example.com",
                      password: "secretPassword")
{ result in
   switch result {
   case .success(let token):
       print(token)
   case .failure(let error):
       print(error)
   }
}
```
