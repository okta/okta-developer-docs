The Okta React SDK has a `LoginCallback` component that handles the token exchange.

You already included a route for the callback to the list of `<Route>` components in `src/App.jsx`. The path should match the path provided in the `redirectUri` property when you configure the `OktaAuth` instance.

```jsx
<Route path="/login/callback" exact component={LoginCallback}/>
```
