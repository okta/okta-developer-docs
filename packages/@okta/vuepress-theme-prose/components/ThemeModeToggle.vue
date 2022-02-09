<template>
  <label class="toggle-switch switch-theme">
    <span :class="{'light-mode': true, 'active': !isDarkMode}" @click="toggleDarkMode(false)"></span>
    <span :class="{'dark-mode': true, 'active': isDarkMode}" @click="toggleDarkMode(true)"></span>
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

  created() {
    this.getDarkMode();
    this.addHtmlClass();
  },

  methods: {
    getDarkMode: function() {
      this.isDarkMode = localStorage[themeModeCookieName] 
          ? JSON.parse(localStorage[themeModeCookieName])  
          : window.matchMedia('(prefers-color-scheme: dark)').matches;
    },

    toggleDarkMode: function(value) {
      this.isDarkMode = localStorage[themeModeCookieName] = !!value;
      this.addHtmlClass();
    },

    addHtmlClass: function() {
      const bodyClasses = document.body.classList;
      (this.isDarkMode === true) ? bodyClasses.add(darkThemeHtmlClass) : bodyClasses.remove(darkThemeHtmlClass);
    }
  }
};
</script>
