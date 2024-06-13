1. Add the following property to `.okta.env`, replacing the placeholder with your own value:

   ```properties
   ORG_URL=https://{yourOktaDomain}
   ```

1. Add the code to load this configuration to `app.py`.

   ```python
   load_dotenv('.okta.env')
   ```
