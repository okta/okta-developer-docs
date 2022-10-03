<template>
    <SmartLink :item="{ link: href }" classes="card is-card-action is-card-clickable">
        <header class="card--header">
            <figure class="card--header-icon" v-if="headerIcon">
                <i class="icon-75" :class="headerIcon"></i>
            </figure>
            <figure class="card--header-icon" v-else-if="headerImage">
                <div>
                    <img class="card--header-img" :src="headerImage" />
                </div>
            </figure>
            <section class="card--header-main-own">
                <h2 class="card--title" v-if="cardTitle">
                    {{ cardTitle }}
                </h2>
                <section class="card--meta" v-if="cardMeta">
                    {{ cardMeta }}
                </section>
            </section>
        </header>
        <section class="card--main">
            <p>
                <slot
                    >Commodo deserunt nulla Lorem veniam do minim consectetur ea
                    in.</slot
                >
            </p>
        </section>
        <footer class="card--footer" v-if="showFooter">
            <section class="card--actions">
                <span class="card--link">{{ cardLinkText }}</span>
            </section>
        </footer>
    </SmartLink>
</template>

<script>
export default {
    components: {
        SmartLink: () => import("../components/SmartLink.vue")
    },
    props: {
        href: {
            default: "#",
            type: String,
        },
        headerIcon: {
            default: null,
            type: String,
        },
        headerImage: {
            default: null,
            type: String,
        },
        cardTitle: {
            default: "",
            type: String,
        },
        cardMeta: {
            default: "",
            type: String,
        },
        cardLinkText: {
            default: "Read More",
            type: String,
        },
        showFooter: {
            default: false,
            type: Boolean,
        },
    },
};
</script>

<style scoped></style>
