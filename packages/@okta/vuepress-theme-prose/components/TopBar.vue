<template>
<div>
  <nav class="top-bar-nav container">
          <a href="https://developer.okta.com/" class="top-bar-nav--logo">
              <svg viewBox="0 0 431.9 151.4">
                <path d="M102.2 41.4c-21 0-38.1 17.1-38.1 38.1s17.1 38.1 38.1 38.1 38.1-17.1 38.1-38.1-17.1-38.1-38.1-38.1zm0 57.1c-10.5 0-19-8.5-19-19s8.5-19 19-19 19 8.5 19 19c.1 10.5-8.4 19-18.9 19.1 0 0-.1 0-.1-.1zM169.1 92.3c0-1.9 1.5-3.4 3.4-3.4.9 0 1.8.4 2.4 1 9.5 9.7 25.3 26.3 25.4 26.4.4.5.8.8 1.4.9l1.6.2h17.2c1.8 0 3.3-1.4 3.4-3.2 0-.8-.3-1.5-.8-2.2l-28.6-29.2-1.5-1.5c-3.2-3.9-2.9-5.4.8-9.3l22.6-25.1c1.1-1.4.8-3.5-.6-4.6-.6-.4-1.3-.7-2-.7h-17c-.6.2-1.1.5-1.5.9L175 64.4c-1.3 1.4-3.4 1.5-4.8.2-.7-.6-1.1-1.5-1.1-2.5V18.9c0-1.7-1.3-3-3-3h-13c-2.2 0-3.3 1.5-3.3 2.8v95.8c0 2.2 1.8 2.8 3.3 2.8h12.7c1.7.1 3.2-1.2 3.3-2.9V92.3zM273 114l-1.4-12.8c-.2-1.7-1.7-2.9-3.4-2.7h-.1l-2.9.2c-10.1 0-18.5-7.9-19-18V64.2c-.1-2 1.5-3.6 3.5-3.7h17c1.7-.1 3.1-1.5 3-3.2V45.2c0-2.3-1.5-3.6-2.8-3.6h-17.1c-1.9.1-3.5-1.5-3.6-3.4V18.9c-.1-1.7-1.5-3.1-3.2-3H230.2c-1.6-.1-3 1.1-3.1 2.7v62.2c.5 21 17.9 37.6 38.9 37 1.4 0 2.9-.2 4.3-.3 1.7-.3 2.9-1.8 2.7-3.5zM364.7 98c-10.8 0-12.4-3.8-12.4-18.3V44.8c0-1.8-1.4-3.2-3.2-3.2h-12.9c-1.8 0-3.2 1.4-3.3 3.2v1.6C314.6 36 291.3 42.5 281 60.8c-10.4 18.3-3.9 41.6 14.4 51.9 14 7.9 31.4 6.2 43.5-4.2 3.6 5.5 9.3 9.1 18.3 9.1 1.5 0 9.7.3 9.7-3.5v-13.6c.1-1.3-.9-2.4-2.2-2.5zm-50.5.6c-10.5 0-19-8.5-19-19s8.5-19 19-19 19 8.5 19 19-8.5 19-19 19zM19.4 74c2.2-1.9 4.1-4.1 5.7-6.6 3.5-5.3 5.4-11.5 5.2-17.9V27c0-4.9.9-8.4 2.7-10.5 1.8-2.1 4.8-3 9.2-3h12.6c1.2 0 2.1-.9 2.2-2.1V2.2C57 1 56 0 54.8 0H41.5c-7.8 0-12.9 2.1-18 7.6s-7.1 12.3-7.1 21.7v14.2c0 2.2-.1 4-.2 5.7v2.2c-.5 3.2-1.8 6.2-3.6 8.9C9.4 64.7 5.1 70.9.9 74l-.3.3-.2.3H.2v.3c-.1.3-.1.7 0 1v.3h.1l.2.3.3.3c4.2 3.1 8.5 9.3 11.3 13.7 1.8 2.7 3.1 5.7 3.6 8.9v2.2c.1 1.6.2 3.5.2 5.7v14.3c0 9.4 2.4 16.7 7.1 21.7s10.2 7.6 18 7.6h13.8c1.2 0 2.2-1 2.2-2.2V140c0-1.2-1-2.2-2.2-2.2H42.2c-4.4 0-7.5-1-9.2-3s-2.7-5.6-2.7-10.5v-22.4c.2-6.4-1.7-12.6-5.2-17.9-1.6-2.5-3.5-4.7-5.7-6.6-.9-.7-1.1-2-.4-2.9.2-.2.3-.3.4-.5zM412.5 74c-2.2-1.9-4.1-4.1-5.7-6.6-3.5-5.3-5.4-11.5-5.2-17.9V27c0-4.9-.9-8.4-2.7-10.5s-4.8-3-9.2-3h-12.6c-1.2 0-2.2-1-2.2-2.2V2.2c0-1.2 1-2.2 2.2-2.2h13.4c7.8 0 12.9 2.1 18 7.6s7.1 12.3 7.1 21.7v14.2c0 2.2.1 4 .2 5.7v2.2c.5 3.2 1.8 6.2 3.6 8.9 2.8 4.5 7.1 10.7 11.3 13.7l.3.3.2.3h.1v.3c.1.3.1.7 0 1v.3h-.1l-.2.3-.3.3c-4.2 3.1-8.5 9.3-11.3 13.7-1.8 2.7-3.1 5.7-3.6 8.9v2.2c-.1 1.6-.2 3.5-.2 5.7v14.3c0 9.4-2.4 16.7-7.1 21.7s-10.2 7.6-18 7.6h-13.4c-1.2 0-2.2-1-2.2-2.2V140c0-1.2 1-2.2 2.2-2.2h12.7c4.4 0 7.5-1 9.2-3s2.7-5.6 2.7-10.5v-22.4c-.2-6.3 1.6-12.6 5.1-17.9 1.6-2.5 3.5-4.7 5.7-6.6.9-.7 1.1-2 .4-2.9-.2-.2-.3-.3-.4-.5z"/>
              </svg>
            </a>
          <nav :class="{'navigation':true, 'expanded': !burgerMenuOpened}">
            <ul class="menu">
              <li v-for="(link, index) in $themeConfig.primary_nav" :key="index" :class="{'hasSubMenu': link.children}">
                <a :href="link.link" :class="{'active': $page.path.includes(link.link)}" >{{link.text}}</a><span v-if="link.children" class="caret">◥◤</span>
                <ul v-if="link.children" class="submenu">
                  <li v-for="(childLink, childIndex) in link.children" :key="childIndex">
                    <a v-if="childLink.link" :href="childLink.link" class="link">{{childLink.text}}</a>
                    <div v-else-if="childLink.text" v-html="childLink.text" class="non-link"></div>
                    <div v-else-if="childLink.type === 'divider'" class="divider"></div>
                  </li>
                </ul>
              </li>
            </ul>
              <div class="buttons-block">
              <a class="buttons-block--button" href="https://login.okta.com/" >Login</a>
              <a class="buttons-block--button red" href="https://developer.okta.com/signup/" >Sign Up</a>
            </div>
          </nav>
          <div class="top-bar-nav--controls">
           <button v-if="burgerMenuOpened" v-on:click="toggleSearch()" :class="{'search-icon': true, 'active': showSearchBar}"></button>
           <div class="top-bar-nav--controls--toggle" @click="burgerMenuOpened = !burgerMenuOpened">
              <svg viewBox="0 0 20 20" class="toggle" v-if="burgerMenuOpened">
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
              </svg>
              <svg viewBox="0 0 352 512" class="toggle-close" v-else>
                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
              </svg>
            </div>
          </div>  
  </nav>
  <div class="searchbar" v-show="showSearchBar && burgerMenuOpened">
              <Search />
            </div>
</div>
</template>

<script>
  export default {
    components: {
      Search: () => import('../components/Search.vue'),
    },
    data() {
      return {
        burgerMenuOpened: true,
        showSearchBar: false
      }
    },
    mounted() {
      window.addEventListener('resize', this.handleResize)
    },
    watch: {
      burgerMenuOpened(){
        if (!this.burgerMenuOpened) {
          document.documentElement.style.overflow = 'hidden'
          return
        }
        document.documentElement.style.overflow = 'auto'
      }
    },
    // define methods under the `methods` object
    methods: {
      // Toggle Search Bar & Icon + Emit event to Search.vue
      toggleSearch: function () {
        this.showSearchBar = !this.showSearchBar
        this.$root.$emit('showSearchBar', this.showSearchBar);
      },
      handleResize: function () {
        if(window.innerWidth >= 768) {
          this.burgerMenuOpened = true;
        }
      }
    }
  }
</script>



