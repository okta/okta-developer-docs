<template>
  <div
    v-if="bannerIsOpened"
    class="announcement-banner"
  >
    <div
      class="announcement-banner--close"
      @click="handleBannerClose"
    >
      <i
        class="fa fa-times"
        @click="handleBannerClose"
      />
    </div>
    <div class="announcement-banner--content">
      <span class="announcement-banner--title">
        {{ title }}
      </span>
      <div class="announcement-banner--description-wrapper">
        <p class="announcement-banner--description">
          <slot name="description" />
        </p>
        <a
          v-if="ctaHref && ctaText"
          :href="ctaHref"
          class="announcement-banner--cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ ctaText }}
        </a>
      </div>
    </div>
    <div class="announcement-banner--logo">
      <img
        class="announcement-banner--logo--large"
        src="/img/homepage/announcement-large.png"
      >
      <img
        class="announcement-banner--logo--small"
        src="/img/homepage/announcement-small.png"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AnnouncementBanner",
  props: {
    title: String,
    ctaHref: String,
    ctaText: String
  },
  data() {
    return {
      bannerIsOpened: true
    };
  },
  methods: {
    handleBannerClose() {
      this.bannerIsOpened = !this.bannerIsOpened;
    }
  }
};
</script>
