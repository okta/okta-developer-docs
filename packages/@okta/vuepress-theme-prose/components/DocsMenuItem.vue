<template>
  <li :class="{
      'expandable': (link.subLinks && link.subLinks.length > 0),
      'opened': isOpened,
      'is-home': link.path ? link.path === '/' : false
    }"
  >
    <SmartLink v-if="link.link" :item="link" :class="'link'"/>
    <router-link
          v-else-if="link.path"
          :to="link.path"
          custom
          v-slot="{ route, href, navigate }"
          class="tree-nav-link"
        >
        <span>
          <a
            :href="href"
            @click="navigate"
            :class="route.path === $route.path ? 'router-link-active link' : 'link'"
            :aria-current="route.path === $route.path && 'page'"
            >
            <slot>
              <span class="text-holder">
                {{ link.title }}
              </span>
            </slot>
          </a>
          <span v-if="link.path && link.subLinks" class="link shevron" @click="handleChange"></span>
          </span>
    </router-link>

    <span v-if="!link.path && link.subLinks" class="link" @click="handleChange">{{link.title}}</span>

  </li>
</template>

<script>
export default {
  name: "DocsMenuItem",
  props: ["link", "isOpened"],
  components: {
    SmartLink: () => import("./SmartLink.vue"),
  },
  methods: {
    handleChange: function() {
        this.$parent.handleChange(this.link);
    },
  },
};
</script>