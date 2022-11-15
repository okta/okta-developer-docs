<template>
  <li
    :class="{
      expandable: isExpandable,
      open: isOpen,
    }"
    @click="isOpen = !isOpen"
  >
    <SmartLink
      :item="item"
      :classes="itemCss"
      v-if="item.link"
    />
    <span
      :class="itemCss"
      v-else-if="item.text"
      v-html="item.text"
    ></span>
    <div
      class="menu--divider"
      v-else-if="item.type === 'divider'"
    ></div>
    <div
      class="menu--icons"
      v-else-if="item.type === 'icons'"
    >
      <SmartLink
        :item="icon"
        classes="menu--icon"
        v-for="(icon, index) in item.icons"
        :key="index"
      >
        <i
          v-if="icon.icon"
          v-html="icon.icon"
        ></i>
      </SmartLink>
    </div>

    <ul
      class="submenu--items"
      v-if="item.children && item.children.length"
    >
      <MenuItem
        :item="child"
        :itemCss="subItemCss"
        v-for="(child, index) in item.children"
        :key="index"
      />
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
