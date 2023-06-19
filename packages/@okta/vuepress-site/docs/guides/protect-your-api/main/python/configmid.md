1. Create a file called `.okta.env` in your project root that contains the following:

   ```properties
   ORG_URL=https://${yourOktaDomain}
   ```

1. Replace the placeholder with your own value that you obtained earlier.
1. Add the following into your app file:

   ```python
   load_dotenv('.okta.env')
   ```
