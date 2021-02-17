<template>
  <li
    :class="{
      expandable: isExpandable,
      open: isOpen,
    }"
    @click="isOpen = !isOpen"
  >
    <SmartLink v-if="item.link" :item="item" :classes="itemCss" />
    <span v-else-if="item.text" v-html="item.text" :class="itemCss"></span>
    <div v-else-if="item.type === 'divider'" class="menu--divider"></div>
    <div v-else-if="item.type === 'icons'" class="menu--icons">
      <SmartLink
        v-for="(icon, index) in item.icons"
        :key="index"
        :item="icon"
        classes="menu--icon"
      >
        <i v-if="icon.icon" v-html="icon.icon"></i>
      </SmartLink>
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
    MenuItem: () => import("./MenuItem.vue"),
    SmartLink: () => import("./SmartLink.vue"),
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    itemCss: {
      type: String,
      default: "",
    },
    subItemCss: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    isExpandable() {
      return this.item.children && this.item.children.length;
    },
  },
};
</script>
