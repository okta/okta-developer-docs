<template>
  <div class="archetecture-center__items">
    <div
      v-for="(link, link_key) in links"
      :key="link.title"
      class="archetecture-center__item"
    >
      <div 
        v-for="(tooltip, tooltip_key) in tooltips" 
        v-if="tooltip_key == link_key && tooltip.text != ''"
        :key="tooltip_key"
        class="archetecture-center__tooltip">
          {{tooltip.text}}
      </div>
      <div>
        <h2>{{ link.title }}</h2>
        <div
          v-if="link.description"
          class="generated-content"
        >
          <Content
            :page-key="getPageKey(link.path)"
            slot-key="description"
          />
        </div>
        <div
          v-else
          class="generated-content"
        >
          <Content :page-key="getPageKey(link.path)" />
          <p>Index page for "{{ link.title }}" articles.</p>
        </div>
      </div>
      <router-link
        v-slot="{ navigate }"
        :to="link.path"
      >
        <a 
          :href="link.path"
          @click="navigate"
        >
          <slot>Learn more</slot>
        </a>
      </router-link>
    </div>
  </div>
</template>

<script>
	export default {
    name: 'GeneratedContent',
    inject: ["appContext"],
    data() {
      return {
        title: '',
        links: [],
        tooltips: [
          {
            text: ''
          },
          {
            text: 'test tooltip 2'
          },
          {
            text: 'test tooltip 3'
          },
          {
            text: 'test tooltip 4'
          },
          {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, ea. Lorem ipsum dolor'
          }
        ]
      }
    },
    watch: {
      $route(to, from) {
        if (from.path !== to.path) {
          this.getContent(this.appContext.treeNavDocs);
        }
      },
    },
    mounted() {
      this.getContent(this.appContext.treeNavDocs);
    },
    methods: {
      getContent(navigation) {
        for (let el of navigation) {
          if (!!window && el.path && el.path == window.location.pathname) {
            document.title = el.title + ' | ' + this.$site.title;
            this.title = el.title;
            if (el.subLinks) {
              this.links = el.subLinks;
            }
            break;
          }
          if (el.subLinks && el.subLinks.length > 0) {
            this.getContent(el.subLinks);
          }
        }
      },
      getPageKey(path) {
        let set = new Set(this.$router.options.routes);
        for (let route of set) {
          if (path == route.path) {
            return route.name;
          }
        }
        return '';
      }
    }
  }
</script>