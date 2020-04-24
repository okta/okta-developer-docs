### Response handling

The SDK provides two options, Promise and Event listener, to handle responses. You can choose either approach base on your preference.

#### Handle response in Promise

The `signIn` function will return a Promise if user credentials (username, password) had been provided. Success and error reposonse can be easily handled in standard Promise way.

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

You can also register event listeners from `EventEmitter` function in the SDK to handle responses. 

**Note:** Please make sure listeners will be properly unregistered in component.

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

As `transaction states` are evaludated during primary authentication, this SDK also exposes `getAuthClient` function to return an instance of `@okta/okta-auth-js` client to handle [Authentication API](https://developer.okta.com/docs/reference/api/authn/) communication. Please refer to [Node JS and React Native Usage](https://github.com/okta/okta-auth-js#node-js-and-react-native-usage) for more information.

One general use case is you can resume transaction from the `authClient` to continue handling transactions for status other than `SUCCESS`.

```javascript
import { getAuthClient } from '@okta/okta-react-native';

const authClient = getAuthClient();
authClient.tx.resume(); // return Promise
```

