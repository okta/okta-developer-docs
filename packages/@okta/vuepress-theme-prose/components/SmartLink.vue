<template>
  <RouterLink
    v-if="isInternalURI"
    :class="classes"
    :to="item.link"
    :exact="exact"
  >
    <slot v-if="$slots.default"></slot>
    <span v-else-if="item.text">{{ item.text }}</span>
  </RouterLink>
  <a v-else :href="item.link" :class="classes" :target="target" :rel="rel">
    <slot v-if="$slots.default"></slot>
    <span v-else-if="item.text">{{ item.text }}</span>
  </a>
</template>

<script>
const EXTERNAL_REGEX = /^[a-z]+:/;
export function isExternal(path) {
  return EXTERNAL_REGEX.test(path);
}

const MAILTO_REGEX = /^mailto:/;
export function isMailto(path) {
  return MAILTO_REGEX.test(path);
}

export default {
  name: "SmartLink",
  props: {
    item: {
      required: true,
    },
    classes: {
      type: String,
    },
  },
  data() {
    return {
      isSearchPage: false,
    };
  },
  beforeMount() {
    this.setIsSearchPage();
  },
  watch: {
    $route: "setIsSearchPage",
  },
  computed: {
    exact() {
      // Exact mode required to prevent links targeting the root to always be active
      return this.item.link === "/";
    },

    isMailToURI() {
      return isMailto(this.item.link);
    },

    isBlankTarget() {
      return this.target === "_blank";
    },

    // Used to force page reload when link is external, blank or from the search page
    isInternalURI() {
      return (
        !isExternal(this.item.link) && !this.isBlankTarget && !this.isSearchPage
      );
    },

    target() {
      if (this.isMailToURI) {
        return null;
      }
      if (this.item.target) {
        return this.item.target;
      }
      return isExternal(this.item.link) ? "_blank" : null;
    },

    rel() {
      if (this.item.rel) {
        return this.item.rel;
      }
      return this.isBlankTarget ? "noopener noreferrer" : null;
    },
  },
  methods: {
    setIsSearchPage: function() {
      this.isSearchPage = window.location.pathname.includes("/search");
    },
  },
};
</script>
