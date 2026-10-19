<template>
  <div
    class="signup-bottom-card"
    :class="[`signup-bottom-card--${variant}`]"
  >
    <div class="signup-bottom-card__preview">
      <div class="signup-bottom-card__logo">
        <img
          :src="logoSrc"
          :alt="logoAlt"
          class="signup-bottom-card__logo-img"
        >
      </div>
      <div class="signup-bottom-card__screenshot">
        <img
          v-if="screenshotSrc"
          :src="screenshotSrc"
          :alt="title"
          class="signup-bottom-card__screenshot-img"
        >
      </div>
    </div>
    <div class="signup-bottom-card__content">
      <h3 class="signup-bottom-card__title">
        {{ title }}
      </h3>
      <p class="signup-bottom-card__description">
        {{ description }}
      </p>
    </div>
    <a
      :href="ctaLink"
      target="_blank"
      class="signup-bottom-card__cta"
    >
      {{ ctaText }}
      <svg
        class="signup-bottom-card__arrow-icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.33 8h9.34M8.67 4l4 4-4 4"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: "SignUpBottomCard",
  props: {
    variant: {
      type: String,
      default: "okta",
    },
    logoSrc: {
      type: String,
      required: true,
    },
    logoAlt: {
      type: String,
      default: "",
    },
    screenshotSrc: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ctaText: {
      type: String,
      required: true,
    },
    ctaLink: {
      type: String,
      required: true,
    },
  },
};
</script>
