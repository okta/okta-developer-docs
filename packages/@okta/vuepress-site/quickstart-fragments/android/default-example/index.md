---
libraryName: Native Android
---

## Okta Android Quickstart

This guide will walk you through integrating authentication into an Android app with Okta by performing these steps:

1. Add an OpenID Connect Client in Okta
2. Add okta-oidc-android to your Android project
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
| Org URL       | <span class="is-signed-in">`https://${yourOktaDomain}` <br></span>On the home screen of the developer dashboard, in the upper right. |


These values will be used in your Android application to setup the OpenID Connect flow with Okta.

## Add okta-oidc-android to your Android Project

The simplest way to add authentication into an Android app is using the library [Okta OIDC](https://bintray.com/okta/com.okta.android/okta-oidc-android), available through [JCenter](https://bintray.com/bintray/jcenter). To install it, simply add the following to your `build.grade`:

```groovy
implementation 'com.okta.android:oidc-androidx:1.0.6'
```

### Configuration
<DomainAdminWarning />
Create a new `okta_oidc_config.json` file in your application's `res/raw` directory with the following contents:

```json
{
  "client_id": "{clientId}",
  "redirect_uri": "{redirectUri}",
  "end_session_redirect_uri": "{endSessionUri}",
  "scopes": [
    "openid",
    "profile",
    "offline_access"
  ],
  "discovery_uri": "https://{yourOktaDomain}"
}
```

**Note**: *To receive a **refresh_token**, you must include the `offline_access` scope.*

### Update the URI Scheme

In order to redirect back to your application from a web browser, you must specify a unique URI to your app. To do this, you must define a gradle manifest placeholder in your app's `build.gradle`:

```groovy
android.defaultConfig.manifestPlaceholders = [
    "appAuthRedirectScheme": "com.okta.example"
]
```

Make sure this is consistent with the redirect URI used in `okta_oidc_config.json`. For example, if your **Login Redirect URI** is `com.okta.example:/callback`, the **AppAuth Redirect Scheme** will be `com.okta.example`.

## Implement Okta Sign-In

Users can sign in to your Android application a number of different ways.
The easiest, and most secure way is to use the **default login page**. This page renders the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/), equipped to handle User Lifecycle operations, MFA, and more.

First initialize the Okta AppAuth SDK in the `Activity#onCreate` method of the Activity that you are using to log users into your app. In this example, we will call it `LoginActivity`:

```java
// LoginActivity.java

public class LoginActivity extends AppCompatActivity {

    private WebAuthClient client;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        OIDCConfig config = new OIDCConfig.Builder()
            .withJsonFile(this, R.raw.okta_oidc_config)
            .create();

        client = new Okta.WebAuthBuilder()
            .withConfig(mOidcConfig)
            .withContext(this)
            .create();

        ResultCallback<AuthorizationStatus, AuthorizationException> callback =
            new ResultCallback<AuthorizationStatus, AuthorizationException>() {
                @Override
                public void onSuccess(@NonNull AuthorizationStatus status) {
                }

                @Override
                public void onCancel() {
                }

                @Override
                public void onError(@Nullable String msg, AuthorizationException error) {
                }
        };
        client.registerCallback(callback, this);
    }
}
```

Once the `WebAuthClient` instance is initialized, you can start the authorization flow by simply calling `signIn` whenever you're ready:

```java
// LoginActivity.java

public void onClick(View v) {
    client.signIn(this, null);
}
```

## Handle the Login State

In native applications, it is common for users to have a long-lived session. It is important for the app to manage the user's session by refreshing tokens when they expire, using the `refresh_token` or re-prompting the user to login. See [refreshing a token manually](https://github.com/okta/okta-oidc-android/#Refresh-a-Token) for more information.

When starting up the application, check for the existence of an `access_token` to see if the user has an existing session:

```java
// LoginActivity.java
@Override
protected void onCreate(Bundle savedInstanceState) {
    ...

    SessionClient session = client.getSessionClient();

    if (session.isAuthenticated()) {
        Log.i(TAG, "User is already authenticated, proceeding to protected activity");
    }
}
```

## Using the Access Token

Your Android application now has an access token that was issued by your Okta Authorization server. You can use this token to authenticate requests for resources on your server or API. Authorized request to your own server endpoints will need to add the Authorization header with the access token, prefixed by the standard OAuth 2.0 of Bearer. If you are using Android's standard HttpURLConnection you can set the headers like the following:

```java
try {
    Tokens token = client.getSessionClient.getTokens();
    URL url = new URL("yourCustomUrl");
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    conn.setRequestProperty("Authorization", "Bearer " + token.getAccessToken());
} catch (AuthorizationException e) {
    //handle error
}
```

If using `OkHttp`, you can set the headers in the `Request` like the following:

```java
try {
    Tokens token = client.getSessionClient.getTokens();
    Request request = new Request.Builder()
        .url("yourCustomUrl")
        .addHeader("Authorization", "Bearer " + token.getAccessToken())
        .build();
} catch (AuthorizationException e) {
    //handle error
}
```

In the next section you can select your server technology to see how your server can read this incoming token and validate it.
