Add the `[Authorize]` and `[AllowAnonymous]` attributes to the REST endpoints [created earlier](#create-two-endpoints-to-secure).

```csharp
// GET: api/whoami with authorization required
[Authorize]
[HttpGet]
[Route("whoami")]
public Dictionary<string, string> GetAuthorized()...

// GET: api/hello with anonymous access allowed
[AllowAnonymous]
[HttpGet]
[Route("hello")]
public string GetAnonymous()...
```
