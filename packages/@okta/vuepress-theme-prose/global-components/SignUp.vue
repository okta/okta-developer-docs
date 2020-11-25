<template>
  <div class="signup">
    <div class="signup--form">
      <form @submit="checkForm">
        <div class="row">
          <label for="email-input">
            Email
            <input type="email" id="email-input" placeholder="Email" />
          </label>
        </div>
        <div class="row">
          <label for="first-name">
            First Name
            <input type="text" id="first-name" placeholder="First Name" />
          </label>
          <label for="last-name">
            Last Name
            <input type="text" id="last-name" placeholder="Last Name" />
          </label>
        </div>
        <div class="row">
          <label for="country">
            Country
            <select name="" id="country">
              <option selected disabled>Country</option>
              <option value="first">Urkaine</option>
            </select>
          </label>
        </div>
        <div class="row">
          <label for="signup">
            <input type="submit" class="btn" id="signup" value="sign up" />
          </label>
        </div>
      </form>
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
      <div class="row goto-signin">
        Already signed up? <a href="/signin">Sign in</a>
      </div>
    </div>
    <div class="signup--description">
      <Content slot-key="signup-description" />
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
  </div>
</template>

<script>
export default {
  methods: {
    checkForm(e) {
      e.preventDefault();
    }
  }
};
</script>
