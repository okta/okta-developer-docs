<template>
  <div class="login">
    <h1>Welcome back to Okta</h1>
    <div class="login--form">
      <div class="row">
        <label class="field-wrapper" for="login-email">
          <a class="btn" :href="uris.email">
            Sign In With Email
          </a>
        </label>
      </div>
      <div class="splitter">
        <span></span>
        <span>or</span>
        <span></span>
      </div>
      <div class="row">
        <div class="field-wrapper">
          <a class="btn social-btn" :href="uris.github">
            Continue With GitHub
          </a>
        </div>
      </div>
      <div class="row">
        <div class="field-wrapper">
          <a class="btn social-btn" :href="uris.google">
            Continue With Google
          </a>
        </div>
      </div>
      <div class="row goto-signup">
        Need an account? <a href="/signup">Sign up</a>
      </div>
    </div>
    <div class="logo-wrapper">
      <CompanyLogos withHeading small />
    </div>
  </div>
</template>

<script>
import { getIdpUri } from "../util/uris";

export default {
  components: {
    CompanyLogos: () => import("../components/CompanyLogos")
  },
  computed: {
    uris() {
      const { uris } = this.$site.themeConfig;

      return {
        email: "https://login.okta.com/",
        github: getIdpUri(uris, "github"),
        google: getIdpUri(uris, "google"),
      };
    },
};
</script>
