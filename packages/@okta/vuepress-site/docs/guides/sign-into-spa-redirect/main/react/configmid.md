The Okta React SDK requires an instance of an `OktaAuth` object with configuration properties. Set the `clientId` and `issuer` properties with the values from the CLI earlier. This can happen by directly setting the properties, with variable replacement that happens as part of the build process, or during app load time.

1. Update `src/App.jsx` to configure Okta with the following code, replacing the `issuer` and `clientId` placeholder values with your own values (see [Finding your config values](/docs/guides/sign-into-spa-redirect/react/main/#find-your-config-values)):

   ```jsx
   import { Route, Switch, useHistory } from 'react-router-dom';
   import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
   import { LoginCallback, Security } from '@okta/okta-react';
   import Home from './Home';

   const oktaAuth = new OktaAuth({
     issuer: 'https://{yourOktaDomain}/oauth2/default',
     clientId: '{yourClientID}',
     redirectUri: window.location.origin + '/login/callback',
     scopes: ['openid', 'profile', 'email', 'offline_access']
   });

   function App() {
     const history = useHistory();
     const restoreOriginalUri = (_oktaAuth,  originalUri) => {
       history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
     };

     return (
       <>
         <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
           <Switch>
               <Route path="/" exact component={Home}/>
               <Route path="/login/callback" component={LoginCallback}/>
           </Switch>
         </Security>
       </>
     );
   }

   export default App
   ```

1. Ensure that your default custom authorization server has an access policy. Add an access policy if it's not there. See [Create access polices](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-access-policies).

1. Install `react-router-dom` into your app with the following command:

   ```shell
   npm install react-router-dom@5.3.4
   ```

1. Update `src/main.jsx` to add routing:

   ```jsx
   import ReactDOM from 'react-dom/client'
   import { BrowserRouter } from 'react-router-dom'
   import App from './App.jsx'
   import './index.css'

   ReactDOM.createRoot(document.getElementById('root')).render(
     <BrowserRouter>
       <App />
     </BrowserRouter>,
   )
   ```

1. Add a `src/Home.jsx` file that renders the starting view for the application:

   ```jsx
   import { useOktaAuth } from '@okta/okta-react';
   import './App.css';
   import logo from './assets/react.svg';

   const Home = () => {

     return (
       <>
         <img src={logo} className="App-logo" alt="logo"/>
         {/* Add sign in and sign out buttons */}
         <p>Edit <code>src/Home.jsx</code> and save to reload.</p>
         <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
           Learn React
         </a>
       </>
     );
   }

   export default Home
   ```
