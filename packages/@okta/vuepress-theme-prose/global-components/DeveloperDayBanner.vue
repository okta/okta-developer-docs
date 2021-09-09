<template>
  <div v-if="bannerIsOpened" class="developer-day-banner">
    <i
      v-on:click="handleBannerClose"
      class="fa fa-times developer-day-banner--close"
    ></i>
    <div class="row justify-content-center">
      <div class="col-lg-11 col-xl-11 col-md-12 col-xs-12">
        <div class="d-flex align-items-center">
          <div
            class="
              col-lg-8 col-xl-8 col-md-6 col-xs-6
              offset-md-1 offset-xs-1 offset-xl-0 offset-lg-0
            "
          >
            <h2
              class="
                homepage--sub-heading homepage--color-main
                developer-day-banner--header-no-margin-large
              "
            >
              Developer Day
            </h2>
            <h2
              class="
                homepage--sub-heading homepage--color-main
                developer-day-banner--header-no-margin-small
              "
            >
              Developer Day
            </h2>
            <div class="developer-day-banner--cta">
              <span class="developer-day-banner--cta-large">
                Missed developer day? Catch all the recordings here.
              </span>
              <span class="developer-day-banner--cta-small">
                Missed developer day? Catch all the recordings here.
              </span>
              <a href="https://www.youtube.com/watch?v=xD-G-Sne3a8&list=PLshTZo9V1-aHrVURzggebSWeltPQ4KCex">
                Watch Now&nbsp;<i class="fa fa-chevron-right"></i>
              </a>
            </div>
          </div>
          <div class="col-4">
            <div class="developer-day-banner--logo-container">
              <img
                class="developer-day-banner--logo-container--large"
                src="/img/homepage/dev-day-logo-big-screen.png"
              />
              <img
                class="developer-day-banner--logo-container--small"
                src="/img/homepage/dev-day-logo-small-screen.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "DeveloperDayBanner",
  data() {
    return {
      bannerIsOpened: true,
    };
  },
  methods: {
    handleBannerClose() {
      this.bannerIsOpened = !this.bannerIsOpened;
    },
  },
};
</script>
