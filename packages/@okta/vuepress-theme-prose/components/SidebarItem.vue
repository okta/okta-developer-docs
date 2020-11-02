<template>
    <li :class="{'subnav': link.subLinks}">
        <div class="link-wrap">
            <div v-if="link.path">
                <!-- <router-link :to="link.path" @click="setData" class="tree-nav-link">{{link.title}}</router-link> -->
                <router-link :to="link.path" class="tree-nav-link">{{link.title}}</router-link>
            </div>

            <div v-else>
                <div :class="{'is-link':true, 'item-collapsable': true, 'children-active': iHaveChildrenActive}" @click="toggleExpanded">
                    <svg viewBox="0 0 320 512" v-if="link.subLinks && !sublinksExpanded">
                        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"/>
                    </svg>

                    <svg viewBox="0 0 320 512" v-if="link.subLinks && sublinksExpanded">
                        <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"/>
                    </svg>
                    {{link.title}}
                </div>
            </div>
        </div>

        <ul v-if="link.subLinks" class="sections" v-show="iHaveChildrenActive || sublinksExpanded">
            <SidebarItem v-for="sublink in link.subLinks" :key="sublink.title" :link="sublink" />
        </ul>
      </li>
</template>

<script>
export default {
    name: 'SidebarItem',
    props: ['link'],
    components: {
      SidebarItem: () => import('../components/SidebarItem.vue'),
    },
    data() {
        return {
           iHaveChildrenActive: this.checkActiveChildren(this.link),
           sublinksExpanded: this.checkActiveChildren(this.link) || false,
        }
    },
    // mounted() {
    //     this.iHaveChildrenActive = this.checkActiveChildren(this.link);
    // },
    watch: {
        // 'link'() {
        //     this.setData();
        // },
        'iHaveChildrenActive' (isActivated, _) {
            if (isActivated) {
                this.$el.scrollIntoViewIfNeeded();
            }
        },
        '$route' (to, from) {
          this.iHaveChildrenActive = this.checkActiveChildren(this.link, to.path)
        }
    },
    methods: {
        toggleExpanded() {
            this.sublinksExpanded = !this.sublinksExpanded
        },
        checkActiveChildren(link, routeToCheck = this.$router.currentRoute.path) {
          let isActiveChild = false
          if (link.path) {
            isActiveChild = link.path === routeToCheck
          }
          if (link.subLinks){
            for (const subLink of link.subLinks){
                this.checkActiveChildren(subLink)
            } 
          }
          console.log('IS ACTIVE CHILD', isActiveChild)
          return isActiveChild
        }
        // setData: function() {
        //     this.iHaveChildrenActive = Boolean(this.link.imActive);
        // }
    },
}
</script>