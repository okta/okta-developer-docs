1. Make sure that you have [Go installed](https://go.dev/dl/).

2. Create a new directory to store your project inside, and then `cd` inside it.

3. Initialize your module using `go mod init`, for example:

   ```shell
   go mod init okta/go-quickstart
   ```

4. Create a simple starter structure for your project. Have a look at our [sample structure](https://github.com/okta-samples/okta-go-gin-sample).

> **Note**: This guide uses Golang version 1.17.6 and Gin 1.7.7.

> **Note**: If you're using the Okta CLI, you can also run `okta start go-gin` to create a sample app. This command creates an OIDC app in Okta, downloads the [okta-go-gin-sample](https://github.com/okta-samples/okta-go-gin-sample), and configures it to work with the OIDC app.