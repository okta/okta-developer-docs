1. Make sure that you have [Go installed](https://go.dev/dl/).
2. Create a new directory to store your project inside, and then `cd` inside it.
3. Download and install Gin:

```shell
go get -u github.com/gin-gonic/gin
```

4. Grab a sample app to use as a starter:

```shell
curl https://raw.githubusercontent.com/gin-gonic/examples/master/basic/main.go > main.go
```

NEED TO WORK OUt WHAT TO ACTUALLY PUT HERE - THE ABOVE IS NOT VERY USEFUL
> **Note**: This guide uses Golang version 1.17.6 and Gin 1.7.7.

> **Note**: If you're using the Okta CLI, you can also run `okta start go-api` to create an app. This command creates an OIDC app in Okta, downloads the [okta-go-api-sample](https://github.com/okta-samples/okta-go-gin-sample), and configures it to work with the OIDC app. This quickstart uses a basic Gin starter app instead, as it's easier to understand the Okta-specific additions if you work through them yourself.
