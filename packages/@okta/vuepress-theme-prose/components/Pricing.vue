<template>
  <div class="page-content">
    <section class="pricing">
      <div class="pricing--container">
        <div class="pricing--leader">
          <h1 class="pricing--title">{{$page.frontmatter.sections[0].title}}</h1>
          <p class="pricing--subtitle">{{$page.frontmatter.sections[0].description}}</p>
        </div>
        <br />
        <div class="pricing--background-curve">
          <img src="/img/curve-doubleLeft.png" />
        </div>
        <div class="pricing--content">
        </div>
      </div>
    </section>
  </div>
</template>
