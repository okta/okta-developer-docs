<template>
  <li
    :class="{
      'expandable': (link.subLinks && link.subLinks.length > 0),
      'opened': isOpened,
      'is-home': link.path ? link.path === '/' : false
    }"
  >
    <SmartLink
      :item="link"
      :class="'link'"
      v-if="link.link"
    />
    <router-link
      :to="link.path"
      custom
      class="tree-nav-link"
      v-else-if="link.path"
      v-slot="{ route, href, navigate }"
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
          class="link shevron"
          v-if="link.path && link.subLinks"
          @click="handleChange"
        ></span>
      </span>
    </router-link>

    <span
      class="link"
      v-if="!link.path && link.subLinks"
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
  methods: {
    handleChange: function() {
        this.$parent.handleChange(this.link);
    },
  },
};
</script>