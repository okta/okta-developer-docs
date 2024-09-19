### 1: The user clicks the sign-in page link

The first step occurs when the user clicks the sign-in link. This link
directs the user to the sign-in page where the Widget is embedded. On the sample application's landing page, this link is labelled **Login** and located in the upper-right corner of the page.

### 2: Get the data to initialize the Widget

Obtain the parameters required to display the Widget when the sign-in page loads. Source these
parameters using different methods. The main parameters include:

* Client ID, issuer, scopes &mdash; sourced from the [configuration settings](/docs/guides/oie-embedded-common-download-setup-app/go/main/#configuration-settings)
* Interaction Handle &mdash; obtained from the `/interact` endpoint
* PKCE parameters, otp, state, and nonce &mdash; generated values
* Base URL &mdash; derived from the issuer URL

These parameter are passed to the Widget during page load. The sample application sets most
of these values in the `LoginHandler` method.

```go
func (s *Server) LoginHandler(w http.ResponseWriter, r *http.Request) {
  type customData struct {
    IsAuthenticated   bool
    BaseUrl           string
    ClientId          string
    Issuer            string
    Otp                string
    State             string
    Nonce             string
    InteractionHandle string
    Pkce              *PKCE
  }

  //Get PKCE info (code verifier, code challenge, and challenge method)
  s.pkce, err = createPKCEData()

  //Place in session
  session.Values["pkce_code_verifier"] = s.pkce.CodeVerifier
  session.Values["pkce_code_challenge"] = s.pkce.CodeChallenge
  session.Values["pkce_code_challenge_method"] = s.pkce.CodeChallengeMethod
  session.Save(r, w)

  //Get nonce
  nonce, err := generateNonce()

  //Get interaction handle
  interactionHandle, err := s.getInteractionHandle(s.pkce.CodeChallenge)
  s.interactionHandle = interactionHandle

  //Get Issuer
  issuerURL := fmt.Sprintf("%s/", s.config.Okta.IDX.Issuer)
  issuerParts, err := url.Parse(issuerURL)
  baseUrl := issuerParts.Scheme + "://" + issuerParts.Hostname()

  //Setup the data for the Widget
  data := customData{
    IsAuthenticated:   s.isAuthenticated(r),
    BaseUrl:           baseUrl,
    ClientId:          s.config.Okta.IDX.ClientID,
    Issuer:            s.config.Okta.IDX.Issuer,
    State:             s.state,
    Nonce:             nonce,
    Pkce:              s.pkce,
    Otp:              s.otp,
    InteractionHandle: interactionHandle,
  }

  //Load the page with the Widget and data
  err = s.tpl.ExecuteTemplate(w, "login.gohtml", data)

 }
```

### 3: Display the Widget using initialization data

Add the Sign-In Widget source to your sign-in page by referencing the Okta CDN, using the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the widget: -=OKTA_REPLACE_WITH_WIDGET_VERSION=-

```html
<script src="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

See also [Using the Okta CDN](https://github.com/okta/okta-signin-widget#using-the-okta-cdn).

Next, add a container `div` element for the Widget.

```html
<div id="okta-signin-widget-container"></div>
```

Finally, add the JavaScript that loads the Widget into the `div` element. The parameters set in
[step 2](#_2-get-the-data-to-initialize-the-widget) are being used to initialize the `OktaSignIn` object.

```html
<script type="text/javascript">
  var config = {};
  config.baseUrl = "{{ .BaseUrl }}";
  config.clientId = "{{ .ClientId }}";
  config.redirectUri = "http://localhost:8000/login/callback";
  config.interactionHandle = "{{ .InteractionHandle }}";
  config.codeChallenge = "{{ .Pkce.CodeChallenge }}";
  config.codeChallengeMethod = "{{ .Pkce.CodeChallengeMethod }}";
  config.debug = true;
  config.authParams = {
    issuer: "{{ .Issuer }}",
    scopes: ['openid', 'profile', 'email'],
  };

   const signIn = new OktaSignIn({
    el: '#okta-signin-widget-container',
    ...config
  });

   // Search for URL Parameters to see if a user is being routed to the application to recover password
   var searchParams = new URL(window.location.href).searchParams;
   signIn.otp = searchParams.get('otp');
   signIn.state = searchParams.get('state');

   signIn.showSignInAndRedirect()
    .catch(err => {
      console.log('Error happen in showSignInAndRedirect: ', err);
    });
</script>
```

> **Important**: In Okta Sign-In Widget version 7+, Identity Engine is enabled by default. If you are using an earlier version than 7, you must explicitly enable Identity Engine features by setting `config.useInteractionCodeFlow = "true";` in the configuration settings shown above. If you are using version 7+ and you want to use Okta Classic Engine rather than Identity Engine, specify `config.useClassicEngine = "true";` in the configuration settings.

### 4: Complete the sign-in page load

After the sign-in page is successfully loaded, the embedded Sign-In Widget appears:

<div class="half">

![Screenshot of basic Okta Sign-In Widget](/img/siw/okta-sign-in-javascript.png)

</div>
