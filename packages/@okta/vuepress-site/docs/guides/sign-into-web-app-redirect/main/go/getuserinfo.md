1. Add the following code to return the user's info upon a successful sign-in flow (again, see [`server/controller.go`](https://github.com/okta-samples/okta-go-gin-sample/blob/main/server/controller.go)):

   ```go
   func getProfileData(r *http.Request) (map[string]string, error) {
      m := make(map[string]string)

      session, err := sessionStore.Get(r, "okta-hosted-login-session-store")

      if err != nil || session.Values["access_token"] == nil || session.Values["access_token"] == "" {
         return m, nil
      }

      reqUrl := os.Getenv("OKTA_OAUTH2_ISSUER") + "/v1/userinfo"

      req, err := http.NewRequest("GET", reqUrl, nil)
      if err != nil {
         return m, err
      }

      h := req.Header
      h.Add("Authorization", "Bearer "+session.Values["access_token"].(string))
      h.Add("Accept", "application/json")

      client := &http.Client{}
      resp, err := client.Do(req)
      if err != nil {
         return m, err
      }
      defer resp.Body.Close()

      body, err := ioutil.ReadAll(resp.Body)
      if err != nil {
         return m, err
      }

      json.Unmarshal(body, &m)

      return m, nil
   }
   ```

2. You can use this code from a route handler. For example:

   ```go
   func IndexHandler(c *gin.Context) {
      log.Println("Loading main page")

      errorMsg := ""

      profile, err := getProfileData(c.Request)

      if err != nil {
         errorMsg = err.Error()
      }

      c.HTML(
         // Set the HTTP status to 200 (OK)
         http.StatusOK,
         // Use the index.gohtml template
         "index.gohtml",
         // Pass the data that the page uses
         gin.H{
            "Profile":         profile,
            "Error":           errorMsg,
         },
      )
   }
   ```
