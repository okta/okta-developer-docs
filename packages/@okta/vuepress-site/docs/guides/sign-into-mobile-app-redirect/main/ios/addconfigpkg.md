Add the latest Okta OIDC package to your project:

1. Choose **File** > **Add Packages**. The Swift Package Manager opens.
1. Enter the URL for the package in the search field:
`https://github.com/okta/okta-mobile-swift.git`
1. Confirm that the `okta-mobile-swift` package is selected, that the **Dependency Rule** is set to the main branch, and that your project is selected.
1. Click **Add Package**.
1. Select the package products that appear in the dialog: **AuthFoundation**, **OktaOAuth2**, and **WebAuthenticationUI**, and then click **Add Package**.

Open `ContentView.swift` and update the `import` statements to use the authorization foundation and WebAuthn UI libraries:

```swift
import SwiftUI
import AuthFoundation
import WebAuthenticationUI
```
