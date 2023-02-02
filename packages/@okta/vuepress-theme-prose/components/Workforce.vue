<template>
  <section class="workforce">
    <div class="wrapper">
      <h2 class="workforce__title dont-break-out">
        Start your Workforce Identity journey
      </h2>
      <p class="workforce__text dont-break-out">
        Start with <strong>Learn</strong> if you’re new to Workforce Identity Cloud (WIC). Otherwise find the step you need and follow a link.
      </p>
      <article
        v-for="(item, index) in items"
        :key="index"
        class="workforce__article"
      >
        <h3 class="workforce__article-title dont-break-out">
          {{ item.title }}
        </h3>
        <div
          class="workforce__article-line"
          aria-hidden="true"
        />
        <ul class="workforce__block">
          <li
            v-for="(block, index) in item.block"
            :key="index"
            class="workforce__block-item"
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
                v-for="(list, index) in block.list"
                :key="index"
                class="workforce__list-item"
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
    </div>
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
