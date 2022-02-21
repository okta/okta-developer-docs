Start the Angular app by serving locally.

```shell
ng serve
```

You should be able to sign-in, view your name, and sign-out. When navigating to protected routes you will automatically redirect to sign-in, and when making HTTP calls within allowed origins, you'll see the `Authorization` header.