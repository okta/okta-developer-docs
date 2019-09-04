Use the library [OktaStorage](https://github.com/okta/okta-storage-swift) available through [CocoaPods](http://cocoapods.org/pods/OktaStorage).

To install the library, add the following line to your `Podfile`:

```ruby
pod 'OktaStorage'
```

Now install the dependency and open the auto-generated workspace file:

```bash
pod install
```

Create an instance of `OktaSecureStorage` in your code:

```swift
let secureStorage = OktaSecureStorage()
```
