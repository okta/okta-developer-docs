<template>
  <section class="workforce">
    <h2 class="workforce__title dont-break-out">
      Start your Workforce Identity journey
    </h2>
    <p class="workforce__text dont-break-out">
      Start with <strong>Learn</strong> if you’re new to Workforce Identity Cloud (WIC). Otherwise find the step you need and follow a link.
    </p>
    <article
      class="workforce__article"
      v-for="(item, index) in items"
      :key="index"
    >
      <h3 class="workforce__article-title dont-break-out">
        {{ item.title }}
      </h3>
      <hr
        class="workforce__article-line"
        aria-hidden="true"
      >
      <ul class="workforce__block">
        <li
          class="workforce__block-item"
          v-for="(block, index) in item.block"
          :key="index"
        >
          <div class="workforce__block-wrapper">
            <h4 class="workforce__block-title dont-break-out">
              {{ block.title }}
            </h4>
            <p class="workforce__block-text dont-break-out">
              {{ block.text }}
            </p>
          </div>
          <ul class="workforce__list">
            <li
              class="workforce__list-item"
              v-for="(list, index) in block.list"
              :key="index"
            >
              <a
                class="workforce__list-link dont-break-out"
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
