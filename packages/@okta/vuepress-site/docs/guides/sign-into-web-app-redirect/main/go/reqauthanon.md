By default all the routes declared in a Gin application are public and hence can be accessed anonymously. If you configure a router group that uses the authentication middleware, you can add anonymous routes to the default router as follows:

```go
router.GET("/anonymous-route", RouteHandler)
```
