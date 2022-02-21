1. Run the following command to start the go app:

```shell
go run main.go
```

2. Open a browser and navigate to `http://localhost:8080`.

3. Click the login link and you will be redirected to Okta to sign-in. When you return, it should display your user information.

If you don't have any handlers mapped to `/`, you'll get a 404 after authentication in a brand new Gin app. You can use the code in the [Get info about the user](#get-info-about-the-user) section to display the user's information after log in.
