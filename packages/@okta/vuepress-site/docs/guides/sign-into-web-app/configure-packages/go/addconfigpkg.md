All Okta packages for Golang use [go get](https://golang.org/cmd/go/#hdr-Add_dependencies_to_current_module_and_install_them). Install the following dependencies in your project:

- `go get github.com/okta/okta-jwt-verifier-golang`
- `go get github.com/gorilla/sessions`

You can then import them into your project:

```go
import {
  "github.com/okta/okta-jwt-verifier-golang"
  "github.com/gorilla/sessions"
```
