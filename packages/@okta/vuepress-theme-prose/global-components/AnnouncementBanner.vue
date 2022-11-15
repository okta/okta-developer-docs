<template>
  <div
    class="announcement-banner"
    v-if="bannerIsOpened"
  >
    <div
      class="announcement-banner--close"
      @click="handleBannerClose"
    >
      <i
        class="fa fa-times"
        @click="handleBannerClose"
      ></i>
    </div>
    <div class="announcement-banner--content">
      <span class="announcement-banner--title">
        {{ title }}
      </span>
      <div class="announcement-banner--description-wrapper">
        <p class="announcement-banner--description">
          <slot name="description"></slot>
        </p>
        <a
          :href="ctaHref"
          class="announcement-banner--cta"
          target="_blank"
          rel="noopener noreferrer"
          v-if="ctaHref && ctaText"
        >
          {{ ctaText }}
        </a>
      </div>
    </div>
    <div class="announcement-banner--logo">
      <img
        class="announcement-banner--logo--large"
        src="/img/homepage/announcement-large.png"
        alt="announcement-large"
      >
      <img
        class="announcement-banner--logo--small"
        src="/img/homepage/announcement-small.png"
        alt="announcement-small"
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
