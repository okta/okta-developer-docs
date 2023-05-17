<template>
  <footer class="app-footer">
    <div class="app-footer__wrapper wrapper">
      <h2 class="visually-hidden">
        Additional links
      </h2>
      <div class="footer--columns">
        <div class="footer--column need-support">
          <a
            class="footer-logotype"
            href="/"
          >
            <img
              class="column--header"
              src="/img/logotype.svg"
              width="180"
              height="28"
              alt="Okta developer logotype"
            >
          </a>
          <p class="footer-text">
            Questions? Ask us on the
            <SmartLink
              :item="{ link: config.forum_url, target: '_self' }"
              classes="link"
            >
              forum.
            </SmartLink>
          </p>
          <ul class="footer-social-networks link-list">
            <li
              v-for="(item, itemIndex) in config.footer_nav.social.items"
              :key="itemIndex"
              class="link-list--item"
            >
              <SmartLink
                :item="item"
                classes="link link-list--link"
              >
                <i
                  v-if="item.icon"
                  class="link-list--icon"
                  v-html="item.icon"
                />
                <span class="link-list--text">{{ item.text }}</span>
              </SmartLink>
            </li>
          </ul>
        </div>
        <div class="footer--column contact">
          <h3 class="column--header">
            {{ config.footer_nav.contact.heading }}
          </h3>
          <ul class="link-list">
            <li
              v-for="(item, itemIndex) in config.footer_nav.contact.items"
              :key="itemIndex"
              class="link-list--item"
            >
              <SmartLink
                :item="item"
                classes="link link-list--link"
              >
                <span class="link-list--text">{{ item.text }}</span>
              </SmartLink>
            </li>
          </ul>
        </div>
        <div class="footer--column more">
          <h3 class="column--header">
            {{ config.footer_nav.more.heading }}
          </h3>
          <ul class="link-list">
            <li
              v-for="(item, itemIndex) in config.footer_nav.more.items"
              :key="itemIndex"
              class="link-list--item"
            >
              <SmartLink
                :item="item"
                classes="link link-list--link"
              >
                <span class="link-list--text">{{ item.text }}</span>
              </SmartLink>
            </li>
          </ul>
        </div>
        <div class="footer--column websites">
          <div
            v-for="(item, itemIndex) in config.footer_nav.websites.items"
            :key="itemIndex"
            class="website"
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
