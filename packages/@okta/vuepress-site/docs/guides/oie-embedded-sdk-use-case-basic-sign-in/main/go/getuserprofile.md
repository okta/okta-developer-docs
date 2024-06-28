## Get the user profile information (optional)

After the user signs in successfully, request basic user information from the authorization server using the tokens that were returned in the previous step.

```go
func getProfileData(r *http.Request) map[string]string {
  m := make(map[string]string)

  session, err := sessionStore.Get(r, "okta-custom-login-session-store")

  if err != nil || session.Values["access_token"] == nil ||
     session.Values["access_token"] == "" {
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
