The `authState` contains an `idToken` that contains the user profile claims. You can access it to display the user's claim as shown in the following `Profile` component.

1. Add a new file called `src/Profile.js`.

2. Add the following content to it:

```jsx
import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Header, Icon, Table } from 'semantic-ui-react';

const Profile = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      setUserInfo(authState.idToken.claims);
      // You can also get user information from the `/userinfo` endpoint
      /*oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });*/
    }
  }, [authState, oktaAuth]); // Update if authState changes

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Header as="h1">
          <Icon name="drivers license" />
          {' '}
          My User Profile (ID Token Claims)
          {' '}
        </Header>
        <p>
          Below is the information from your ID token which was obtained during the &nbsp;
          <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">PKCE Flow</a>
          {' '}
          and is now stored in local storage.
        </p>
        <p>
          This route is protected with the
          {' '}
          <code>&lt;SecureRoute&gt;</code>
          {' '}
          component, which will ensure that this page cannot be accessed until you have authenticated.
        </p>
        <Table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(userInfo).map((claimEntry) => {
              const claimName = claimEntry[0];
              const claimValue = claimEntry[1];
              const claimId = `claim-${claimName}`;
              return (
                <tr key={claimName}>
                  <td>{claimName}</td>
                  <td id={claimId}>{claimValue.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Profile;
```

3. Install `semantic-ui-react` into your app with the following command:

```shell
npm install semantic-ui-react
```

4. Import `Profile` into `src/App.js` by adding the following:

```jsx
import Profile from './Profile';
```

5. Add a new route to the list of `<Route>` components in `src/App.js` to represent the `/profile` route:

```jsx
<Route path="/profile" component={Profile}/>
```
