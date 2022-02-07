<template>
  <label class="toggle-switch switch-theme">
    <span :class="{'light-mode': true, 'active': !isDarkMode}" @click="toggleDarkMode(false)"></span>
    <span :class="{'dark-mode': true, 'active': isDarkMode}" @click="toggleDarkMode(true)"></span>
  </label>
</template>

<script>
import { isSetCookie, getCookie, setCookie } from "../util/attribution/cookies";

const themeModeCookieName = 'is_dark_mode';

export default {
  data() {
    return {
      isDarkMode: 
        (
          !isSetCookie(themeModeCookieName) 
          && window.matchMedia('(prefers-color-scheme: dark)').matches
        ) 
        || getCookie(themeModeCookieName, false),
    };
  },
  created() {
    this.addHtmlClass();
  },
  methods: {
    toggleDarkMode: function(value) {
      this.isDarkMode = !!value;
      this.addHtmlClass();
      setCookie(themeModeCookieName, this.isDarkMode, { expires: 365 });
    },
    addHtmlClass: function() {
      this.isDarkMode ? document.body.classList.add('dark-theme') : document.body.classList.remove('dark-theme');
    }
  }
};
</script>
