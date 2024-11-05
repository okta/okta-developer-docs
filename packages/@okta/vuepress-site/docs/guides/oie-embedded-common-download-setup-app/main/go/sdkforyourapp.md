> **Note:** Try to [run the embedded SDK sample app](/docs/guides/oie-embedded-common-run-samples/go/main/#run-the-embedded-sdk-sample-app) and explore the available [embedded authentication use cases](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/go/main/) to get familiar with the SDK before you start to integrate your own embedded app.

Begin to integrate the SDK into your own app by following these steps:

#### 1: Install the Golang SDK

1. Create a module file by running the following command:

```go
go mod init
```

1. Run the following command to add the SDK to your `go.mod` file:

```go
go get github.com/okta/okta-idx-golang.
```

1. Import the package in your project with `import "github.com/okta/okta-idx-golang"`.

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
