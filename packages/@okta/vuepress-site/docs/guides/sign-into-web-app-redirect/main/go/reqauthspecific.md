You can also use the `isAuthenticated()` method to check if a user is authenticated and show more data within a page. For example, `home.gohtml` shows **Sign in** or **Sign out** according to the user's status.

```html
{{if .IsAuthenticated}}
<div>
   <p>Hello <span>{{.Profile.name}}</span>!</p>
   <p>Visit your <a href="profile">Profile</a> page.</p>
   <form method="post" action="/signout">
      <button id="signout-button" type="submit">Sign out</button>
   </form>
</div>
{{else}}
<div>
   <p>Hello!</p>
   <form method="get" action="/signin">
      <button id="signin-button" type="submit">Sign in</button>
</form>
{{end}}
```

`HomeHandler()` calls `isAuthenticated()` to populate its data model:

```go
func HomeHandler(w http.ResponseWriter, r *http.Request) {
   type customData struct {
      Profile         map[string]string
      IsAuthenticated bool
   }

   data := customData{
      Profile:         getProfileData(r),
      IsAuthenticated: isAuthenticated(r),
   }
   tpl.ExecuteTemplate(w, "home.gohtml", data)
}
```
