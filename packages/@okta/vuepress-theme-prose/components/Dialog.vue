<template>
  <div
    v-if="!dialogHidden"
    class="c-dialog"
    role="dialog"
    aria-labelledby="c-dialog-title"
    aria-describedby="c-dialog-paragraph"
    aria-modal="true"
    tabindex="-1"
  >
    <div
      class="c-dialog__overlay"
      @click="hideDialog()"
    />
    <div
      class="c-dialog__content"
      role="document"
    >
      <button
        class="c-dialog__close"
        type="button"
        aria-label="Close"
        @click="hideDialog()"
      >
        <svg
          class="c-dialog__close-icon"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.6972 16L28.8487 4.84855L27.1516 3.15149L16.0001 14.303L4.84867 3.15149L3.15161 4.84855L14.3031 16L3.15161 27.1515L4.84867 28.8485L16.0001 17.6971L27.1516 28.8485L28.8487 27.1515L17.6972 16Z"
            fill="#8c8c8c"
          />
        </svg>
      </button>
      <h2
        id="c-dialog-title"
        class="c-dialog__title dont-break-out"
      >
        Who are you building for today?
      </h2>
      <p
        id="c-dialog-paragraph"
        class="c-dialog__paragraph dont-break-out"
      >
        Explore the developer resources that best fit your needs.
      </p>
      <div class="c-dialog__wrapper">
        <article class="c-dialog__block">
          <p class="c-dialog__block-paragraph dont-break-out">
            Workforce Identity Cloud
          </p>
          <h4 class="c-dialog__block-title dont-break-out">
            My employees, <br> contractors, and partners
          </h4>
          <p class="c-dialog__block-text c-dialog__paragraph dont-break-out">
            Workforce Identity Cloud powers identity for all employees, business partners, and contractors and ensures they have access to what they need, when they need it with the appropriate levels of privilege.
          </p>
          <button
            class="c-dialog__link c-dialog__link_type_primary dont-break-out"
            type="button"
            @click="hideDialog()"
          >
            Go to Workforce Identity Cloud docs
          </button>
        </article>
        <article class="c-dialog__block c-dialog__block_type_secondary">
          <div class="c-dialog__block-wrapper">
            <p class="c-dialog__block-paragraph dont-break-out">
              Customer Identity Cloud
            </p>
            <p class="c-dialog__block-wrapper-text dont-break-out">
              Powered by
            </p>
            <img
              class="c-dialog__block-image"
              src="/img/dialog/auth.svg"
              width="70"
              height="29"
              alt="Auth0"
            >
          </div>
          <h4 class="c-dialog__block-title dont-break-out">
            My customers <br> or SaaS applications
          </h4>
          <p class="c-dialog__block-text c-dialog__paragraph dont-break-out">
            Customer Identity Cloud enables app builders, digital marketers, and security teams to give end-users access to everything they need online, in a convenient, secure way.
          </p>
          <a
            class="c-dialog__link dont-break-out"
            href="https://developer.auth0.com"
          >
            Go to Customer Identity Cloud docs <span aria-hidden="true">↗</span>
          </a>
        </article>
      </div>
      <div class="dont-show-again-checkbox">
        <input
          id="dont-show-again-checkbox"
          v-model="isDontShowModalChecked"
          type="checkbox"
        >
        <label for="dont-show-again-checkbox">
          Don't show this again
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import storage from '../util/localStorage';
const HIDE_INTRO_MODAL_KEY = 'hide_intro_modal';

  export default {
    name: "HomeDialog",
    data() {
      return {
        dialogHidden: true,
        isDontShowModalChecked: false
      };
    },
    mounted() {
      this.$nextTick(() => {
        if (!storage.getItem(HIDE_INTRO_MODAL_KEY)) {
          this.dialogHidden = false;
        }
      });
      const ESC_KEY = 27;
      window.addEventListener("keydown", (event) => {
        if (event.keyCode === ESC_KEY) {
          if (this.isDontShowModalChecked) {
            storage.setItem(HIDE_INTRO_MODAL_KEY, "true");
          }
          this.dialogHidden = !this.dialogHidden;
        }
      })
    },
    methods: {
      hideDialog() {
        if (this.isDontShowModalChecked) {
          storage.setItem(HIDE_INTRO_MODAL_KEY, "true");
        }
        this.dialogHidden = !this.dialogHidden;
      }
    }
  }
</script>
