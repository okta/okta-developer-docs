1. Open a terminal and create a directory `test-api` for your project.
1. Initialize your module using `go mod init`.

   ```shell
   cd test-api
   go mod init test-api
   ```

1. Create a simple starter structure for your project:

   * server > controller.go
   * server > init.go
   * server > middleware.go
   * main.go
   * .okta.env

1. Add this code to `main.go`:

   ```go
   package main

   import "test-api/server"

   func main() {
      // Init app
      server.Init()
   }
   ```

Use the [sample code](https://github.com/okta-samples/okta-go-api-sample) to follow along.
