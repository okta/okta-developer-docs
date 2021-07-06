<template>
  <div class="nutrition-facts" v-if="$page.frontmatter.nutritionItems">
    <div
      class="fact-item"
      v-for="(nutrition, index) in $page.frontmatter.nutritionItems"
      v-bind:key="index"
    >
      <div class="fact-item-title">{{ nutrition.title }}</div>
      <div class="fact-bullet-list">
        <ul>
          <li
            v-bind:class="{ 'none-list': nutrition.bulletList.length <= 1 }"
            v-for="(bulletItem, index) in nutrition.bulletList"
            v-bind:key="index"
          >
            {{ bulletItem }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/*
Inside index.md of the page you like put <NutritionFacts></NutritionFacts>
And special data set for that component.
Data set should be placed into YAML frontmatter block of .md file
see https://vuepress.vuejs.org/guide/frontmatter.html

Example with multiple items: index.md
---
nutritionItems:
  - title: This will cover
    bulletList:
      - Line one
      - Line two
  - title: Looking for something else?
    bulletList:
      - Line one
      - Line two

  - title: You should know
    bulletList:
      - Line one
      - Line two
  - title: You will need
    bulletList:
      - Line one
      - Line two
---

Example with single item: index.md
---
nutritionItems:
  - title: This will cover
    bulletList:
      - Line one
---

<NutritionFacts></NutritionFacts>

Recommendation: after changes in index.md file for local testing is recommended to
                re-run 'yarn run dev' command in case changes not visible.
*/
export default {
  name: "NutritionFacts",
  mounted() {
  }
};
</script>
