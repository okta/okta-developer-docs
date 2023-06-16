<template>
  <label
    class="toggle-switch switch-theme"
    @click="toggleDarkMode"
  >
    <span :class="{'light-mode': true, 'active': !isDarkMode}">
      <img
        src="/img/icons/mode-light.svg"
        width="16"
        height="16"
        aria-hidden="true"
        alt=""
      >
    </span>
    <span :class="{'dark-mode': true, 'active': isDarkMode}">
      <img
        v-if="isDarkMode"
        src="/img/icons/mode-dark.svg"
        width="12"
        height="13"
        aria-hidden="true"
        alt=""
      >
      <img
        v-else
        src="/img/icons/mode-dark-not-active.svg"
        width="12"
        height="13"
        aria-hidden="true"
        alt=""
      >
    </span>
  </label>
</template>

<script>
import storage from "../util/localStorage";

const THEME_MODE_KEY = 'is_dark_mode';
const DARK_THEME_CLASS = 'dark-theme';

export default {
  data() {
    return {
      isDarkMode: false,
    };
  },

  mounted() {
    this.getDarkMode();
    this.addHtmlClass();
  },

  methods: {
    getDarkMode: function() {
      this.isDarkMode = storage.getItem(THEME_MODE_KEY)
        ? JSON.parse(storage.getItem(THEME_MODE_KEY))
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
    },

    toggleDarkMode: function() {
      this.isDarkMode = !this.isDarkMode;
      storage.setItem(THEME_MODE_KEY, this.isDarkMode);
      this.addHtmlClass();
    },

    addHtmlClass: function() {
      const bodyClasses = document.body.classList;
      bodyClasses.add('loaded');
      this.isDarkMode === true
        ? bodyClasses.add(DARK_THEME_CLASS)
        : bodyClasses.remove(DARK_THEME_CLASS);
    }
  }
};
</script>
