Your code can get the user's profile using the [getUserInfo()](https://github.com/okta/okta-auth-js#tokengetuserinfoaccesstokenobject-idtokenobject) method on the [OktaAuth](https://github.com/okta/okta-auth-js) object. You should wait until the `authState.isAuthenticated` flag is true.

For function-based components, `authState` and `oktaAuth` are returned by the [useOktaAuth](https://github.com/okta/okta-react#useoktaauth) hook.

For class-based components, `authState` and `oktaAuth` are passed as props to your component via the [withOktaAuth](https://github.com/okta/okta-react#withoktaauth) higher-order component.

Function-based component:

```javascript
import { useOktaAuth } from "@okta/okta-react";
import React, { useState, useEffect } from "react";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUserInfo().then(info => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  return (
    <div>
      {userInfo && (
        <div>
          <p>Welcome back, {userInfo.name}!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
```

Class-based component:

```javascript
import { withOktaAuth } from "@okta/okta-react";
import React, { Component } from "react";

async function checkUser() {
  if (this.props.authState.isAuthenticated && !this.state.userInfo) {
    const userInfo = await this.props.oktaAuth.getUserInfo();
    if (this._isMounted) {
      this.setState({ userInfo });
    }
  }
}

export default withOktaAuth(
  class Home extends Component {
    _isMounted = false;

    constructor(props) {
      super(props);
      this.state = { userInfo: null };
      this.checkUser = checkUser.bind(this);
    }

    async componentDidMount() {
      this._isMounted = true;
      this.checkUser();
    }

    async componentDidUpdate() {
      this._isMounted = true;
      this.checkUser();
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      return (
        <div>
          {this.state.userInfo && (
            <div>
              <p>Welcome back, {this.state.userInfo.name}!</p>
            </div>
          )}
        </div>
      );
    }
  }
);
```
