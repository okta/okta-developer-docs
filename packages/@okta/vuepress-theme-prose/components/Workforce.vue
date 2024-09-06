<template>
  <section class="workforce">
    <div class="wrapper">
      <h2 class="workforce__title dont-break-out">
        Start your Workforce Identity journey
      </h2>
      <p class="workforce__text dont-break-out">
        Welcome! Start with <strong>Learn</strong> if you’re new to Workforce Identity Cloud, or find the step in your journey and follow the links to browse docs.
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
                <img 
                  class="workforce__block-img workforce__block-img-light" 
                  :src="block.src"
                >
                <img 
                  class="workforce__block-img workforce__block-img-dark" 
                  :src="block.src_dark"
                >
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
                  :target="list.isExternal ? '_blank': ''"
                >
                  {{ list.text }}
                </a>
                <div 
                  v-if="list.isExternal" 
                  class="resources__list-icon" 
                />
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
