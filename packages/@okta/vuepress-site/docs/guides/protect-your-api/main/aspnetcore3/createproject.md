For this tutorial, we create a sample API from scratch using the Visual Studio ASP.NET Core Web API project template.

1. Launch Visual Studio 2022, select **New Project > ASP.NET Core Web API**, and click **Next**.
2. Name your project and click **Next**.
3. Select **Framework** as **.NET Core 3.1**, **Authentication** as **None** (Okta handles this part) and select **Configure for HTTPS**.
4. Click **Create**.

Alternatively you can create a new project from the command line using the dotnet CLI:

```bash
dotnet new webapi -o ${yourProjectName} --framework netcoreapp3.1
```

> **Note**: This guide uses ASP.NET Core 3.1.

> **Note:** We recomend using the [latest .NET CLI](https://docs.microsoft.com/en-us/dotnet/core/install), even when using older framework versions.