<template>
  <label class="toggle-switch switch-theme">
    <span :class="{'light-mode': true, 'active': !isDarkMode}" @click="toggleDarkMode(false)"></span>
    <span :class="{'dark-mode': true, 'active': isDarkMode}" @click="toggleDarkMode(true)"></span>
  </label>
</template>

<script>
import { deleteCookie, getCookie, setCookie } from "../util/attribution/cookies";

const themeModeCookieName = 'is_dark_mode';

export default {
  inject: ['appContext'],
  data() {
    return {
      isDarkMode: getCookie(themeModeCookieName, this.appContext.isDarkMode),
    };
  },
  methods: {
    toggleDarkMode: function(value) {
      this.isDarkMode = this.appContext.isDarkMode = !!value;
      setCookie(themeModeCookieName, this.isDarkMode, { expires: 365 });
    },
  }
};
</script>
