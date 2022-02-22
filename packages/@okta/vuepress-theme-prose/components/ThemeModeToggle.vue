<template>
  <label class="toggle-switch switch-theme" @click="toggleDarkMode">
    <span :class="{'light-mode': true, 'active': !isDarkMode}"></span>
    <span :class="{'dark-mode': true, 'active': isDarkMode}"></span>
  </label>
</template>

<script>

const themeModeCookieName = 'is_dark_mode';
const darkThemeHtmlClass = 'dark-theme';

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
      this.isDarkMode = localStorage[themeModeCookieName] 
          ? JSON.parse(localStorage[themeModeCookieName])  
          : window.matchMedia('(prefers-color-scheme: dark)').matches;
    },

    toggleDarkMode: function() {
      this.isDarkMode = localStorage[themeModeCookieName] = !this.isDarkMode;
      this.addHtmlClass();
    },

    addHtmlClass: function() {
      const bodyClasses = document.body.classList;
      (this.isDarkMode === true) ? bodyClasses.add(darkThemeHtmlClass) : bodyClasses.remove(darkThemeHtmlClass);
    }
  }
};
</script>
