### Build a sign in form

To create a custom UI for user sign-in, you need to first create a simple form to prompt the user for their username and password:

```javascript
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.login = this.login.bind(this);
  }

  login() {
    // TODO in Primary authentication section
  }

  render() {
    return (
      <SafeAreaView>
        <Text>Native Sign-In</Text>
        <View style={{ flexDirection: 'column' }}>
          <TextInput
            placeholder="User Name"
            onChangeText={username => this.setState({ username })}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
          <View style={{ marginTop: 40, height: 40 }}>
            <Button
              testID="loginButton"
              onPress={this.login}
              title="Login"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
```

### Primary authentication

The SDK supports the primary authentication flow since version 1.4.0. You can implement primary authentication by calling the `signIn` function.

The following code example is a continuous work of the `login` method from the last section.

```javascript
import { signIn } from '@okta/okta-react-native';

class LoginScreen extends React.Component {

  /* code from last section */

  login() {
    const { username, password } = this.state;
    signIn({ username, password });
  }

  /* code from last section */
}
```