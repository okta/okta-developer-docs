The Okta Angular SDK has a callback component that handles the token exchange.

Add a new route for the callback to the `routes` array in `AppRoutingModule`. The path should match the path provided in the `redirectUri` property when configuring the `OktaAuth` instance in the `AppModule`.

```ts
{ path: 'login/callback', component: OktaCallbackComponent }
```