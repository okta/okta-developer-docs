In this sample, were showing only a basic flow of handling the `identify` request and `challenge-authenticator` request

```go
var response *Response

client, err := NewClient(
    WithClientID("{CLIENT_ID}"),
    WithClientSecret("{CLIENT_SECRET}"),        // Required for confidential clients.
    WithIssuer("{ISSUER}"),                     // e.g. https://foo.okta.com/oauth2/default, https://foo.okta.com/oauth2/ausar5vgt5TSDsfcJ0h7
    WithScopes([]string{"openid", "profile"}),  // Must include at least `openid`. Include `profile` if you want to do token exchange
    WithRedirectURI("{REDIRECT_URI}"),          // Must match the redirect uri in client app settings/console
)
if err != nil {
    panic(err)
}

interactHandle, err := client.Interact(context.TODO())
if err != nil {
    panic(err)
}

response, err = client.Introspect(context.TODO(), interactHandle)
if err != nil {
    panic(err)
}

for !response.LoginSuccess() {
    for _, remediationOption := range response.Remediation.RemediationOptions {

        switch remediationOption.Name {
        case "identify":
            identify := []byte(`{
                    "identifier": "foo@example.com",
                    "rememberMe": false
                }`)

            response, err = remediationOption.Proceed(context.TODO(), identify)
            if err != nil {
                panic(err)
            }

        case "challenge-authenticator":
            credentials := []byte(`{
                    "credentials": {
                    "passcode": "Abcd1234"
                    }
                }`)

            response, err = remediationOption.Proceed(context.TODO(), credentials)

            if err != nil {
                panic(err)
            }

        default:
            fmt.Printf("%+v\n", response.Remediation)
            panic("could not handle")
        }

    }
}

```
