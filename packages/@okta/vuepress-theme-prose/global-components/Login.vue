<template>
  <div class="login">
    <h1>Welcome back to Okta</h1>
    <div class="login--form">
      <div class="row">
        <label for="login-email">
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
        <label for="">
          <input
            type="button"
            class="social-btn"
            value="continue with github"
          />
        </label>
      </div>
      <div class="row">
        <label for="">
          <input
            type="button"
            class="social-btn"
            value="continue with google"
          />
        </label>
      </div>
      <div class="row goto-signup">
        Need an account? <a href="/signup">Sign up</a>
      </div>
    </div>
    <div class="logo-wrapper">
      <h4>Trusted by</h4>
      <div class="partners-logo">
        <img
          src="@okta/vuepress-site/.vuepress/public/img/authorization/proof-by.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
