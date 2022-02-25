> **Note**: This guide uses ASP.NET Core 3.1.

In Visual Studio:

1. Create a new project using the **Web API** template.
1. Set the **Target Framework** to  **.NET Core 3.1**.
1. Ensure that **Authentication** is set to **No Authentication** &mdash; you add this through Okta.
1. Click **Next**.
1. Give your project a name like Okta API Integration and click **Create**.

Or create a new .NET Core 3.1 project from the command line:

```bash
dotnet new webapi -o secure-api --framework netcoreapp3.1
cd secure-api
```

> **Note:** We recomend using the [latest .NET CLI](https://docs.microsoft.com/en-us/dotnet/core/install), even when using older framework versions.
