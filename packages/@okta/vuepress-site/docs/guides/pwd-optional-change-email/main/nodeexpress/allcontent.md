Allowing a user to change their primary email is a critical task when they only use their username and email address to sign in to your app. Much like a password, a user must be able to change their email address, especially if it becomes compromised. In your backend app that uses the <StackSnippet snippet="sdklink" inline/> for authentication, use the <StackSnippet snippet="mgmtsdklink" inline/> to enable your users to change their primary emails.

Specifically, in your app that uses the <StackSnippet snippet="mgmtsdklink" inline/> , set the `User` object's `profile.email` property to the new primary email and then call `update()` to save the changes.

```javascript
client.getUser('johndoe@okta.com').then(user => {
  user.profile.email = 'johndoeprimaryemail@okta.com';
  user.update().then(() => console.log('New user primary email has been saved'));
});
```

>**Note**: The <StackSnippet snippet="mgmtsdklink" inline/> uses the [Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/updateUser) to update the user's profile information.
