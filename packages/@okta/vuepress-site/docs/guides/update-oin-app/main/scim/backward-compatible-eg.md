   Your integration update introduced a new variable (`companyId`), and you use it in your updated SCIM server base URL. The base URL changed from `https://fruits.example.com/scim2/myapp/` to `https://fruits.example.com/scim2/myapp?connection= + app.companyId`. In this case, ensure that the dynamic base URL is also valid for existing instances where the `companyId` value isn't set.

   To handle empty `companyId` values, you can define the base URL as:

   ```js
   'https://fruits.example.com/scim2/myapp' + (String.len(app.companyId) == 0 ? '/' : '?connection=' + app.companyId)
   ```

   This expression handles scenarios where `companyId` is populated or empty. See [Dynamic properties with Okta Expression Language](/docs/guides/submit-oin-app/scim/main/#dynamic-properties-with-okta-expression-language).
