The async `signIn` method automatically redirects users to your Okta organization for authentication. It emits an event once a user successfully signs in. Make sure your event listeners are mounted and unmounted.
**Note:** On iOS there isn't an `onCancelled` event. If the sign-in process is cancelled, `onError` is triggered.

```javascript
import { signIn, EventEmitter } from '@okta/okta-react-native';

componentDidMount() {
  this.signInSuccess = EventEmitter.addListener('signInSuccess', function(e: Event) {
    console.log(e.access_token);
    console.log(e.refresh_token);
    // Do something ...
  });
  this.signOutSuccess = EventEmitter.addListener('signOutSuccess', function(e: Event) {
    //...
  });
  this.onError = EventEmitter.addListener('onError', function(e: Event) {
    //...
  });
  this.onCancelled = EventEmitter.addListener('onCancelled', function(e: Event) {
    //...
  });

  signIn();
}

componentWillUnmount() {
  this.signInSuccess.remove();
  this.signOutSuccess.remove();
  this.onError.remove();
  this.onCancelled.remove();
}
```
