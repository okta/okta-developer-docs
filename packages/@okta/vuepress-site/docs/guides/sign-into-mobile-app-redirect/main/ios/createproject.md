Launch Xcode and create a new iOS app project using SwiftUI for the interface and Swift for the language.

> **Note:** The sample code uses the async/await feature of iOS 15 and later. Replacing those with calls that use completion handlers adds compatibility for iOS 14 and later.

#### Add the UI

The functionality of the app is implemented in the main SwiftUI view, including view state, view model updates, and data model. For a production app, consider partitioning the view and data models into singletons, and then using Combine, bindings, or `@Environment` for sharing state.

The text views in the app display its current state and any optional information, such as the access token. The available buttons depend on the sign-in state of the user. The top-level `ZStack` contains a full-screen view that prevents the user tapping the UI the app is performing certain asynchronous operations, such as reading the user information. A production app may also perform asynchronous operations that do require showing a busy indicator but don't require blocking the UI.

The following image shows the completed app in both the sign-in and signed-on states:

<div class=”full”>

<!-- <div class="common-image-format"> -->

![Two iPhone screenshots that show the signed-out and signed-in UI.](/img/sign-users-in/redirect-authentication/ios/app-ui-ios.png)

</div>

<!--
TODO: Source image(s): <url-of-source-figma-board> <name-label-of-image-inside-figma-board>
-->

Open `ContentView.swift` and replace it with the following code:

```swift
import SwiftUI
import AuthFoundation
import WebAuthenticationUI

struct ContentView: View {
   // Used for displaying error messages.
   @State var showingError: Bool = false
   @State var errorMessage: String? = nil
   @State var errorTitle: String? = nil

   // Text shown in the status area.
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
                        .padding()
                        Button("Show Token") {
                           showTokenInfo()
                        }
                        .padding()
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

   func signIn() async {
      print("Sign in tapped")
   }

   func signOut() async {
      print("Sign out tapped")
   }

   func showTokenInfo() {
      print("Show token info tapped")
   }

   func showUserInfo() async {
      print("Show user info tapped")
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

   // A utility function to update the state of all visual elements.
   func updateStatus(_ statusText: String, infoText: String, signedInStatus: Bool) {
      self.statusText = statusText
      self.infoText = infoText
      isSignedIn = signedInStatus
   }
}
```

The last three functions are utilities. The two variants of `showError` set the state variables for the title and text of an alert, then set `showingError` which triggers the .alert view modifier to present the alert.

The last utility updates the status text, the info text, and the `signedIn` state variable that controls the buttons presented at the top of the UI.
