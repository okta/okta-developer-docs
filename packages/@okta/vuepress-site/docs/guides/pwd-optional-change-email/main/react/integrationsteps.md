### 1. The user signs in your app

The user signs in to your app before they are able to change their primary email address. To learn more about integrating user sign in, see [Sign in with email only](docs/guides/pwd-optional-sign-in-email/react/main/).

<!-- The above react sign in guide will be completed in https://oktainc.atlassian.net/browse/OKTA-502075 -->

### 2. Your app displays a way to change the user's primary email

<div class="half border">

![Screenshot showing an edit link next to the primary email address.](/img/pwd-optional/pwd-optional-change-email-my-account-js-react-edit-email.png)

</div>

### 3. The user submits a new primary email

<div class="half border">

![Screenshot showing a page with a new primary email input field and continue button.](/img/pwd-optional/pwd-optional-change-email-my-account-js-react-submit-email.png)

</div>

```json
{
   "profile":{
      "email":"robnicolo+oie-2022-6f@gmail.com"
   },
   "sendEmail":true,
   "role":"PRIMARY"
}
```

```javascript
import {
  addEmail,
  getEmails,
  verifyEmailChallenge
} from '@okta/okta-auth-js/myaccount';

...

const handleAddEmail = async (role, email) => {
  return addEmail(oktaAuth, {
    payload: {
      profile: {
        email
      },
      sendEmail: true,
      role
    }
  });
};
```

### 4. Your app handles email verification response

```json
{
   "id":"97836bc9fe4743aac969726b0488e034",
   "status":"UNVERIFIED",
   "profile":{
      "email":"robnicolo+oie-2022-6f@gmail.com"
   },
   "roles":[
      "PRIMARY"
   ]
}
```

### 5. The user verifies their identity with the email authenticator

```json
{
   "verificationCode":"197277"
}
```


```javascript
...

if (transaction.status === 'UNVERIFIED') {
  if (transaction.verify) {
    await transaction.verify({ verificationCode: value });

...
```

### 5. Your app handles a successful identity verification

```javascript

...

} catch (err) {
  if (err.errorSummary === 'insufficient_authentication_context') {
    onFinish();
    startReAuthentication(err);
  } else {
    setError(err);
  }
}
```

> **Note:** In other use cases where additional sign-in authenticators are required, the user needs to choose and verify all required authenticators before `IdxTransaction.status` of `SUCCESS` is returned.

The function above returns a Promise that contains an [EmailTransaction](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/classes/EmailTransaction.md) object..
