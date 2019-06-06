
```json
// if ( data.context.conflicts == ["login"] ) {
// newLoginValue = addUniqueness ( data.user.profile.login );
// }
// 
// Maybe infix an integer, e.g. "joe.smith@example.com" becomes
// "joe.smith0001@example.com". Keep track somewhere, so that if yet another
// joe.smith comes in, they get the next number. Or, pick some easier scheme,
// anything to change the value so that it's not in conflict
// anymore.
//
// newLoginValue will be used when formulating the commands object in the response
// that will be sent back to Okta.
```
