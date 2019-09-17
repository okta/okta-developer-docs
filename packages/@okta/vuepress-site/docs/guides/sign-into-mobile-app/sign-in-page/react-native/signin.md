The async `signIn` method will automatically redirect users to your Okta organziation for authentication. It will emit an event once a user successfully signs in. Make sure your event listeners are mounted and unmounted. Note: on iOS there isn't a onCancelled event. If the sign in process is cancelled, onError will be triggered.

```swift
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
