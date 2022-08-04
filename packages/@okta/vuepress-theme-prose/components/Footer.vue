<template>
  <footer class="app-footer">
    <div class="footer--columns">
      <div class="footer--column need-support">
        <h4 class="column--header">{{ config.footer_nav.need_support.heading }}</h4> 
        <p>
          You can contact your Okta account team or ask us on our
          <SmartLink
            :item="{ link: config.forum_url, target: '_self' }"
            classes="link"
          >
            forum</SmartLink>.
        </p>
      </div>
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
            classes="link link--small link--bold link--uppercase link--spacing-large link--with-chevron-right link--heading"
          />
          <span class="description">{{ item.description }}</span>
        </div>
      </div>
      <div class="copyright">
        <span>{{ config.copyright_text }}</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  components: {
    SmartLink: () => import("../components/SmartLink.vue"),
  },
  computed: {
    config() {
      return this.$themeConfig;
    },
  },
};
</script>
