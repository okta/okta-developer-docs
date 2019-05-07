Login events can be triggered by `@IBAction`, `viewDidLoad`, or programmatically. To launch the event, first update your `AppDelegate` to include the following function to allow the redirect to occur:

Code sample

Then, you can start the authorization flow by simply calling `login`:

Code sample

## Handle the Login State

In native applications, it is common for users to have a long-lived session. It is important for the app to manage the user's session by refreshing tokens when they expire, using the `refresh_token` or re-prompting the user to sign in.

## Store the User's Tokens 

Tokens are securly stored in the Keychain. They are easily set and retrieved with the helper methods `set` and `get`.

Code sample
