<template>
  <div class="login">
    <h1>Welcome back to Okta</h1>
    <div class="login--form">
      <div class="row">
        <label class="field-wrapper" for="login-email">
          <a class="btn" href="#">
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
          <a class="btn social-btn" href="#">
            Continue With GitHub
          </a>
        </div>
      </div>
      <div class="row">
        <div class="field-wrapper">
          <a class="btn social-btn" href="#">
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
export default {};
</script>
