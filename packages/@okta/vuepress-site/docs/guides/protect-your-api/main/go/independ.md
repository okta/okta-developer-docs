You need [okta-jwt-verifier-golang](https://github.com/okta/okta-jwt-verifier-golang) to validate Okta access tokens. Additionally, install [godotenv](https://github.com/joho/godotenv) to handle loading environment variables.

1. Add the required dependencies using `go get`:

```shell
go get -u github.com/gin-gonic/gin
go get github.com/okta/okta-jwt-verifier-golang
go get github.com/joho/godotenv
```

2. Add the needed dependencies into your `main.go` file:

```go
import (
  "log"
	"os"
	"strings"
	"fmt"
	"net/http"

	gin "github.com/gin-gonic/gin"
	jwtverifier "github.com/okta/okta-jwt-verifier-golang"
	godotenv "github.com/joho/godotenv"
)
```
