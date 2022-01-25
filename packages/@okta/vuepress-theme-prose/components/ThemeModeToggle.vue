<template>
  <label class="toggle-switch switch-theme">
    <span :class="{'light-mode': true, 'active': !this.appContext.isDarkMode}" @click="toggleDarkMode(false)"></span>
    <span :class="{'dark-mode': true, 'active': this.appContext.isDarkMode}" @click="toggleDarkMode(true)"></span>
  </label>
</template>

<script>
export default {
  inject: ['appContext'],
  methods: {
    toggleDarkMode: function(value) {
      this.appContext.isDarkMode = typeof value === "boolean" ? value : !this.appContext.isDarkMode;
    },
  }
};
</script>
