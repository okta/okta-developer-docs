### 1: The user signs in

After the Widget
[loads](/docs/guides/oie-embedded-widget-use-case-load/go/main/),
the user enters their credentials through the Widget and clicks **Sign in**. The sign-in
request is sent to Okta, which returns a response identifying the next steps that need to
be taken.

### 2: Handle the callback from Okta

The sign-in response is sent to the URL defined in the **Sign-in redirect URIs** field
you've configured in [Create a new application](/docs/guides/oie-embedded-common-org-setup/go/main/#create-a-new-application).
The response contains an `interaction_code`, that you'll use in the next step to retrieve
the tokens. As shown in the following code snipet, provide a way to specify how requests to
this URL should be handled:

```go
r.HandleFunc("/login/callback", s.LoginCallbackHandler).Methods("GET")
```

### 3: Get and store the tokens and redirect the request to the default sign-in page

Next, call the `/token` endpoint and pass in the returned `interaction_code` and the
PCKE parameters you created in
[2: Get data to initialize the Widget](/docs/guides/oie-embedded-widget-use-case-load/go/main/#_2-get-data-to-initialize-the-widget). After the tokens are fetched, store them in a
session for later use. The following code snippet details how to fetch and store these tokens.

```go
func (s *Server) LoginCallbackHandler(w http.ResponseWriter, r *http.Request) {

  //Create request to get tokens
  q := r.URL.Query()
  q.Del("state")

  q.Add("grant_type", "interaction_code")
  q.Set("interaction_code", r.URL.Query().Get("interaction_code"))
  q.Add("client_id", s.config.Okta.IDX.ClientID)
  q.Add("client_secret", s.config.Okta.IDX.ClientSecret)
  q.Add("code_verifier", session.Values["pkce_code_verifier"].(string))

  var url string
  url = s.config.Okta.IDX.Issuer + "/oauth2/v1/token?" + q.Encode()

  req, _ := http.NewRequest("POST", url, bytes.NewReader([]byte("")))
  req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

  client := &http.Client{}

  // Make request
  resp, err := client.Do(req)
  body, err := ioutil.ReadAll(resp.Body)

  defer resp.Body.Close()

  var exchange Exchange
  err = json.Unmarshal(body, &exchange)

  //Verify returned tokens
  _, verificationError := s.verifyToken(exchange.IdToken)

  //Place tokens in session state
  s.cache.Add(fmt.Sprintf("%s-id_token", session.ID), exchange.IdToken, time.Hour)
  s.cache.Add(fmt.Sprintf("%s-access_token", session.ID), exchange.AccessToken, time.Hour)

  http.Redirect(w, r, "/", http.StatusFound)
}

```

### 4 (Optional): Get the user profile information

You can obtain basic user information by making a request to the authorization server.
Make a call to the [`/v1/userinfo`](/docs/reference/api/oidc/#userinfo) endpoint using the tokens obtained from the `LoginResponse`
object's `Token` property.

```go
func getProfileData(r *http.Request) map[string]string {
  m := make(map[string]string)

  session, err := sessionStore.Get(r, "okta-custom-login-session-store")

  if err != nil || session.Values["access_token"] == nil || session.Values["access_token"] == "" {
    return m
  }

  reqUrl := os.Getenv("ISSUER") + "/v1/userinfo"

  req, _ := http.NewRequest("GET", reqUrl, bytes.NewReader([]byte("")))
  h := req.Header
  h.Add("Authorization", "Bearer "+session.Values["access_token"].(string))
  h.Add("Accept", "application/json")

  client := &http.Client{}
  resp, _ := client.Do(req)
  body, _ := ioutil.ReadAll(resp.Body)
  defer resp.Body.Close()
  json.Unmarshal(body, &m)

  return m
}
```
