See the [Spring Boot Getting Started Guide](https://spring.io/guides/gs/spring-boot/) to build a Spring Boot application to follow the guide with, or download a finished sample app from our [Spring Boot samples repo](https://github.com/okta/samples-java-spring/tree/master/resource-server) or our [WebFlux example repo](https://github.com/okta/okta-spring-boot/tree/master/examples/webflux-resource-server).

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