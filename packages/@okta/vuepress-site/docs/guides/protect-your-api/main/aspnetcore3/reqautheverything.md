In the `ConfigureServices` method of `Startup.cs`, create an authorization policy to be used everywhere:

```csharp
public void ConfigureServices(IServiceCollection services)
{

  services.AddAuthorization();

  services.AddMvc(o =>
  {
    var policy = new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .Build();
    o.Filters.Add(new AuthorizeFilter(policy));
  });
}
```