To require authentication for all actions you can register a new filter with the `Authorize` attribute. 
Update the `Register` method in the `WebApiConfig.cs` file with the following code:

```csharp
public static class WebApiConfig
{
    public static void Register(HttpConfiguration config)
    {
        //...
        config.Filters.Add(new AuthorizeAttribute());
    }
}
```

Also, you can opt to create a `BaseProtectedController` and make all of your controllers inherit it:

```csharp
[Authorize]
public abstract class BaseProtectedController : Controller
{
    //...
}
```

For those actions/controllers that need to be accessible for non-authenticated users you have to decorate them with the `AllowAnonymous` attribute. 