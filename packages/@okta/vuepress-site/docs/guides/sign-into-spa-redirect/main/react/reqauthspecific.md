In this case, use `<SecureRoute>` for the routes that need to be secure, and `<Route>` for the ones that allow anonymous access. For example:

```jsx
<Security oktaAuth={this.oktaAuth} restoreOriginalUri={this.restoreOriginalUri} >
  <Route path="/" exact={true} component={Home} />
  <Route path="/cart" component={Cart} />
  <SecureRoute path="/checkout" component={Checkout} />
  <Route path="/login/callback" component={LoginCallback} />
</Security>
```
