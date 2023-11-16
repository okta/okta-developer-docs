1. Add CORS to the `ConfigureServices` method in `Startup.cs`:

   ```csharp
   services.AddCors(options =>
   {
      // The CORS policy is open for testing purposes.
      // In a production application, you should restrict it to known origins.
      options.AddPolicy(
         "AllowAll",
         builder => builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader());
   });
   ```

2. Enable CORS in the `Configure` method:

   ```csharp
   app.UseCors();
   ```

3. Add the CORS attribute to your API controller:

   ```csharp
   [EnableCors("AllowAll")] // Enables CORS for this route
   [ApiController]
   [Route("api")]
   public class InfoController : ControllerBase
   ```
