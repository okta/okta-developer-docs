All Okta packages for Golang use [go get](https://golang.org/cmd/go/#hdr-Add_dependencies_to_current_module_and_install_them) and [go mod](https://blog.golang.org/using-go-modules). 

Install the IDX SDK with `go get` and make sure it is saved in your `go.mod` file:

- `go get github.com/okta/okta-idx-golang`

You can then import this into your project:

```go
import {
  idx "github.com/okta/okta-idx-golang"
```
