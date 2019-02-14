<template>

  <header
    :class="{
        'Header': true,
        'is-fixed': true,
        'search-active' : search_active,
        'is-active' : nav_expanded
      }">

    <div class="Wrap">

      <a
        class="Logo" :href="home_url"
        v-html="logo_svg">
      </a>

      <nav class="Header-nav PrimaryNav" :class="{'is-active' : nav_expanded}">
        <ul
          :class=""
          class="menu"
          v-if="menu_items && menu_items.length">

          <MenuItem
            v-for="(item, index) in menu_items"
            :key="index"
            :item="item"
            :index="index"
            :last="menu_items.length"></MenuItem>

        </ul>

        <a class="PrimaryNav-toggle" href="#">
          <svg @click="nav_expanded = !nav_expanded" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g class="MenuIcon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
              <path d="M1,16 L19,16" class="MenuIcon-line1" stroke="#FFFFFF" stroke-width="2"></path>
              <path d="M1,4 L19,4" class="MenuIcon-line2" stroke="#FFFFFF" stroke-width="2"></path>
              <path d="M1,10 L19,10" class="MenuIcon-line3" stroke="#FFFFFF" stroke-width="2"></path>
              <path d="M1,10 L19,10" class="MenuIcon-line4" stroke="#FFFFFF" stroke-width="2"></path>
            </g>
          </svg>
          <svg  @click="nav_expanded = !nav_expanded" class="CloseIcon" width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="ALl-Boards" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Desktop" transform="translate(-915.000000, -235.000000)" fill="#FFFFFF">
                <g id="Search-bar-Active" transform="translate(30.000000, 26.000000)">
                  <polygon id="Icon/Cross" points="901 210.6 899.4 209 893 215.4 886.6 209 885 210.6 891.4 217 885 223.4 886.6 225 893 218.6 899.4 225 901 223.4 894.6 217"></polygon>
                </g>
              </g>
            </g>
          </svg>
        </a>

        <div class="PrimaryNav-cta">
          <a target="_blank" rel="noopener noreferrer" href="https://login.okta.com/" class="Button--redOutline">Login</a>
          <a :href="(home_url + '/signup/')" class="Button--red">Sign up</a>
        </div>

        <a
          class="SearchIcon"
          @click="search_active = !search_active"></a>

        <form
          id="form_search"
          class="SearchBar Formisimo_clocked_69929"
          method="get"
          :action="search_url"
          name="form_search"
          @submit="handleSearchSubmit">

          <input type="text" name="stq" autocomplete="off" id="st-search-input-auto" class="st-search-input" placeholder="Search">
          <input type="submit" name="submit" id="st-search-submit-go" value="GO">

        </form>

      </nav>

    </div>

  </header>

</template>

<style lang="scss">

</style>

<script>
export default {
  components: {
    MenuItem: () => import('./MenuItem.vue')
  },

  data() {
    return {
      search_active: false,
      nav_expanded: false,
      logo_svg: '',
      home_url: '',
      search_url: '',
      menu_items: null,
    }
  },

  methods: {
    handleSearchSubmit(event) {

      event.preventDefault()
      event.stopPropagation()

      let search_phrase = document.getElementById('st-search-input-auto').value

      if (search_phrase.length > 3) {
        window.location.href = this.search_url + '#stq=' + search_phrase
      }

    }
  },

  created() {
    if(this.$themeConfig.home_url) {
      this.home_url = this.$themeConfig.home_url
    }

    if(this.$themeConfig.logo_svg) {
      this.logo_svg = this.$themeConfig.logo_svg
    }

    if(this.$themeConfig.primary_nav) {
      this.menu_items = this.$themeConfig.primary_nav
    }

    if(this.$themeConfig.search_url) {
      this.search_url = this.$themeConfig.search_url
    }
  }
}
</script>

