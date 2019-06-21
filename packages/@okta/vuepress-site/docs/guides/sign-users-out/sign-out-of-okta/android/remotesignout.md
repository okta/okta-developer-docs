#### Define a sign-out callback

Signing out of Okta requires the app to open a browser and navigate to the [end session endpoint](https://developer.okta.com/docs/reference/api/oidc/#logout). Okta destroys the user's session and immediately redirects back to your application.

To do this, you must define a callback route for the sign-out process. 

`TODO: Instructions to add signout redirect URI to gradle file`

Next, add it as an allowed **Logout redirect URI** in the Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, and then pick your application.
2. Select **General** and click **Edit**.
3. In the **Logout redirect URI**, enter the callback that you defined. For example, `com.okta.example:/signoutCallback`
4. Click **Save**.

`TODO: Is the rest handled by our OIDC SDK? Does the developer need to hook anything up in their app?`

#### Clear the Okta session

Clear the Okta session in the browser by calling:

```java
client.signOutFromOkta(this);
```