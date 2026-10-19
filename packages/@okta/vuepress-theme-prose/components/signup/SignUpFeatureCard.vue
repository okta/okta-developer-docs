<template>
  <div class="signup-feature-card">
    <div class="signup-feature-card__icon">
      <img
        width="40"
        height="40"
        :src="icon"
        :alt="title"
        class="signup-feature-card__icon-image"
      >
    </div>
    <div class="signup-feature-card__content">
      <h3 class="signup-feature-card__title">
        {{ title }}
      </h3>
      <p class="signup-feature-card__description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpFeatureCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>
