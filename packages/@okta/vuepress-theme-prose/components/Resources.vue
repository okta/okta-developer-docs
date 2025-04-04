<template>
  <section class="resources">
    <div class="resources__wrapper wrapper">
      <h2 class="resources__title dont-break-out">
        External Resources
      </h2>
      <div class="resources__block">
        <span class="resources__status dont-break-out">
          Advanced
        </span>
        <p class="resources__subtitle dont-break-out">
          Automation and Orchestration
        </p>
        <p class="resources__paragraph dont-break-out">
          Automate your Okta provisioning with Terraform. Okta articles and partner resources are available to help you get up and running, and as always, the Okta community forum is a great space to ask questions and find peer support.
        </p>
        <a
          class="resources__link dont-break-out"
          href="https://devforum.okta.com/search?q=terraform"
        >
          View Terraform discussions on the forum
        </a>
      </div>
      <ul class="resources__list">
        <li class="resources__list-item">
          <h3 class="resources__list-title dont-break-out">
            Blog
          </h3>
          <p class="resources__list-text dont-break-out">
            Explore official Okta blog posts and Help Center articles to learn how to orchestrate Okta with Terraform.
          </p>
          <div class="resources__links">
            <a
              class="resources__list-link dont-break-out"
              href="https://developer.okta.com/blog/2022/04/14/where-okta-meets-devops"
            >
              <span>How can DevOps engineers use Okta?</span>
              <div class="resources__list-icon" />
            </a>
            <a
              class="resources__list-link dont-break-out"
              href="https://developer.okta.com/blog/2021/11/08/k8s-api-server-oidc"
            >
              <span>Secure your Kubernetes cluster for Okta OIDC and Terraform</span>
              <div class="resources__list-icon" />
            </a>
          </div>
        </li>
        <li class="resources__list-item">
          <h3 class="resources__list-title dont-break-out">
            Technical documentation
          </h3>
          <p class="resources__list-text dont-break-out">
            Discover official Terraform partner resources to automate provisioning and management for Okta.
          </p>
          <div class="resources__links">
            <a
              class="resources__list-link dont-break-out"
              href="https://support.okta.com/help/s/article/Prepare-the-Okta-Terraform-Provider-for-the-OIE-upgrade?language=en_US"
            >
              <span>Prepare the Okta Terraform Provider for OIE Upgrade</span>
              <div class="resources__list-icon" />
            </a>
            <a
              class="resources__list-link dont-break-out"
              href="https://github.com/okta/terraform-provider-okta"
            >
              <span>View Terraform provider on Github</span>
              <div class="resources__list-icon" />
            </a>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  export default {
    name: "Resources",
  }
</script>
