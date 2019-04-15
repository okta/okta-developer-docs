Use the `Authorize` attribute on controllers or actions to require a logged-in user:

```
[Authorize]
public ActionResult Protected()
{
    // Only for logged-in users!
    return View();
}
```