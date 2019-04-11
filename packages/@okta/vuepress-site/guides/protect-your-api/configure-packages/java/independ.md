You can create a new Spring Boot project by visting the [Spring Initializr](https://start.spring.io) and selecting the dependencies **Web**, **Security**, and **Okta**, then clicking the **Generate Project** button to download a zip file.

You can also use the command line:

```bash

curl https://start.spring.io/starter.tgz  \
  -d groupId=com.example \
  -d artifactId=demo \
  -d dependencies=web,security,okta \
  -d language=java \
  -d type=maven-project \
  -d baseDir=demo \
| tar -xzvf -
```

For existing projects just include the the following Apache Maven dependency: 

```xml
<dependency>
    <groupId>com.okta.spring</groupId>
    <artifactId>okta-spring-boot-starter</artifactId>
    <version>1.1.0</version>
</dependency>
```
