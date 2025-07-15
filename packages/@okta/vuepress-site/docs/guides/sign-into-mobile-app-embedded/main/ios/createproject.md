Launch Xcode and create a new iOS app project using SwiftUI for the interface and Swift for the language.

> **Note:** The sample code uses SwiftUI features that are available in iOS 14 and the async/await feature of iOS 15. Use the completion handler versions of the async/await functions to enable the sample to run on iOS 14 and later. For information on the minimum iOS version supported by the current SDK, see [the support section of the README](https://github.com/okta/okta-mobile-swift#support-policy).


#### Add the UI

The functionality of the app is implemented in `ContentView.swift`, the main SwiftUI view. This includes view state, view model updates, and data model. For a production app, consider partitioning the view and data models into singletons, and then sharing state using Combine, bindings, or `@Environment`.

The app contains three areas:

* The top area contains buttons for signing in and out and for viewing information.
* The middle area shows the current app state.
* The lower area displays information text, such as the token.

The available buttons depend on the sign-in state of the user. The top-level `ZStack` contains a full-screen view that prevents the user from interacting with the UI while the app is performing certain asynchronous operations, such as reading the user information. A production app may also perform asynchronous operations that do require showing a busy indicator but don't require blocking the UI.

The following image shows the completed app in both the sign-in and signed-on states:

<div class="three-quarter border">

![Two iPhone images that show the signed-out and signed-in UI.](/img/sign-users-in/redirect-authentication/ios/app-ui-ios.png)

</div>

<!--
Source image(s): https://www.figma.com/file/i3huE0gEoISu2evquOq5yJ/app-ui-redirect-ios?node-id=0%3A1
There's only one board. The group for the image is: "Side-by-side screenshots"
-->

Open `ContentView.swift` and replace the `import` statements and the `ContentView` struct with the following code:

```swift
import SwiftUI

struct ContentView: View {
   // Used to display error messages.
   @State var showingError: Bool = false
   @State var errorMessage: String? = nil
   @State var errorTitle: String? = nil

   // The text shown in the status area.
   @State var statusText: String? = nil

   // Text shown in the main information area.
   @State var infoText: String? = ""

   // Controls what parts of the UI are shown.
   @State var isSignedIn: Bool = false

   // Controls showing a busy spinner that covers the main UI.
   @State var busy: Bool = false

   var body: some View {
      ZStack {
         VStack() {
            HStack {
               // Show the Sign In button or the Sign Out button with other options.
               if !isSignedIn {
                  Button("Sign In") {
                     signIn()
                  }
                  .padding()
               } else {
                  VStack {
                     HStack {
                        Button("Sign Out") {
                           signOut()
                        }
                        .padding()
                     }
                     HStack {
                        Button("Show User Info") {
                           showUserInfo()
                        }
                        Button("Show Token") {
                           showTokenInfo()
                        }
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
            Text(statusText ?? "Unknown status.")
            Divider()
            Text("Info")
               .fontWeight(.medium)
               .foregroundColor(Color.gray)
            ScrollView(showsIndicators: true) {
               Text(infoText ?? "")
            }
         }
         if busy {
            Color.gray
               .opacity(0.5)
            ProgressView("Waiting")
        }
      }
      .alert(isPresented: $showingError) {
         Alert(title: Text(errorTitle ?? "Unknown Error"),
         message: Text(errorMessage ?? "An unknow error occured."))
      }
   }

   func signIn() {
      infoText = "Sign in tapped"
   }

   func signOut() {
      infoText = "Sign out tapped"
   }

   func showUserInfo() {
      infoText =  "Show user info tapped"
   }

   func showTokenInfo() {
      infoText = "Show token info tapped"
   }

   func refreshToken() {
      infoText = "Refresh token tapped"
   }

   // Display and error message using an Error object.
   func showError(title: String, error: Error) {
      showError(title: title, message: error.localizedDescription)
   }

   // Display an error message using a provided string.
   func showError(title: String , message: String) {
      errorTitle = title
      errorMessage = message
      showingError = true
   }

   // A utility function that updates the state of all visual elements.
   func updateStatus(_ statusText: String, infoText: String, signedInStatus: Bool) {
      self.statusText = statusText
      self.infoText = infoText
      isSignedIn = signedInStatus
   }
}
```

The last three functions are utilities. The two overloads of `showError` set the state variables for the title and text of an alert, then set `showingError` that triggers the `.alert` view modifier to present the alert.

The last utility updates the status text, the info text, and the `signedIn` state variable that controls the buttons presented at the top of the UI.
