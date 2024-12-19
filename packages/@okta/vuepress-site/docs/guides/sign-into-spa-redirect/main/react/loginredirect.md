The `useOktaAuth` returns an object with the `oktaAuth` and `authState` properties. The `authState` property returns the current authenticated state. The `oktaAuth` property returns the Okta Auth SDK instance and has methods for sign-in and sign-out actions.

For class-based component, the `withOktaAuth` higher-order component, `OktaAuth`, and the `authState` props are used together to support sign-in and sign-out.

In the `Home.jsx` code referenced above, add the `useOktaAuth()` hook and define the sign-in and sign-out methods in the `Home` component.

```jsx
const { authState, oktaAuth } = useOktaAuth();
const signin = async () => await oktaAuth.signInWithRedirect();
const signout = async () => await oktaAuth.signOut();
```

Add the buttons to support sign-in and sign-out actions. You can display either the sign-in or sign-out button based on the current authenticated state. Replace the `    {/* Add sign in and sign out buttons */}`.

```jsx
<div>
  {!authState?.isAuthenticated && (
    <button onClick={signin}>Sign In</button>
  )}

  {authState?.isAuthenticated && (
    <button onClick={signout}>Sign Out</button>
  )}
</div>
```
