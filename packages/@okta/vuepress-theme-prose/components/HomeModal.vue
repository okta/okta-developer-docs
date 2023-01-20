<template>
  <div
    class="c-dialog"
    ref="homeDialog"
  >
    <div class="c-dialog__overlay"></div>
    <div class="c-dialog__content">
      <button
        class="c-dialog__close"
        type="button"
        aria-label="Close"
        @click="hideDialog"
      >
        <svg
          class="c-dialog__close-icon"
          width="30"
          height="31"
          viewBox="0 0 30 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.5333 15.2425L29.6721 0.697009L28.955 0L14.836 14.5252L0.717062 0L0 0.697009L14.1387 15.2425L0 29.788L0.717062 30.485L14.836 15.9599L28.955 30.485L29.6721 29.788L15.5333 15.2425Z"
            fill="#ffffff"
          />
        </svg>
      </button>
      <h2 class="c-dialog__title">
        Choose your path
      </h2>
      <p class="c-dialog__paragraph">
        Before you get started, take a look at how we split our developer resources and choose the path that best fits your needs.
      </p>
      <hr class="c-dialog__separator">
      <h3 class="c-dialog__subtitle">
        Who are you building for today?
      </h3>
      <div class="c-dialog__wrapper">
        <article class="c-dialog__block">
          <img
            class="c-dialog__block-image"
            src="/img/dialog/okta.svg"
            width="109"
            height="36"
            alt="Logotype okta"
          >
          <p class="c-dialog__block-paragraph">
            Workforce Identity Cloud
          </p>
          <h4 class="c-dialog__block-title">
            Employees, contractors, & partners
          </h4>
          <p class="c-dialog__block-text c-dialog__paragraph">
            <strong>Workforce Identity Cloud</strong> powers identity for all employees, business partners, and contractors and ensures they have access to what they need, when they need it with the appropriate levels of privilege.
          </p>
          <a
            class="c-dialog__link"
            href="/"
          >
            Go to Workforce Identity Cloud docs <span aria-hidden="true">→</span>
          </a>
        </article>
        <article class="c-dialog__block c-dialog__block_type_secondary">
          <img
            class="c-dialog__block-image"
            src="/img/dialog/auth.svg"
            width="100"
            height="40"
            alt="Auth"
          >
          <p class="c-dialog__block-paragraph">
            Customer Identity Cloud
          </p>
          <h4 class="c-dialog__block-title">
            Customers
          </h4>
          <p class="c-dialog__block-text c-dialog__paragraph">
            <strong>Okta Customer Identity Cloud</strong>, powered by Auth0, enables app builders, digital marketers, and security teams to give end-users access to everything they need online, in a convenient, secure way.
          </p>
          <a
            class="c-dialog__link"
            href="https://auth0.com/docs"
          >
            Go to Customer Identity Cloud docs <span aria-hidden="true">→</span>
          </a>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeModal",
    methods: {
      hideDialog() {
        const dialog = this.$refs.homeDialog;

        dialog.classList.add("c-dialog_state_hidden");
      }
    }
  }
</script>
