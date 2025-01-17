1. Add the following properties to `.okta.env`, replacing the placeholders with your own values.

   ```properties
   OKTA_OAUTH2_ISSUER=https://{yourOktaDomain}/oauth2/{yourAuthServerName}
   OKTA_API_AUDIENCE={yourAudience}
   ```

    >**Note:** If you're using a custom authorization server other than `default`, use the authorization server `id` in place of the `{yourAuthServerName}` placeholder.

1. Add the code to load this configuration to `server\init.go`.

   ```go
   package server

   import (
      "log"
      "time"

      "github.com/gin-gonic/gin"
      "github.com/joho/godotenv"
   )

   func Init() {

      godotenv.Load("./.okta.env")

   }
   ```
