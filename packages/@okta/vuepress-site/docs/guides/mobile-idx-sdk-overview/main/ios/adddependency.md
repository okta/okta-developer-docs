The Okta Identity Engine SDK is available as a Swift package. Add it to your project using the **Package Dependencies** tab of the project editor in Xcode.

1. Click **Add (+)** and search for "okta-idx".
1. Choose the approriate dependency (usually "Up to Next Major Version").
1. Click **Add Package**.

The SDK includes a dependency on the Okta `AuthFoundation` library.
Import the packages into Swift files to access the SDK:

```swift
import OktaIdx
import AuthFoundation
```
