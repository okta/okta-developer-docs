<template>
  <div class="page-content">
    <section class="copyright">
      <div class="copyright--container">
        <div class="copyright--leader">
          <h1 class="copyright--title">
            {{ $page.frontmatter.title }}
          </h1>
        </div>
      </div>
      <div class="copyright--container">
        <Content class="copyright--text" />
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>
