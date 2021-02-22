<template>
  <footer class="redesign">
    <p>
      <span class="italic">Need support?</span> Contact
      <SmartLink
        :item="{ link: 'mailto:developers@okta.com' }"
        classes="link link--underline"
      >
        developers@okta.com
      </SmartLink>
      or ask on the
      <SmartLink
        :item="{ link: config.forum_url, target: '_self' }"
        classes="link link--red"
      >
        forum.
      </SmartLink>
    </p>
    <div class="footer--columns">
      <div class="footer--column social">
        <h4 class="column--header">
          {{ config.footer_nav.social.heading }}
        </h4>
        <ul class="link-list">
          <li
            class="link-list--item"
            v-for="(item, itemIndex) in config.footer_nav.social.items"
            :key="itemIndex"
          >
            <SmartLink :item="item" classes="link link-list--link">
              <i
                class="link-list--icon"
                v-if="item.icon"
                v-html="item.icon"
              ></i>
              <span class="link-list--text">{{ item.text }}</span>
            </SmartLink>
          </li>
        </ul>
      </div>
      <div class="footer--column contact">
        <h4 class="column--header">
          {{ config.footer_nav.contact.heading }}
        </h4>
        <ul class="link-list">
          <li
            class="link-list--item"
            v-for="(item, itemIndex) in config.footer_nav.contact.items"
            :key="itemIndex"
          >
            <SmartLink :item="item" classes="link link-list--link">
              <span class="link-list--text">{{ item.text }}</span>
            </SmartLink>
          </li>
        </ul>
      </div>
      <div class="footer--column more">
        <h4 class="column--header">
          {{ config.footer_nav.more.heading }}
        </h4>
        <ul class="link-list">
          <li
            class="link-list--item"
            v-for="(item, itemIndex) in config.footer_nav.more.items"
            :key="itemIndex"
          >
            <SmartLink :item="item" classes="link link-list--link">
              <span class="link-list--text">{{ item.text }}</span>
            </SmartLink>
          </li>
        </ul>
      </div>
      <div class="footer--column websites">
        <div
          class="website"
          v-for="(item, itemIndex) in config.footer_nav.websites.items"
          :key="itemIndex"
        >
          <SmartLink
            :item="item"
            classes="link link--red link--small link--bold link--uppercase link--spacing-large"
          />
          <span class="description">{{ item.description }}</span>
        </div>
      </div>
      <div class="footer--column copyright">
        <span>{{ config.copyright_text }}</span>
      </div>
    </div>
    <img
      v-if="isHomePage"
      src="/img/home-magenta-circle.svg"
      class="home--magenta-circle"
    />
  </footer>
</template>

<script>
export default {
  components: {
    SmartLink: () => import("../components/SmartLink.vue"),
  },
  computed: {
    config() {
      return this.$themeConfig.redesign;
    },
  },
  data() {
    return {
      isHomePage: false,
    };
  },
  watch: {
    $route: "setIsHomepage",
  },
  methods: {
    setIsHomepage() {
      this.isHomePage = window.location.pathname === "/";
    },
  },
  mounted() {
    this.setIsHomepage();
  },
};
</script>
