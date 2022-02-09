Build a sign-in page that captures both the username and password. As an example, from the `index.html` page of the static-spa sample:

```HTML
        <!-- static sign-in form (authn and oie)-->
        <div id="static-signin-form" style="display: none" class="panel pure-form pure-form-aligned">
          <div class="pure-control-group">
            <label for="username">Username</label>
            <input name="username" type="email" autocomplete="username">
          </div>
          <div class="pure-control-group">
            <label for="password">Password</label>
            <input name="password" type="password" autocomplete="password">
          </div>
          <div class="pure-controls">
            <p><a href="/" data-se="recover-password" onclick="_showRecoverPassword(event)">Forgot your password?</a></p>
            <a class="pure-button pure-button-primary" href="/" data-se="submit" onclick="_submitStaticSigninForm(event)">Signin</a>
          </div>
        </div>
```

