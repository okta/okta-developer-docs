<template>
  <aside class="redesign-navigation">
    <ul class="menu">
      <li v-for="link in navigation" :key="link.name">
        <router-link :to='link.link'>
          <i class="fa fa-chevron-right"></i> 
          <span>{{link.name}}</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    name: 'RedesignedSidebar',
    data() {
      return {
        navigation: [
        {
          name: 'Home',
          link: '/'
        },
        {
          name: 'Guides',
          link: '/docs/guides/'
        },
        {
          name: 'Concepts',
          link: '/docs/concepts/'
        },
        {
          name: 'Reference',
          link: '/docs/reference/',
        },
        {
          name: 'Languages & SDKs',
          link: '/code/',
        },
        ]
      }
    }
  }
</script>
