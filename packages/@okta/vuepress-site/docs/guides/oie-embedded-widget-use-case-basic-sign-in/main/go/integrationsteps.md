### Your app displays the sign-in page

Build a sign-in page that captures the user's name and password with the Widget. Ensure the page completes the steps described in [Load the Widget](/docs/guides/oie-embedded-widget-use-case-load/go/main/) when the page loads.

### The user submits their username and password

When the user submits their credentials, the widget sends an identify request to Identity Engine. OIE returns an interaction code to the sign-in redirect URI you configured earlier.

### Your app handles an authentication success response

Handle the callback from OIE to the sign-in redirect URI.

1. Check for any errors returned from OIE. If the user correctly supplies their password, there are no errors.
1. Call `idxClient.RedeemInteractionCode` to exchange the interaction code for the user's access token with the authorization server.
1. Store the tokens in session variables for future use.
1. Redirect the user to the default page after a successful sign-in attempt.

The user has now signed in.

```go
func (s *Server) LoginCallbackHandler(w http.ResponseWriter, r *http.Request) {

   // error handling elided

   accessToken, err := s.idxClient.RedeemInteractionCode(r.Context(), lr.Context(), r.URL.Query().Get("interaction_code"))
   if err != nil {
      log.Fatalf("access token error: %+v\n", err)
   }
   session.Values["id_token"] = accessToken.IDToken
   session.Values["access_token"] = accessToken.AccessToken
   session.Save(r, w)

   http.Redirect(w, r, "/", http.StatusFound)
}
```

### Get the user profile information

After the user signs in successfully, request basic user information from the authorization server using the tokens that were returned in the previous step.

```go
func (s *Server) getProfileData(r *http.Request) map[string]string {
   m := make(map[string]string)

   session, _ := s.sessionStore.Get(r, SESSION_STORE_NAME)
   if accessToken, found := session.Values["access_token"]; found {
      reqUrl := s.oAuthEndPoint("userinfo")
      req, _ := http.NewRequest("GET", reqUrl, bytes.NewReader([]byte("")))
      h := req.Header
      h.Add("Authorization", fmt.Sprintf("Bearer %s", accessToken))
      h.Add("Accept", "application/json")

      client := &http.Client{Timeout: time.Second * 30}
      resp, _ := client.Do(req)
      body, _ := ioutil.ReadAll(resp.Body)
      defer resp.Body.Close()
      json.Unmarshal(body, &m)
   }

   return m
}
```
