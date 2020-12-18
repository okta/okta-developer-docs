<template>
  <footer class="redesign">
    <p>
      <span class="italic">Need support?</span> Contact <a class="link link--underline" href="mailto:developers@okta.com">developers@okta.com</a> or ask on the <a class="link link--red" :href="$themeConfig.redesign.forum_url">forum.</a>
    </p>
    <div class="footer--columns">
      <div class="footer--column social">
        <h4 class="column--header">{{$themeConfig.redesign.footer_nav.social.heading}}</h4>
        <ul class="link-list">
          <li class="link-list--item" v-for="(item, itemIndex) in $themeConfig.redesign.footer_nav.social.items" :key="itemIndex">
            <a class="link link-list--link" :href="item.link">
              <i class="link-list--icon" v-if="item.icon" v-html="item.icon"></i>
              <span class="link-list--text">{{item.text}}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="footer--column contact">
        <h4 class="column--header">{{$themeConfig.redesign.footer_nav.contact.heading}}</h4>
        <ul class="link-list">
          <li  class="link-list--item" v-for="(item, itemIndex) in $themeConfig.redesign.footer_nav.contact.items" :key="itemIndex">
            <a class="link link-list--link" :href="item.link">
              <i class="link-list--icon" v-if="item.icon" v-html="item.icon"></i>
              <span class="link-list--text">{{item.text}}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="footer--column more">
        <h4 class="column--header">{{$themeConfig.redesign.footer_nav.more.heading}}</h4>
        <ul class="link-list">
          <li class="link-list--item" v-for="(item, itemIndex) in $themeConfig.redesign.footer_nav.more.items" :key="itemIndex">
            <a class="link link-list--link" :href="item.link">
              <i class="link-list--icon" v-if="item.icon" v-html="item.icon"></i>
              <span class="link-list--text">{{item.text}}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="footer--column websites">
        <div class="website" v-for="(item, itemIndex) in $themeConfig.redesign.footer_nav.websites.items" :key="itemIndex">
          <a class="link link--red link--small link--bold link--uppercase link--spacing-large" :href="item.link" target="_blank" rel="noopener noreferrer">{{item.text}}</a>
          <span class="description">{{item.description}}</span>
        </div>
      </div>
      <div class="footer--column copyright">
        <span>{{$themeConfig.redesign.copyright_text}}</span>
      </div>
    </div>
  </footer>
</template>