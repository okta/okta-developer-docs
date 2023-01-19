<template>
  <div class="homepage content">
    <div class="content--container">
      <Sidebar />
      <div class="width-adjuster">
        <section class="hero">
          <h1 class="hero__title">
            Okta developer
          </h1>
          <p class="hero__paragraph">
            Our developer portal enables you to deploy auth that protects your users, apps, APIs, and infrastructure.
          </p>
        </section>
        <GetSupport />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    Sidebar: () => import("../components/Sidebar"),
    GetSupport: () => import("../components/GetSupport"),
  },

  data() {
    return {
      pseudoAuthorizedCodeBlock: false
    };
  },
};
</script>
