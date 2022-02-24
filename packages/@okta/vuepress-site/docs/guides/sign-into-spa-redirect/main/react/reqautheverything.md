The Okta React SDK has a `<SecureRoute>` component to check for the authenticated state that you can add to protected routes. For example, you can make all your routes require auth, except for the callback route.

```jsx
<Security oktaAuth={oktaAuth} restoreOriginalUri={this.restoreOriginalUri}>
  <SecureRoute path="/" exact={true} component={Home}/>
  <Route path="/login/callback" component={LoginCallback}/>
  <SecureRoute path="/profile" component={Profile}/>
</Security>
```