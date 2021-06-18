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
And special data set for that component
ex.
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
*/
export default {
  name: "NutritionFacts",
  mounted() {
  }
};
</script>
