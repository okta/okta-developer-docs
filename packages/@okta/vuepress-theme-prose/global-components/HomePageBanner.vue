<template>
  <div class="home-page-banner">
    <div :class="{ 'home-page-banner--heading': true, 'home-page-banner--heading-hidden': !$slots.heading }">
      <slot name="heading" />
    </div>
    <div class="home-page-banner--description">
      <slot name="description" />
    </div>

    <div
      v-if="primaryCtaText || secondaryCtaText"
      class="home-page-banner--cta-container"
    >
      <a
        v-if="primaryCtaLink"  
        :href="primaryCtaLink"
        :target="primaryLinkTarget ? primaryLinkTarget : '_blank'"
      >
        <button
          v-if="primaryCtaText"
          class="home-page-action-button primary-button"
          @click="handlePrimaryCtaClick()"
        >
          {{ primaryCtaText }}
        </button>
      </a>
      <button
        v-else-if="primaryCtaText"
        class="home-page-action-button primary-button"
        @click="handlePrimaryCtaClick()"
      >
        {{ primaryCtaText }}
      </button>
      <a
        v-if="secondaryCtaLink" 
        :href="secondaryCtaLink"
        :target="secondaryLinkTarget ? secondaryLinkTarget : '_blank'"
      >
        <button
          v-if="secondaryCtaText"
          class="home-page-action-button secondary-button"
          @click="handleSecondaryCtaClick()"
        >
          {{ secondaryCtaText }}
        </button>
      </a>
      <button
        v-else-if="secondaryCtaText"
        class="home-page-action-button secondary-button"
        @click="handleSecondaryCtaClick()"
      >
        {{ secondaryCtaText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePageBanner",
  props: ["primaryCtaLink", "primaryCtaText", "primaryLinkTarget", "secondaryCtaLink", "secondaryCtaText", "secondaryLinkTarget"],
  methods: {
    handlePrimaryCtaClick() {
      this.$emit("onPrimaryCtaClick");
    },
    handleSecondaryCtaClick() {
      this.$emit("onSecondaryCtaClick");
    },
  },
};
</script>
