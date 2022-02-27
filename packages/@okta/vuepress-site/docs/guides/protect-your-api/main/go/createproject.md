1. Make sure that you have [Go installed](https://go.dev/dl/).

2. Create a new directory to store your project inside, and then `cd` inside it.

3. Initialize your module using `go mod init`, for example:

```shell
go mod init okta/go-api-quickstart
```

4. Create a simple starter file called `main.go` in your project root:

```go
package main

import (

)

func main() {

}
```

> **Note**: This guide uses Golang version 1.17.6 and Gin 1.7.7.

> **Note**: If you're using the Okta CLI, you can also run `okta start go-api` to create a sample app. This command creates an OIDC app in Okta, downloads the [okta-go-api-sample](https://github.com/okta-samples/okta-go-api-sample), and configures it to work with the OIDC app.