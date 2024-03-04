   Your integration update introduced a new variable (`companyId`), and you use it in your updated ACS URL. The ACS URL changed from `https://login.myapp.io` to `https://login.myapp.io?connection={org.companyId}`. In this case, ensure that the dynamic ACS URL is also valid for existing instances where the `companyId` value isn't set.

   To handle empty `companyId` values, you can define the ACS URL as:

   ```bash
   https://${empty org.companyId ? 'login.myapp.io' : 'login.myapp.io?connection=' += org.companyId}
   ```

   This expression handles both scenarios where `companyId` is populated or empty.