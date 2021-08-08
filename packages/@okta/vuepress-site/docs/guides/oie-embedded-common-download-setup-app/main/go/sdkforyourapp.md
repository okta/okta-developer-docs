After you run the sample app and explore its available use cases, you can begin to integrate the SDK and/or the widget into your own app. To get started, follow these steps:

#### Step 1: Install the Golang SDK

1. Create a module file by running the following command:

```go
go mod init
```

2. Run the following command to add the SDK to your go.mod file.

```go
go get github.com/okta/okta-idx-golang.
```

3. Import the package in your project with `import "github.com/okta/okta-idx-golang"`

#### Step 2: Initialize the IDX Client

```go
idx, err := idx.NewClient(
  os.Getenv("OKTA_IDX_CLIENTID"),
  os.Getenv("OKTA_IDX_CLIENT_SECRET"),
  os.Getenv("OKTA_IDX_ISSUER"),
  os.Getenv("OKTA_IDX_SCOPES"),
  os.Getenv("OKTA_IDX_REDIRECT_URI"))
```
