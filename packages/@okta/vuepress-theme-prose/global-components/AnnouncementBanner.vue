<template>
  <div v-if="bannerIsOpened" class="announcement-banner">
    <div v-on:click="handleBannerClose" class="announcement-banner--close">
      <i v-on:click="handleBannerClose" class="fa fa-times"></i>
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
          v-if="ctaHref && ctaText"
          :href="ctaHref"
          class="announcement-banner--cta"
        >
          {{ ctaText }} &rsaquo;
        </a>
      </div>
    </div>
    <div class="announcement-banner--logo">
      <img
        class="announcement-banner--logo--large"
        src="/img/homepage/announcement-large.png"
      />
      <img
        class="announcement-banner--logo--small"
        src="/img/homepage/announcement-small.png"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    ctaHref: String,
    ctaText: String
  },
  name: "announcementBanner",
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
