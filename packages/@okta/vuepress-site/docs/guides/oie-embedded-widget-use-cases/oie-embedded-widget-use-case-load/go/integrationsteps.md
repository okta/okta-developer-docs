### Step 1: Click on the sign-in page link

The first step occurs when the user clicks on the sign-in link. This link
points to the sign-in page where the Widget is embedded. On the sample application's homepage,
this link is named **Login** and located on the top right corner of the page.

### Step 2: Get Widget initialization data

When the sign-in page loads, obtain the parameters required for the Widget to load. Source these
parameters using multiple methods. The main parameters include:

* **Client ID, issuer, scopes:** source from the [configuration](/docs/guides/oie-embedded-common-download-setup-app/go/main/#configuration-settings)
* **Interaction Handle**: obtain from the `/interact` endpoint
* **PCKE parameters, state and nonce:** generate values
* **Base URL:** derive from issuer URL

These parameters are passed to the Widget as it loads on the page. Where you set these
values depends on the application. The sample application sets most of these values on the server
before the page is loaded in the `LoginHandler` method. See the following code for more
details:

```go
func (s *Server) LoginHandler(w http.ResponseWriter, r *http.Request) {
  type customData struct {
    IsAuthenticated   bool
    BaseUrl           string
    ClientId          string
    Issuer            string
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
    InteractionHandle: interactionHandle,
  }

  //Load the page with the Widget and data
  err = s.tpl.ExecuteTemplate(w, "login.gohtml", data)

 }
```

For more information on how to set these values, see the sample application.

### Step 3: Display Widget using initialization data

The next step is to build the page that will host the Widget. First, add the the following Okta javascript and css files:

```html
<script src="https://global.oktacdn.com/okta-signin-widget/5.8.1/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/5.8.1/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

Next, add a div tag that will host the Widget.

```html
<div id="okta-signin-widget-container"></div>
```

Finally, add the javascript that loads the Widget into the `div` tag. Note the parameters set in
[step 2](#step-2-get-widget-initialization-data) are being used to initialize the `OktaSignIn` object.

```javascript
<script type="text/javascript">
  var config = {};
  config.baseUrl = "{{ .BaseUrl }}";
  config.clientId = "{{ .ClientId }}";
  config.redirectUri = "http://localhost:8000/login/callback";
  config.interactionHandle = "{{ .InteractionHandle }}";
  config.useInteractionCodeFlow = "true";
  config.codeChallenge = "{{ .Pkce.CodeChallenge }}";
  config.codeChallengeMethod = "{{ .Pkce.CodeChallengeMethod }}";
  config.state = "{{ .State }}" || false,
  config.debug = true,
  config.authParams = {
    issuer: "{{ .Issuer }}",
    scopes: ['openid', 'profile', 'email'],
  };
  const signIn = new OktaSignIn({
    el: '#okta-signin-widget-container',
    ...config
  });
  signIn.showSignInAndRedirect()
    .catch(err => {
      console.log('Error happen in showSignInAndRedirect: ', err);
    });
</script>
```

### Step 4: Complete loading of Sign-in page

When the page loads successfuly, the Widget will display a sign-in form
similar to the following screenshot:

<div class="common-image-format">

![A screenshot of the sign-in widget showing the username and password](/img/oie-embedded-sdk/oie-embedded-widget-golang-sample-app-sign-in-page.png)

</div>
