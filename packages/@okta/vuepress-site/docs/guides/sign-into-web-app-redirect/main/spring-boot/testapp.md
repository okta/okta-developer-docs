1. Run the following command to start your app:

   ```shell
   mvn spring-boot:run
   ```

2. Open a browser and navigate to `http://localhost:8080`. You are redirected to Okta to sign in. When you return, it should display your user information.

> **Note**: If you don't have any controllers mapped to `/`, you get a 404 after authentication in a brand new Spring Boot app. You already added code in the [Get info about the user](#get-info-about-the-user) section to add an appropriate controller to display the user's name after signing in.
