In order to configure CORS in Go, you must set some headers on your ResponseWriter in the route handler:

```go
func RouteHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Access-Control-Allow-Origin", "*")

  // do rest of your handler here
}
```

