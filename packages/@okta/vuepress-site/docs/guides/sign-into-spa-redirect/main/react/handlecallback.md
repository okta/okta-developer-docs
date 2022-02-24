The Okta React SDK has a `LoginCallback` component that handles the token exchange.

You've already included a route for the callback to the list of `<Route>` components in `src/App.js`. The path should match the path provided in the `redirectUri` property when configuring the `OktaAuth` instance.

```jsx
<Route path="/login/callback" component={LoginCallback}/>
```
