After you run the sample app and explore the available use cases, you can begin to integrate the SDK and/or the Widget into your own app. To get started, follow these steps:

#### 1: Install the Golang SDK

1. Create a module file by running the following command:

```go
go mod init
```

2. Run the following command to add the SDK to your `go.mod` file:

```go
go get github.com/okta/okta-idx-golang.
```

3. Import the package in your project with `import "github.com/okta/okta-idx-golang"`.

#### 2: Create the IDX Client object

Create the IDX `Client` object by using the `NewClient()` method and optionally passing in
a `ConfigSetter` object. `Client` is the main object that is used to initiate
the various use cases with the SDK and Widget.

```go
idx, err := idx.NewClient(
  os.Getenv("OKTA_IDX_CLIENTID"),
  os.Getenv("OKTA_IDX_CLIENT_SECRET"),
  os.Getenv("OKTA_IDX_ISSUER"),
  os.Getenv("OKTA_IDX_SCOPES"),
  os.Getenv("OKTA_IDX_REDIRECT_URI"))
```
