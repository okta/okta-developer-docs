1. Create a new REST Controller at `src/main/java/com/example/SampleController.java.

2. Enter the following code into it:

```java
package com.example;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class SampleController {

  @GetMapping("/api/hello")
  public String anon() {
    return "Anonymous access";
  }

  @GetMapping("/api/whoami")
  public Map<String, Object> whoami(Authentication authentication) {
    // return information about the token
    return (Map<String, Object>) authentication.getDetails();
  }
}
```
