### Building UI

There are different techniques how to build UI flows in iOS application. You can choose from MVVM, Viper or just use massive view controllers. Managing transitions between view controllers is also up to you, however we recommend to use [flow coordinator pattern](https://medium.com/@dkw5877/flow-coordinators-333ed64f3dd). Your flow coordinator instance will handle all the status updates and manage UI navigation. We've also implemented this pattern in our [sample application](https://github.com/okta/samples-ios/tree/master/custom-sign-in)

As an example your application could have the following view controllers:
- `LoginViewController` - responsible for reading username and password information from a user
- `PasswordChangeViewController` - responsible for changing password or skip actions
- `MFARequiredViewController` - responsible for showing user the list of available factors to choose from
- `MFAChallengeViewController` - responsible for factor verification and retry actions
- and etc.

### Primary authentication

With the primary authentication flow(no MFA) you typically need two view controllers  `LoginViewController` and `PasswordChangeViewController`.
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

The SDK may return `OktaAuthStatusPasswordExpired` or `OktaAuthStatusPasswordWarning` statuses in `onStatusChange` closure parameter. So, delegate handling of these statuses to `PasswordChangeViewController` view controller via dependency injection.
