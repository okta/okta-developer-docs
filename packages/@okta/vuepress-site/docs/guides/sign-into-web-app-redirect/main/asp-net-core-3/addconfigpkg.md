The [Okta.AspNetCore](https://github.com/okta/okta-aspnet) library will enable your application to validate Okta access tokens. If you are working with an existing application and need lower-level access to validate access tokens see the [JWT validation guide](/code/dotnet/jwt-validation/).

All of Okta's .NET libraries are hosted on [NuGet](https://www.nuget.org/). Install the [Okta.AspNetCore](https://www.nuget.org/packages/Okta.AspNetCore) version 4.0.0 dependency in your project via the **NuGet Package Manager**:

1. In the Solution Explorer, right-click your project and select **Manage Nuget Packages**.
1. Click **Browse** and search for the package you want to install — `Okta.AspNetCore`.
1. Select your package and click **Install**.

Alternatively, you can install the dependency via the **dotnet CLI**:

```bash
dotnet add package Okta.AspNetCore --version 4.0.0
```
