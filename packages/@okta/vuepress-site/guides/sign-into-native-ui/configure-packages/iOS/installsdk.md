You will need to install two Okta libraries:
- [OktaOidc](https://github.com/okta/okta-oidc-ios), available through [CocoaPods](http://cocoapods.org/pods/OktaOidc).
- [OktaAuthSdk](https://github.com/okta/okta-auth-swift), available through [CocoaPods](http://cocoapods.org/pods/OktaAuthSdk). 

To install both libraries, add the following lines to your Podfile:

```ruby
pod 'OktaOidc'
pod 'OktaAuthSdk'
```

Now install above dependencies and open the auto-generated workspace file:

```bash
pod install
```
