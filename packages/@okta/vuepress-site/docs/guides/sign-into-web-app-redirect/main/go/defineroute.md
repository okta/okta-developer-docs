To set up the callback route, you need to define a handler, in the okta-sample created by the CLI, this is defined in `server/init.go`:

```go
router.GET("/authorization-code/callback", AuthCodeCallbackHandler)
```

Now, define the handler function, session store, and helper methods. For example, in `server/controller.go`:

```go
var (
    sessionStore = sessions.NewCookieStore([]byte("okta-hosted-login-session-store"))
    state        = randstr.Hex(16)
    nonce        = "NonceNotSetYet"
)

func AuthCodeCallbackHandler(c *gin.Context) {
    // Check the state that was returned in the query string is the same as the above state
    if c.Query("state") != state {
        c.AbortWithError(http.StatusForbidden, fmt.Errorf("The state was not as expected"))
        return
    }
    // Make sure the code was provided
    if c.Query("code") == "" {
        c.AbortWithError(http.StatusForbidden, fmt.Errorf("The code was not returned or is not accessible"))
        return
    }

    exchange, err := exchangeCode(c.Query("code"))
    if err != nil {
        c.AbortWithError(http.StatusUnauthorized, err)
        return
    }
    if exchange.Error != "" {
        c.AbortWithError(http.StatusUnauthorized, fmt.Errorf("%s:%s", exchange.Error, exchange.ErrorDescription))
        return
    }

    session, err := sessionStore.Get(c.Request, "okta-hosted-login-session-store")
    if err != nil {
        c.AbortWithError(http.StatusInternalServerError, err)
        return
    }

    _, err = verifyToken(exchange.IdToken)

    if err != nil {
        c.AbortWithError(http.StatusInternalServerError, err)
        return
    } else {
        session.Values["id_token"] = exchange.IdToken
        session.Values["access_token"] = exchange.AccessToken

        session.Save(c.Request, c.Writer)
    }

    c.Redirect(http.StatusFound, "/")
}

type Exchange struct {
    Error            string `json:"error,omitempty"`
    ErrorDescription string `json:"error_description,omitempty"`
    AccessToken      string `json:"access_token,omitempty"`
    TokenType        string `json:"token_type,omitempty"`
    ExpiresIn        int    `json:"expires_in,omitempty"`
    Scope            string `json:"scope,omitempty"`
    IdToken          string `json:"id_token,omitempty"`
}

func exchangeCode(code string) (Exchange, error) {
    authHeader := base64.StdEncoding.EncodeToString(
        []byte(os.Getenv("OKTA_OAUTH2_CLIENT_ID") + ":" + os.Getenv("OKTA_OAUTH2_CLIENT_SECRET")))

    q := url.Values{}
    q.Add("grant_type", "authorization_code")
    q.Set("code", code)
    q.Add("redirect_uri", "http://localhost:8080/authorization-code/callback")

    url := os.Getenv("OKTA_OAUTH2_ISSUER") + "/v1/token?" + q.Encode()

    req, err := http.NewRequest("POST", url, bytes.NewReader([]byte("")))
    if err != nil {
        return Exchange{}, err
    }

    h := req.Header
    h.Add("Authorization", "Basic "+authHeader)
    h.Add("Accept", "application/json")
    h.Add("Content-Type", "application/x-www-form-urlencoded")
    h.Add("Connection", "close")
    h.Add("Content-Length", "0")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return Exchange{}, err
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return Exchange{}, err
    }

    var exchange Exchange
    json.Unmarshal(body, &exchange)

    return exchange, nil
}

func verifyToken(t string) (*verifier.Jwt, error) {
    tv := map[string]string{}
    tv["nonce"] = nonce
    tv["aud"] = os.Getenv("OKTA_OAUTH2_CLIENT_ID")
    jv := verifier.JwtVerifier{
        Issuer:           os.Getenv("OKTA_OAUTH2_ISSUER"),
        ClaimsToValidate: tv,
    }

    result, err := jv.New().VerifyIdToken(t)
    if err != nil {
        return nil, fmt.Errorf("%s", err)
    }

    if result != nil {
        return result, nil
    }

    return nil, fmt.Errorf("token could not be verified")
}
```