> **Note:** The sample is compatible with iOS 14 and later.

Launch Xcode and create a new iOS app project using SwiftUI for the interface and Swift for the language.

#### Add the UI

The main view implements all of the app functionality, including initializing the Okta SDK. Note that best practice for a full app uses a singleton to manage the interaction with the SDK.

Text views display the current state and any requested information, such as the access token. The available buttons depend on the sign-in state of the user. Update the imported modules and replace the `ContentView` `struct` with the following code:

```swift
import SwiftUI
import UIKit

struct ContentView: View {
  @State var showingError: Bool = false
  @State var errorMessage: String? = nil
  @State var errorTitle: String? = nil
  @State var statusText:String?  = "Not signed in."
  @State var infoText: String? = ""
  @State var signedIn: Bool = false

  var body: some View {
    VStack() {
      HStack {
        if !signedIn {
          Button("Sign In") {
            signIn()
          }
          .padding()
        } else {
          VStack {
            Button("Sign Out") {
              signOut()
            }
            .padding(.bottom)
            HStack {
              Button("Show User Info") {
                showUserInfo()
              }
              Button("Show Token") {
                showTokenInfo()
              }
              .padding(.horizontal)
              Button("Refresh Token") {
                refreshToken()
              }
            }
          }
        }
      }
      Divider()
      Text("Status")
      .fontWeight(.medium)
      .foregroundColor(Color.gray)
      .padding(.bottom)
      Text(statusText ?? "Unknown status.")
      Divider()
      Text("Info")
      .fontWeight(.medium)
      .foregroundColor(Color.gray)
      .padding(.bottom)
      ScrollView(showsIndicators: true) {
        Text(infoText ?? "")
      }
    }
    .alert(isPresented: $showingError) {
      Alert(title: Text(errorTitle ?? "Unknown Error"),
      message: Text(errorMessage ?? "An unknow error occured."))
    }
    .onAppear() {
      configureSDK()
    }
  }

  func signIn() {
    statusText = "Sign in button touched."
    signedIn = true
  }

  func signOut() {
    statusText = "Sign out button touched."
    signedIn = false
  }

  func showUserInfo() {
    statusText = "Show user info button touched"
  }

  func showTokenInfo() {
    statusText = "Show token info button touched"
  }

  func refreshToken() {
    statusText = "Refresh token button touched"
  }

  func configureSDK() {
    print("configureSDK called")
  }

  func tokenExpired() {
    print("tokenExpired called")
  }

  func showError(title: String , message: String) {
    errorTitle = title
    errorMessage = message
    showingError = true
  }

  func showError(title: String, error: Error) {
    showError(title: title, 
    message: error.localizedDescription)
  }

  func updateStatus(_ statusText: String, infoText: String, signedInStatus: Bool) {
    self.statusText = statusText
    self.infoText = infoText
    signedIn = signedInStatus
  }

}
```

The last four functions are utilities. You fill out `tokenExpired` later. The two variants of `showError` configure the contents, and then show an alert (the `showingError` state variable controls the presentation of the alert.)

The last one updates the status text, the info text, and the `signedIn` state variable that controls the buttons presented at the top of the UI.

#### Add an extension to find the root view

Redirect sign-in is designed for apps using view controllers and storyboards. Some of the calls include a parameter for the current view controller, something that doesn't exist in SwiftUI. This sample uses the root view controller for the first key window of the active app for the parameter.

Add a new Swift file to your project called `UIApplication+rootViewController` and add the following code:

```swift
import UIKit

extension UIApplication {
  var currentKeyWindow: UIWindow? {
    UIApplication.shared.connectedScenes
      .filter { $0.activationState == .foregroundActive }
      .map { $0 as? UIWindowScene }
      .compactMap { $0 }
      .first?.windows
      .filter { $0.isKeyWindow }
      .first
  }

  var rootViewController: UIViewController? {
    currentKeyWindow?.rootViewController
  }
}
```