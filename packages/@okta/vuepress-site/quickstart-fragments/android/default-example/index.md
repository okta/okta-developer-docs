---
libraryName: Native Android
---

## Okta Android Quickstart

This guide will walk you through integrating authentication into an Android app with Okta by performing these steps:

1. Add an OpenID Connect Client in Okta
2. Add Okta-AppAuth to your Android project
3. Implement Okta Sign-in
4. Handle the Login State
5. Using the AccessToken

At the end of the Android instructions you can choose your server type to learn more about post-authentication workflows, such as verifying tokens that your Android application can send to your server.

## Prerequisites

### Add an OpenID Connect Client
* Log into the Okta Developer Dashboard, click **Applications** then **Add Application**.
* Choose **Native app** as the platform, then populate your new OpenID Connect application with values similar to:

| Setting              | Value                                               |
| -------------------  | --------------------------------------------------- |
| Application Name     | My Android App                                      |
| Login redirect URIs  | {yourOktaScheme}:/callback                          |
| Logout redirect URIs | {yourOktaScheme:/logout                             |

After you have created the application there are two more values you will need to gather:

| Setting       | Where to Find                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------                                                      |
| Client ID     | In the applications list, or on the "General" tab of a specific application.                                                        |
| Org URL       | <span class="is-signed-in">`https://{yourOktaDomain}` <br></span>On the home screen of the developer dashboard, in the upper right. |


These values will be used in your Android application to setup the OpenID Connect flow with Okta.

## Add Okta-AppAuth to your Android Project
The simplest way to add authentication into an Android app is using the library [Okta AppAuth](https://bintray.com/okta/com.okta.android/okta-sdk-appauth-android), available through [JCenter](https://bintray.com/bintray/jcenter). To install it, simply add the following to your `build.grade`:

```
compile 'com.okta.android:appauth-android:0.1.0'
```

### Configuration
<DomainAdminWarning />
Create a new `okta_app_auth_config.json` file in your application's `res/raw` directory with the following contents:
```json
{
  "client_id": "{clientIdValue}",
  "redirect_uri": "{redirectUriValue}",
  "scopes": [
    "openid",
    "profile",
    "offline_access"
  ],
  "issuer_uri": "https://{yourOktaDomain}/oauth2/default"
}
```
**Note**: *To receive a **refresh_token**, you must include the `offline_access` scope.*

### Update the URI Scheme
In order to redirect back to your application from a web browser, you must specify a unique URI to your app. To do this, you must define a gradle manifest placeholder in your app's `build.gradle`:

```
android.defaultConfig.manifestPlaceholders = [
    "appAuthRedirectScheme": "com.okta.example"
]
```

Make sure this is consistent with the redirect URI used in `okta_app_auth_config.json`. For example, if your **Login Redirect URI** is `com.okta.example:/callback`, the **AppAuth Redirect Scheme** will be `com.okta.example`.

#### Chrome Custom Tabs `ERR_UNKNOWN_URL_SCHEME`

There is a [known issue](https://github.com/okta/okta-sdk-appauth-android/issues/8) when redirecting back to a URI scheme from the browser via Chrome Custom Tabs. This is due to Chrome **not supporting** JavaScript initiated redirects back to native applications.

More information on this topic is recorded in [this issue](https://github.com/okta/okta-sdk-appauth-android/issues/8).

## Implement Okta Sign-In
Users can sign in to your Android application a number of different ways.
The easiest, and most secure way is to use the **default login page**. This page renders the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/), equipped to handle User Lifecycle operations, MFA, and more.

First initialize the Okta AppAuth SDK in the `Activity#onCreate` method of the Activity that you are using to log users into your app. In this example, we will call it `LoginActivity`:

```java
// LoginActivity.java

import com.okta.appauth.android.OktaAppAuth;
import net.openid.appauth.AuthorizationException;

public class LoginActivity extends Activity {

    private OktaAppAuth mOktaAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mOktaAuth = OktaAppAuth.getInstance(this);

        // Do any of your own setup of the Activity

        mOktaAuth.init(
            this,
            new OktaAppAuth.OktaAuthListener() {
                @Override
                public void onSuccess() {
                    // Handle a successful initialization (e.g. display login button)
                }

                @Override
                public void onTokenFailure(@NonNull AuthorizationException ex) {
                    // Handle a failed initialization
                }
            }
        );
    }
}
```

Once the `OktaAppAuth` instance is initialized, you can start the authorization flow by simply calling `login` whenever you're ready:

```java
// LoginActivity.java

public void onSuccess() {
    // Handle a successful initialization (e.g. display login button)

    Intent completionIntent = new Intent(this, AuthorizedActivity.class);
    Intent cancelIntent = new Intent(this, LoginActivity.class);
    cancelIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

    mOktaAuth.login(
        this,
        PendingIntent.getActivity(this, 0, completionIntent, 0),
        PendingIntent.getActivity(this, 0, cancelIntent, 0)
    );
}
```

## Handle the Login State
In native applications, it is common for users to have a long-lived session. It is important for the app to manage the user's session by refreshing tokens when they expire, using the `refresh_token` or re-prompting the user to login. See [refreshing a token manually](https://github.com/okta/okta-sdk-appauth-android#refresh-a-token-manually) for more information.

When starting up the application, check for the existence of an `access_token` to see if the user has an existing session:

```java
// LoginActivity.java
@Override
protected void onCreate(Bundle savedInstanceState) {
    ...

    mOktaAuth = OktaAppAuth.getInstance(this);

    if (mOktaAuth.isUserLoggedIn()) {
        Log.i(TAG, "User is already authenticated, proceeding to protected activity");
        startActivity(new Intent(this, ProtectedActivity.class));
        finish();
        return;
    }
}
```

## Using the Access Token

Your Android application now has an access token in private Shared Preferences that was issued by your Okta Authorization server. You can use this token to authenticate requests for resources on your server or API. As a hypothetical example, let's say that you have an API that gives us messages for our user.  You could create a `callMessagesApi` function that makes an authenticated request to your server.

```java
private void callMessagesApi() {
    mOktaAuth.performAuthorizedRequest(new OktaAppAuth.BearerAuthRequest() {
        @NonNull
        @Override
        public HttpURLConnection createRequest() throws Exception {
            try {
                final URL myUrl = new URL("http://localhost:{serverPort}/api/messages");
                HttpURLConnection conn = (HttpURLConnection) myUrl.openConnection();
                conn.setInstanceFollowRedirects(false); // recommended during authorized calls
                return conn;
            } catch (MalformedURLException e) {
                Log.i(TAG, e.getLocalizedMessage());
            }
            return null;
        }

        @Override
        public void onSuccess(@NonNull InputStream inputStream) {
            // Handle successful response in the input stream
        }

        @Override
        public void onTokenFailure(@NonNull AuthorizationException e) {
            // Handle failure to acquire new tokens from Okta
        }

        @Override
        public void onFailure(int i, Exception e) {
            // Handle failure to make your authorized request or a response with a 4xx or
            // 5xx HTTP status response code
        }
    });
}
```

In the next section you can select your server technology to see how your server can read this incoming token and validate it.
