<template>
  <li
    :class="{
      expanded: expanded,
      active: item.active
    }"
  >
    <a
      v-if="item.link"
      :href="item.link"
      :class="{ [itemCss]: true, active: $page.path.includes(item.link) }"
      :target="item.target"
      v-html="item.text"
    ></a>
    <span v-else-if="item.text" v-html="item.text" :class="itemCss"></span>
    <div v-else-if="item.type === 'divider'" class="menu--divider"></div>
    <div v-else-if="item.type === 'icons'" class="menu--icons">
      <a
        v-for="(icon, index) in item.icons"
        class="menu--icon"
        :key="index"
        :href="icon.link"
        :title="icon.text"
      >
        <i v-if="icon.icon" v-html="icon.icon"></i>
      </a>
    </div>

    <ul v-if="item.children && item.children.length" class="submenu--items">
      <MenuItem
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        :itemCss="subItemCss"
      ></MenuItem>
    </ul>
  </li>
</template>

<script>
export default {
  components: {
    MenuItem: () => import("./MenuItem.vue")
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    itemCss: {
      type: String,
      default: ""
    },
    subItemCss: {
      type: String,
      default: ""
    }
  },
  computed: {
    expanded() {
      return this.item.children && this.item.children.length;
    }
  }
};
</script>
