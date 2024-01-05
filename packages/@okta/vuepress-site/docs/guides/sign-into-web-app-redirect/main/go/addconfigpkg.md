1. Install the following dependencies using `go get`:

   ```bash
   go get github.com/gorilla/sessions
   go get github.com/okta/okta-jwt-verifier-golang
   go get github.com/okta/samples-golang/okta-hosted-login/utils
   ```

1. Add these to the `import` statement in `main.go`:

   ```go
   import (
      "bytes"
      "crypto/rand"
      "encoding/base64"
      "encoding/hex"
      "encoding/json"
      "fmt"
      "html/template"
      "io"
      "log"
      "net/http"
      "os"

      "github.com/gorilla/sessions"
      verifier "github.com/okta/okta-jwt-verifier-golang"
      oktaUtils "github.com/okta/samples-golang/okta-hosted-login/utils"
   )
   ```
