<template>
  <li :class="{
      'expandable': link.subLinks,
      'opened': isOpened,
    }"
  >
    <router-link
          v-if="link.path"
          :to="link.path"
          v-slot="{ route, href, navigate }"
          class="tree-nav-link"
        >
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
    </router-link>

    <span v-if="!link.path && link.subLinks" class="link" @click="handleChange">{{link.title}}</span>

  </li>
</template>

<script>
export default {
  name: "DocsMenuItem",
  props: ["link", "isOpened"],
  methods: {
    handleChange: function() {
        this.$parent.handleChange(this.link);
    },
  },
};
</script>