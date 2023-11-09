You need [gin](https://github.com/gin-gonic/gin) to handle routing capabilities and [okta-jwt-verifier-golang](https://github.com/okta/okta-jwt-verifier-golang) to validate Okta access tokens. Additionally, install [godotenv](https://github.com/joho/godotenv) to handle loading environment variables.

Add the required dependencies using `go get`, then include the imports in your project as required:

```shell
go get github.com/gin-gonic/gin
go get github.com/okta/okta-jwt-verifier-golang
go get github.com/joho/godotenv
```