You can use the above middleware on specific routes if you want the other routes to be public.

```go
router.GET("/profile", AuthMiddleware(), ProfileHandler)
```
