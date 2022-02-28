In this case, use `<SecureRoute>` for the routes that you need to be secure, and `<Route>` for the ones that you want to allow anonymous access to. For example:

```jsx
<Security oktaAuth={this.oktaAuth} restoreOriginalUri={this.restoreOriginalUri} >
  <Route path='/' exact={true} component={Home} />
  <Route path='/cart' component={Cart} />
  <SecureRoute path='/checkout' component={Checkout} />
  <Route path='/login/callback' component={LoginCallback} />
</Security>
```
