The `withOktaAuth` higher-order component, `OktaAuth`, and the `authState` props are used together to support sign-in and sign-out. You can use the `authState` prop to get the current authenticated state.

The `OktaAuth` service has methods for sign-in and sign-out.

In the `Home.js` code referenced above, there are buttons to support sign-in and sign-out. You can display either the sign-in or sign-out button based on the current authenticated state.

```jsx
render() {
  let body = null;
  if (this.props.authState?.isAuthenticated) {
    body = (
      <div className="Buttons">
        <button onClick={this.logout}>Logout</button>
        {/* Replace me with your root component. */}
      </div>
    );
  } else {
    body = (
      <div className="Buttons">
        <button onClick={this.login}>Login</button>
      </div>
    );
  }

...
}
```

The component also uses `withOktaAuth` and defines `login()` and `logout()` methods that are invoked when the buttons are pressed:

```jsx
export default withOktaAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login() {
    await this.props.oktaAuth.signInWithRedirect();
  }

  async logout() {
    await this.props.oktaAuth.signOut();
  }

  render () { ... }
  
}
```
