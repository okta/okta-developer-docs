### Response handling

The SDK provides two options, Promise and Event listener, to handle responses. You can choose either approach based on your preference.

#### Handle response in Promise

The `signIn` function returns a Promise if user credentials (username, password) are provided. Success and error responses can be easily handled in the standard Promise way.

```javascript
import { signIn } from '@okta/okta-react-native';

class LoginScreen extends React.Component {

    /* code from last section */

    login() {
        const { username, password } = this.state;
        signIn({ username, password })
            .then(token => {
                // handle success response
            })
            .catch(error => {
                // handle error response
            });
    }

    /* code from last section */
}
```

#### Handle response in Event listener

You can also register event listeners from the `EventEmitter` function in the SDK to handle responses.

**Note:** Make sure that listeners are properly unregistered by using `componentWillMount`.

```javascript
import { EventEmitter } from '@okta/okta-react-native';

class LoginScreen extends React.Component {

    /* code from last section */

    // register listeners
    componentDidMount() {
        EventEmitter.addListener('signInSuccess', (e) => {
            // handle success response
        });

        EventEmitter.addListener('onError', (e) => {
            // handle error response
        });
    }

    // unregister listeners
    componentWillUnmount() {
        EventEmitter.removeAllListeners('signInSuccess');
        EventEmitter.removeAllListeners('onError');
    }

    /* code from last section */
}
```

#### Handle transaction state

As transaction states are evaluated during primary authentication, this SDK also exposes a `getAuthClient` function to return an instance of `@okta/okta-auth-js` client to handle [Authentication API](/docs/reference/api/authn/) communication. See [Node JS and React Native Usage](https://github.com/okta/okta-auth-js#node-js-and-react-native-usage) for more information.

One general use case is that you can resume a transaction from the `authClient` to continue handling transactions for statuses other than `SUCCESS`.

```javascript
import { getAuthClient } from '@okta/okta-react-native';

const authClient = getAuthClient();
authClient.tx.resume(); // return Promise
```

