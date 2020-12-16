// NOTE: I would change this to talk about exchanging tokens

The final step after all remediation is handled, is to exchange your interaction code to get access tokens

```go
// These properties are based on the `successWithInteractionCode` object, and the properties that you are required to fill out
exchangeForm := []byte(`{
    "client_secret": "` + client.GetClientSecret() + `",
    "code_verifier": "` + string(client.GetCodeVerifier()) + `" // We generate your code_verfier for you and store it in the client struct. You can gain access to it through the method `GetCodeVerifier()` which will return a string
}`)
tokens, err := response.SuccessResponse.ExchangeCode(context.Background(), exchangeForm)
if err != nil {
    panic(err)
}

fmt.Printf("%+v\n", tokens)
fmt.Printf("%+s\n", tokens.AccessToken)
fmt.Printf("%+s\n", tokens.IDToken)
```
