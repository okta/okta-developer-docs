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
      <h4 class="text-center">Trusted by</h4>
      <div class="partners-logo">
        <img
          src="/img/authorization/proof-by.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    uris() {
      const { uris } = this.$site.themeConfig;

      return {
        email: `${uris.baseUri}/login/login.htm`,
        github: `${uris.baseUri}/sso/idps/${uris.idps.github}`,
        google: `${uris.baseUri}/sso/idps/${uris.idps.google}`,
      };
    },
  }
};
</script>
