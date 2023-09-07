After a user has signed in, the application receives ID and access tokens from Okta and keeps them in session storage. In this section, you create a simple profile page that uses an access token to query for and display a user's basic information.

1. Add a route handler for `/profile` to `main()` in `main.go`:

   ```go
   http.HandleFunc("/profile", ProfileHandler)
   ```

1. Define the handler function:

   ```go
   func ProfileHandler(w http.ResponseWriter, r *http.Request) {
      type customData struct {
         Profile         map[string]string
         IsAuthenticated bool
      }

      data := customData{
         Profile:         getProfileData(r),
         IsAuthenticated: isAuthenticated(r),
      }
      tpl.ExecuteTemplate(w, "profile.gohtml", data)
   }
   ```

1. Add the following function to request the user's info upon a successful sign-in flow:

   ```go
   func getProfileData(r *http.Request) map[string]string {
      m := make(map[string]string)

      session, err := sessionStore.Get(r, "okta-hosted-signin-session-store")

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
      body, _ := io.ReadAll(resp.Body)
      defer resp.Body.Close()
      json.Unmarshal(body, &m)

      return m
   }
   ```

1. Finally, create `templates\profile.gohtml` to display the user's information:

   ```html
   {{template "header" .}}
   <div>
      <h2>My Profile</h2>
      <p>Hello, <span>{{ .Profile.name }}</span>.
      </p>
   </div>

   <table>
      <thead>
      <tr>
         <th>Claim</th>
         <th>Value</th>
      </tr>
      </thead>
      <tbody>
         {{ range $key, $value := .Profile }}
         <tr>
            <td>{{ $key }}</td>
            <td id="claim-{{$key}}">{{ $value }}</td>
         </tr>
         {{ end }}
      </tbody>
   </table>
   </div>
   {{template "footer"}}
   ```
