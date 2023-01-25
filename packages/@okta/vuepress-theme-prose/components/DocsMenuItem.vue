<template>
  <li
    :class="{
      'expandable': (link.subLinks && link.subLinks.length > 0),
      'opened': isOpened,
      'is-home': link.path ? link.path === '/' : false
    }"
  >
    <SmartLink
      v-if="link.link"
      :item="link"
      :class="'link'"
    />
    <router-link
      v-else-if="link.path"
      v-slot="{ route, href, navigate }"
      :to="link.path"
      custom
      class="tree-nav-link"
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
  methods: {
    handleChange: function() {
        this.$parent.handleChange(this.link);
    },
  },
};
</script>