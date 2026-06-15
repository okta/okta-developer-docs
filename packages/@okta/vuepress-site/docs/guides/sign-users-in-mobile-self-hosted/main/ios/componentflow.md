In this guide, you create the user interface using several components. The following displays the flow of data through the components:

1. The user enters credentials in the `LoginView` text fields.
1. The text field values are bound to the `LoginViewModel` properties.
1. The user taps **Sign In**.
1. `LoginView` calls `viewModel.login()`.
1. `LoginViewModel` calls `authService.authenticate()`.
1. `AuthService` updates its state.
1. `LoginViewModel` observes the state change.
1. `LoginView` automatically re-renders based on the new state.
1. When authenticated, the user can go to `ProfileView` or `TokenDetailsView`.

This architecture keeps concerns separated: the view handles presentation, the view model handles UI logic, and the service handles authentication business logic.
