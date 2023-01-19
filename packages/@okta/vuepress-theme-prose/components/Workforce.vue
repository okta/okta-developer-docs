<template>
  <section class="workforce">
    <h2 class="workforce__title">
      Start your Workforce Identity journey
    </h2>
    <p class="workforce__text">
      Start with <strong>Learn</strong> if you’re new to Workforce Identity Cloud (WIC). Otherwise find the step you need and follow a link.
    </p>
    <article
      class="workforce__article"
      v-for="(item, index) in items"
      :key="index"
    >
      <h3 class="workforce__article-title">
        {{ item.title }}
      </h3>
      <hr class="workforce__article-line">
      <ul class="workforce__block">
        <li
          class="workforce__block-item"
          v-for="(block, index) in item.block"
          :key="index"
        >
          <h4 class="workforce__block-title">
            {{ block.title }}
          </h4>
          <p class="workforce__block-text">
            {{ block.text }}
          </p>
          <ul class="workforce__list">
            <li
              class="workforce__list-item"
              v-for="(list, index) in block.list"
              :key="index"
            >
              <a
                class="workforce__list-link"
                :href="list.url"
              >
                {{ list.text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
  export default {
    name: "Workforce",
    props: {
      items: {
        type: Array,
        required: true,
      }
    },
    data() {
      return {

      }
    }
  }
</script>
