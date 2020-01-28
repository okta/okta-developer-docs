<template>
  <div class="reference--container">
    <h1>{{ $page.title }}</h1>
    <ul class="reference--list">
      <li v-for="link in $page.frontmatter.top_links" :key="link.path">
        <router-link :to="link.path">
          <img :src="'/img/'+link.icon">
          <span>{{link.name}}</span>
        </router-link>
      </li>
    </ul>

    <div class="reference--sections">
      <Content slot-key="left"></Content>
      <Content slot-key="right"></Content>
    </div>
  </div>
</template>