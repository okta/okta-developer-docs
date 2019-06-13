The [Spring Boot Getting Started Guide](https://spring.io/guides/gs/spring-boot/) teaches you the basics of building a Spring Boot application. 

You can create a new Spring Boot project with Okta by visiting the [Spring Initializr](https://start.spring.io) and selecting the dependencies **Web**, **Security**, and **Okta**, then clicking **Generate Project** to download a zip file.

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

Or, if you want to skip this guide and just download a working sample app, download our [Spring Boot Samples on GitHub](https://github.com/okta/samples-java-spring/tree/master/resource-server) or our [WebFlux example](https://github.com/okta/okta-spring-boot/tree/master/examples/webflux-resource-server).
