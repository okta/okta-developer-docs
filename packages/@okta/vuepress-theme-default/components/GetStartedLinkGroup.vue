<template>
    <div>
        <h2>{{section.title}}</h2>
        <div class="Row">
            <div class="Column--4 Column--small-12" v-for="(link, i) in section.links" :key="i">
                <a :href="link.link">
                    <h3 class="h4">{{link.title}}</h3>
                </a>
                <p>{{link.description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'GetStartedLinkGroup',
      props: ['section']
    }
</script>
