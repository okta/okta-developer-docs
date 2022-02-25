The [Okta.AspNetCore](https://github.com/okta/okta-aspnet) library enables your application to validate Okta access tokens. If you're working with an existing application and need lower-level access to validate access tokens, see the [JWT validation guide](/code/dotnet/jwt-validation/).

All of Okta's .NET libraries are hosted on [NuGet](https://www.nuget.org/). Install the [Okta.AspNetCore](https://www.nuget.org/packages/Okta.AspNetCore) version 4.0.0 dependency in your project through the **NuGet Package Manager**:

1. In the Solution Explorer, right-click your project and select **Manage Nuget Packages for Solution**.
1. Click **Browse** and search for the package that you want to install, for example, `Okta.AspNetCore`.
1. Select your package and click **Add Package**.

Or, you can install the dependency through the **dotnet CLI**:

```bash
dotnet add package Okta.AspNetCore --version 4.0.0
```
