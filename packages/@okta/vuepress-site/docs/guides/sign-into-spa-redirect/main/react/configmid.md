The Okta React SDK requires an instance of an `OktaAuth` object with configuration properties. You need to set the `clientId` and `issuer` properties with the values you got from the CLI earlier. This can happen by directly setting the properties, with variable replacement that happens as part of the build process, or during application load time.

1. Update `src/App.js` to configure Okta as shown below, replacing the placeholder values with your own values:

   ```jsx
   import React, { Component } from 'react';
   import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
   import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
   import { LoginCallback, Security, SecureRoute } from '@okta/okta-react';
   import Home from './Home';

   const oktaAuth = new OktaAuth({
     issuer: 'https://{yourOktaDomain}/oauth2/default',
     clientId: '{yourClientID}',
     redirectUri: window.location.origin + '/login/callback',
     scopes: ['openid', 'offline_access']
   });

   class App extends Component {

     constructor(props) {
       super(props);
       this.restoreOriginalUri = async (_oktaAuth, originalUri) => {
         props.history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
       };
     }

     render() {
       return (
         <Security oktaAuth={oktaAuth} restoreOriginalUri={this.restoreOriginalUri}>
           <Route path="/" exact={true} component={Home}/>
           <Route path="/login/callback" component={LoginCallback}/>
         </Security>
       );
     }
   }

   const AppWithRouterAccess = withRouter(App);

   class RouterApp extends Component {
     render() {
       return (<Router><AppWithRouterAccess/></Router>);
     }
   }

   export default RouterApp;
   ```

2. Install `react-router-dom` into your app with the following command:

   ```shell
   npm install react-router-dom@5
   ```

   > **Note**: This example only works with React Router v5. There's an [open issue](https://github.com/okta/okta-react/issues/178) to support React Router v6.

3. Replace the `clientId` and `issuer` placeholder values with the values that you obtained earlier.

4. Add a `src/Home.js` file that renders login and logout buttons:

   ```jsx
   import React, { Component } from 'react';
   import { withOktaAuth } from '@okta/okta-react';
   import './App.css';
   import logo from './logo.svg';

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

       return (
         <div className="App">
           <header className="App-header">
             <img src={logo} className="App-logo" alt="logo"/>
             <p>
               Edit <code>src/Home.js</code> and save to reload.
             </p>
             <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
               Learn React
             </a>
             {body}
           </header>
         </div>
       );
     }
   });
   ```
