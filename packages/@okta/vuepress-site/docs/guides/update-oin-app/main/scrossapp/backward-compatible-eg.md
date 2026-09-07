   For example:

   Your integration update introduced a new variable `(companyId)`, and you use it in your Cross App Access (XAA) resource updated Issuer URL. The issuer URL changed from `https://fruits.example.com` to `'https://fruits.example.com/' + app.companyId`. In this case, ensure that the dynamic issuer URL is also valid for existing instances where the `companyId` value isn't set.

   To handle empty `companyId` values, you can define the issuer URL as:

   ```
   https://fruits.example.com' + (String.len(app.companyId) == 0 ? '' : '/' + app.companyId)
   ```

   This expression handles scenarios where `companyId` is populated or empty. See [Dynamic properties with Okta Expression Language](/docs/guides/submit-oin-app/saml2/main/#dynamic-properties-with-okta-expression-language).
