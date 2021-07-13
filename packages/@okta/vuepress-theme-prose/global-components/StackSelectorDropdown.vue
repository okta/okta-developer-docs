<template>
  <nav class="select-dropdown">
    <v-select
      :options="options"
      v-model="selectedOption"
      :searchable="true"
      :multiple="false"
      :clearable="false"
      v-on:input="inputChanged"
    >
      <template #selected-option="{ title, css }">
        <i :class="css"></i><span class="framework">{{ title }}</span>
      </template>
      <template #option="{ title, link, css }">
        <div class="dropdown-item" :key="link">
          <i :class="css"></i><span class="framework">{{ title }}</span>
        </div>
      </template>
    </v-select>
  </nav>
</template>

<script>
import { getGuidesInfo, guideFromPath } from "../util/guides";

export default {
  name: "StackSelectorDropdown",
  inject: ["stackSelectorData"],
  props: {},
  data() {
    return {
      offsetFromViewport: null,
      hasFocus: false,
    };
  },
  computed: {
    guideName() {
      return guideFromPath(this.$route.path).guideName;
    },
    framework() {
      // Default to first available framework
      return guideFromPath(this.$route.path).framework || this.options[0].name;
    },
    sectionName() {
      return guideFromPath(this.$route.path).sectionName;
    },
    guide() {
      return getGuidesInfo({ pages: this.$site.pages }).byName[this.guideName];
    },
    section() {
      return this.guide.sectionByName[this.sectionName];
    },
    options() {
      const snippetByName = this.section?.snippetByName;

      // when snippet name is provided, find frameworks data for that one
      if (this.snippet) {
        return snippetByName?.[this.snippet]?.frameworks ?? [];
      }

      if (typeof snippetByName !== "object") {
        return [];
      }

      // when no snippet name is provided, use the first defined snippet in the snippet data
      const frameworksData = Object.values(snippetByName)[0]?.frameworks ?? [];

      return frameworksData;
    },
    snippetComponentKey() {
      const option = this.options.find(
        (option) => option.framework === this.framework
      );
      return option ? option.componentKey : "";
    },
    selectedOption: {
      get: function () {
        return this.options.find(
          (option) => option.framework === this.framework
        );
      },
      set: function (selectedOption) {
        // no-op for silencing computed property assignment(by vue-select) warning
      },
    },
  },
  methods: {
    inputChanged: function (value) {
      if (value && value.link) {
        this.hasFocus = true;
        this.$router.push(value.link);

        // After new value selected we record new route value and prev value into shared stackSelectorData object
        // to be able to use it in SidebarItem.vue component
        this.stackSelectorData.from = this.selectedOption.link;
        this.stackSelectorData.to = value.link;
      }
    },
  },
};
</script>

