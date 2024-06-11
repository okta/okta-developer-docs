1. Create an `.env` file in the root of your project. Add the following, replacing the placeholders with your own values.

   ```properties
   CLIENT_ID={clientId}
   CLIENT_SECRET={clientSecret}
   ISSUER=https://{yourOktaDomain}/oauth2/default
   ```

1. Add a command to parse those values in your `main()` function in `main.go`:

   ```go
   oktaUtils.ParseEnvironment()
   ```

1. Create `utils\parseEnv.go` and implement this function:

   ```go
   package utils

   import (
      "bufio"
      "log"
      "os"
      "strings"
   )

   func ParseEnvironment() {
      // useGlobalEnv := true
      if _, err := os.Stat(".env"); os.IsNotExist(err) {
         log.Printf("Environment Variable file (.env) is not present.")
         // useGlobalEnv = false
      }

      setEnvVariable("CLIENT_ID", os.Getenv("CLIENT_ID"))
      setEnvVariable("CLIENT_SECRET", os.Getenv("CLIENT_SECRET"))
      setEnvVariable("ISSUER", os.Getenv("ISSUER"))

      if os.Getenv("CLIENT_ID") == "" {
         log.Printf("Could not resolve a CLIENT_ID environment variable.")
         os.Exit(1)
      }

      if os.Getenv("CLIENT_SECRET") == "" {
         log.Printf("Could not resolve a CLIENT_SECRET environment variable.")
         os.Exit(1)
      }

      if os.Getenv("ISSUER") == "" {
         log.Printf("Could not resolve a ISSUER environment variable.")
         os.Exit(1)
      }
   }

   func setEnvVariable(env string, current string) {
      if current != "" {
         return
      }

      file, _ := os.Open(".env")
      defer file.Close()

      lookInFile := bufio.NewScanner(file)
      lookInFile.Split(bufio.ScanLines)

      for lookInFile.Scan() {
         parts := strings.Split(lookInFile.Text(), "=")
         key, value := parts[0], parts[1]
         if key == env {
            os.Setenv(key, value)
         }
      }
   }
   ```

> **Note:** If the `.env` file doesn't exist, the code searches your global environment variables for alternate values.
