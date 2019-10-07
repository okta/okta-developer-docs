### Build a sign-in dialog box

To create a custom UI for user sign in, you need to first create a simple dialog box to prompt the user for their username and password:

```java
public class SignInDialog extends DialogFragment {
    private EditText password;
    private EditText username;
    private ExecutorService executor = Executors.newSingleThreadExecutor();
    private SignInDialogListener signInListener;

    /**
     * Instantiates a new sign-in dialog.
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

### Configure the primary authentication
When you use the primary authentication flow (no MFA, no password management, and so on), `AuthClient` needs the username and password from the user.

Initialize `AuthClient` and set up the dialog listener to get the username and password:

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

### Use the Okta Java Authentication SDK
After you initialize the `AuthClient` instance, obtain a one-time use `sessionToken` that you can exchange for tokens. Obtain a `sessionToken` using the [Okta Java Authentication SDK](https://github.com/okta/okta-auth-java).

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

After you have the `sessionToken`, you can exchange it for tokens by using `AuthClient`:

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
