Create an empty API project in Visual Studio with the ASP.NET Core Web API project template.

1. Launch Visual Studio.
1. Select **File** > **New** >  **Project** > **ASP.NET Core Web API**, and click **Next**.
1. Enter a **Project name**, and click **Next**.
1. Select **.NET Core 3.1** as the **Framework**.
1. Ensure that **Authentication** is **None**. (Don't worry, Okta handles this part.)
1. Ensure that **Configure for HTTPS** is selected.
1. Click **Create**.

Alternatively, you can create a project with the .NET CLI:

```bash
dotnet new webapi -o ${yourProjectName} --framework netcoreapp3.1
```
