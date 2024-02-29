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
        v-if="primaryCtaLink && primaryCtaText"  
        :href="primaryCtaLink"
        :target="primaryLinkTarget ? primaryLinkTarget : '_blank'"
      >
        <button
          class="home-page-action-button primary-button"
        >
          {{ primaryCtaText }}
        </button>
      </a>
      <a
        v-if="secondaryCtaLink && secondaryCtaText" 
        :href="secondaryCtaLink"
        :target="secondaryLinkTarget ? secondaryLinkTarget : '_blank'"
      >
        <button
          class="home-page-action-button secondary-button"
        >
          {{ secondaryCtaText }}
        </button>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePageBanner",
  props: ["primaryCtaLink", "primaryCtaText", "primaryLinkTarget", "secondaryCtaLink", "secondaryCtaText", "secondaryLinkTarget"]
};
</script>
