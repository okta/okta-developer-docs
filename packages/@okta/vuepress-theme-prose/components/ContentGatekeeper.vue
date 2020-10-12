<template>
  <div class="content--container" v-if="appContext.isMobileViewport && appContext.treeNavOpen">
    <div class="tree-nav">
      <Sidebar :sidebarActive="true" />
    </div>
    <div class="content-area">
      <PageTitle />
      <MobileOnThisPage />
      <Content />
    </div>
  </div>

  <div class="content--container" v-else-if="appContext.isMobileViewport && !appContext.treeNavOpen">
    <div class="content-area">
      <PageTitle />
      <MobileOnThisPage />
      <Content />
    </div>
    <div class="on-this-page"></div>
  </div>

  <div class="content--container" v-else>
    <div class="tree-nav">
      <Sidebar :sidebarActive="false" />
    </div>
    <div class="content-area">
      <PageTitle />
      <MobileOnThisPage />
      <Content />
    </div>
    <div class="on-this-page">
      <OnThisPage />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ContentGatekeeper',
    inject: ['appContext'],
    components: {
      PageTitle: () => import('./PageTitle.vue'),
      MobileOnThisPage: () => import('./MobileOnThisPage'),
      Sidebar: () => import('./Sidebar'),
      OnThisPage: () => import('./OnThisPage')
    }
  }
</script>
