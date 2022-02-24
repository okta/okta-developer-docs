Run the following commands to set the values provided by the CLI in the `.okta.env` file as environment variables and start your app:

```shell
source .okta.env
./mvnw spring-boot:run
```

Open a browser and navigate to `http://localhost:8080`. You are redirected to Okta to sign in. When you return, it should display your user information.

If you don't have any controllers mapped to `/`, you get a 404 after authentication in a brand new Spring Boot app. You can use the code in the [Get info about the user](#get-info-about-the-user) section to display the user's information after signing in.
