In this guide, you create the user interface using several components. The following displays the flow of data through the components:

1. The user enters credentials in the `LoginScreen` text fields.
1. The field values are held as state in the `LoginViewModel`.
1. The user taps **Sign In**.
1. `LoginScreen` calls `viewModel.login()`.
1. `LoginViewModel` calls `authService.authenticate()`.
1. `AuthService` updates its `authenticationState` flow.
1. `LoginViewModel` collects the state change.
1. `LoginScreen` recomposes based on the new state.
1. When authenticated, the user can open `ProfileScreen` or `TokenDetailsScreen`.

This architecture keeps concerns separated: the composable handles presentation, the view model handles UI logic, and the service handles authentication business logic.
