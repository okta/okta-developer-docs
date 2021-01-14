<template>
  <div class="login">
    <h1>Welcome back to Okta</h1>
    <div class="login--form">
      <div class="row">
        <label class="field-wrapper" for="login-email">
          <input
            id="login-email"
            type="button"
            value="sign in with email"
            class="btn red-button"
          />
        </label>
      </div>
      <div class="splitter">
        <span></span>
        <span>or</span>
        <span></span>
      </div>
      <div class="row">
        <div class="field-wrapper">
          <input
            type="button"
            class="social-btn"
            value="continue with github"
          />
        </div>
      </div>
      <div class="row">
        <div class="field-wrapper">
          <input
            type="button"
            class="social-btn"
            value="continue with google"
          />
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
export default {
  components: {
    CompanyLogos: () => import("../components/CompanyLogos")
  }
};
</script>
