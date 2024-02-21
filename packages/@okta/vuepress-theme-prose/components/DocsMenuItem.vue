<template>
  <li
    :class="{
      'expandable': (link.subLinks && link.subLinks.length > 0),
      'opened': isOpened,
      'is-home': link.path ? link.path === '/' : false,
      'external-link': isExternalLink
    }"
  >
    <SmartLink
      v-if="isExternalLink"
      :item="{ link: link.path, target: link.target ? link.target : '_blank' }"
      classes="tree-nav-link"
    >
      <span class="text-holder">
        {{ link.title }}

        <svg
          v-if="!link.target || link.target === '_blank'"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          width="15"
          height="15"
          class="icon outbound"
        >
          <path 
            fill="var(--c-sidebar-external-link-mobile)"
            d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
          />
          <polygon
            fill="var(--c-sidebar-external-link-mobile)"
            points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
          />
        </svg>
      </span>
    </SmartLink>

    <SmartLink
      v-else-if="link.link"
      :item="link"
      :class="'link'"
    />
    <router-link
      v-else-if="link.path"
      v-slot="{ route, href, navigate }"
      :to="link.path"
      custom
      class="tree-nav-link mobile-docs-menu"
    >
      <span>
        <a
          :href="href"
          :class="route.path === $route.path ? 'router-link-active link' : 'link'"
          :aria-current="route.path === $route.path && 'page'"
          @click="navigate"
        >
          <slot>
            <span class="text-holder">
              {{ link.title }}
            </span>
          </slot>
        </a>
        <span
          v-if="link.path && link.subLinks"
          class="link shevron"
          @click="handleChange"
        />
      </span>
    </router-link>

    <span
      v-if="!link.path && link.subLinks"
      class="link"
      @click="handleChange"
    >{{ link.title }}</span>
  </li>
</template>

<script>
export default {
  name: "DocsMenuItem",
  components: {
    SmartLink: () => import("./SmartLink.vue"),
  },
  props: ["link", "isOpened"],
  computed: {
    isExternalLink() {
      if(!this.link?.path) {
        return false;
      }
      
      return this.link.path.toLowerCase().startsWith('http') || this.link.path.toLowerCase().startsWith('www.')
    }
  },
  methods: {
    handleChange: function() {
        this.$parent.handleChange(this.link);
    },
  },
};
</script>