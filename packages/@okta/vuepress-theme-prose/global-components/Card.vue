<template>
    <router-link :to="href" class="card is-card-action is-card-clickable">
        <header class="card--header">
            <figure class="card--header-icon" v-if="showHeaderIcon">
                <svg v-if="headerIcon == ''" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labeledby="svg-title">
                    <title id="svg-title">The Okta logo</title>
                    <path d="M37.5 25c0 6.904-5.596 12.5-12.5 12.5S12.5 31.904 12.5 25 18.096 12.5 25 12.5 37.5 18.096 37.5 25zM0 25c0 13.807 11.193 25 25 25s25-11.193 25-25S38.807 0 25 0 0 11.193 0 25z" fill="#05F"/>
                </svg>
                <i class="icon-75" :class=headerIcon v-else></i>
            </figure>
            <section class="card--header-main-own">
                <h2 class="card--title" v-if="cardTitle">
                    {{cardTitle}}
                </h2>
                <section class="card--meta" v-if="cardMeta">
                    {{cardMeta}}
                </section>
            </section>
        </header>
        <section class="card--main">
            <p>
            <slot>Commodo deserunt nulla Lorem veniam do minim consectetur ea in.</slot>
            </p>
        </section>
        <footer class="card--footer" v-if="showFooter">
            <section class="card--actions">
            <span class="card--link">{{cardLinkText}}</span>
            </section>
        </footer>
    </router-link>
</template>

<script>
export default {
    props: {
        href: {
            default: "#",
            type: String
        },
        showHeaderIcon: {
            default: false,
            type: Boolean
        },
        headerIcon: {
            default: "",
            type: String
        },
        cardTitle: {
            default: "",
            type: String
        },
        cardMeta: {
            default: "",
            type: String
        },
        cardLinkText: {
            default: "Read More",
            type: String
        },
        showFooter: {
            default: true,
            type: Boolean
        }
    }
}
</script>

<style scoped>

</style>