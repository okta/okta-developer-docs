   Your integration update introduced a new variable (`companyId`), and you use it in your updated redirect URL. The redirect URL changed from `https://login.myapp.io` to `https://login.myapp.io?connection={app.companyId}`. In this case, ensure that the dynamic redirect URL is also valid for existing instances where the `companyId` value isn't set.

   To handle empty `companyId` values, you can define the redirect URL as:

   ```bash
   {String.len(app.companyId) == 0 ? 'https://login.myapp.io' : 'https://login.myapp.io?connection=' + app.companyId}
   ```

   This expression handles both scenarios where `companyId` is populated or empty.