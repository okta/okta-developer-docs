* [Spring Boot Getting Started Guide](https://spring.io/guides/gs/spring-boot/) to build a Spring Boot application to follow the guide with
* [Spring Boot samples repo](https://github.com/okta/samples-java-spring/tree/master/resource-server) or [WebFlux example repo](https://github.com/okta/okta-spring-boot/tree/master/examples/webflux-resource-server) for a finished sample app that you can download
* [Spring Initializr](https://start.spring.io) to create a new Spring Boot project with Okta. Select the dependencies **Web**, **Security**, and **Okta**, and then click **Generate Project** to download a zip file.
* The following command line to create a Spring Boot project:

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