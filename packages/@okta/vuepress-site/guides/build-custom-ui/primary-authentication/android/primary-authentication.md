### Building UI

In this example we will show how to create a custom UI for user sign-in. First we will create a simple dialog to ask for username and password:

```java
public class SignInDialog extends DialogFragment {
    private EditText password;
    private EditText username;
    private ExecutorService executor = Executors.newSingleThreadExecutor();
    private SignInDialogListener signInListener;

    /**
     * Instantiates a new Login dialog.
     */
    public SignInDialog() {
        //NO-OP
    }

    /**
     * The interface dialog listener.
     */
    public interface SignInDialogListener {
        /**
         * On SignIn.
         *
         * @param username the username
         * @param password the password
         */
        void onSignIn(String username, String password);
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.signin_dialog, container, false);

        password = view.findViewById(R.id.password);
        username = view.findViewById(R.id.username);
        Button signIn = view.findViewById(R.id.submit);
        signIn.setOnClickListener(v -> {
            if (signInListener != null) {
                signInListener.onSignIn(username.getText().toString(), password.getText().toString());
            }
        });
        return view;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        signInListener = null;
    }

    /**
     * Sets listener.
     *
     * @param listener the listener
     */
    public void setListener(SignInDialogListener listener) {
        signInListener = listener;
    }
}
```

### Primary authentication

With the primary authentication flow(no MFA, no Password management and etc.) `AuthClient` needs a username and password inputs from the user.
Here we initialize the `AuthClient` and setup the dialog listener to get the username and password:

```java
public class SampleActivity extends AppCompatActivity implements SignInDialog.SignInDialogListener {
    private SignInDialog signInDialog;
    private AuthClient client;
    private SessionClient sessionClient;
    private Button signIn;
    private String sessionToken;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sample_activity);
        OIDCConfig config = new OIDCConfig.Builder()
            .withJsonFile(this, R.id.okta_oidc_config)
            .create();

        client = new Okta.AuthBuilder()
            .withConfig(config)
            .withContext(this)
            .withStorage(new SharedPreferenceStorage(this))
            .create();

        sessionClient = client.getSessionClient();
        signIn = findViewById(R.id.sign_in_custom);

        signIn.setOnClickListener(v -> {
            FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
            Fragment prev = getSupportFragmentManager().findFragmentByTag("signin");
            if (prev != null) {
                ft.remove(prev);
            }
            ft.addToBackStack(null);
            signInDialog = new SignInDialog();
            signInDialog.setListener(this);
            signInDialog.show(ft, "signin");
        });
    }
    //dialog listener callback
    @Override
    public void onSignIn(String username, String password) {
        //Use Okta Authentication SDK
    }
}
```

### Using Okta Java Authentication SDK

After the `AuthClient` instance is initialized, we will need to obtain a one time use `sessionToken` that can be exchanged for `Tokens`. You can obtain a `sessionToken` by using [Okta Java Authentication SDK](https://github.com/okta/okta-auth-java):

Add the following to your `build.gradle` file:

```gradle
dependencies{
    implementation 'com.okta.authn.sdk:okta-authn-sdk-api:0.4.0'
    runtimeOnly 'com.okta.authn.sdk:okta-authn-sdk-impl:0.4.0'
    runtimeOnly 'com.okta.sdk:okta-sdk-okhttp:1.5.2'
    runtimeOnly 'com.squareup.okhttp3:okhttp:3.14.1'
}

```

Then implement the callback `onSignIn`:

```java
@Override
public void onSignIn(String username, String password) {
    signInDialog.dismiss();
    AuthenticationClients authenticationClient = null;
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
        authenticationClient = AuthenticationClients.builder()
        .setOrgUrl("https://{yourOrgUrl}").build();
    }
    executor.submit(() -> {
        try {
            if (authenticationClient == null) {
                return;
            }
            authenticationClient.authenticate(username, password.toCharArray(),null, new AuthenticationStateHandlerAdapter() {
                @Override
                public void handleUnknown(AuthenticationResponse authenticationResponse) {
                    //Handle response
                }

                @Override
                public void handleLockedOut(AuthenticationResponse lockedOut) {
                    //Handle response
                }

                @Override
                public void handleSuccess(AuthenticationResponse successResponse) {
                    sessionToken = successResponse.getSessionToken();
                }
            } catch (AuthenticationException e) {
                //Handle exception
            }
        });
    }
}
```

Once you have the `sessionToken` you can exchange it for tokens by using `AuthClient`:

```java
client.signIn(sessionToken, null,new RequestCallback<Result, AuthorizationException>() {
    @Override
    public void onSuccess(@NonNull Result result) {
        try {
            //sessionClient instance is now authorized.
            Tokens tokens = sessionClient.getTokens();
        } catch (AuthorizationException e) {
            //Handle error
        }
    }

    @Override
    public void onError(String error, AuthorizationException exception) {
        //Handle error
    }
});
```
