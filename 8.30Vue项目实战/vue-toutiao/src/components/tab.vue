<template>
    <div>
        <Head 
            v-bind:tabs="tabs"
            v-on:more="bubbleMoreEvent"
            v-on:select="bubbleSelectEvent"
        >
        <!-- v-on:select="$emit('update:curTab', $event)" -->
        </Head>
        <div class="tab-list">
            <template v-for="(tab, name) in tabs">
                <transition name="fade" :key="name">
                    <div v-show="name === curTab">
                        <slot name="content" v-bind:list="tab.list"></slot>
                    </div>
                </transition>
            </template>
        </div>
    </div>
</template>

<script>
import Head from './head.vue';

export default {
    
    components: {
        Head
    },

    props: ['tabs', 'curTab'],

    methods: {
        bubbleMoreEvent(event) {
            this.$emit('more', event)
        },
        bubbleSelectEvent(event) {
            this.$emit('update:curTab', event)
        }
    }
}
</script>

<style scoped>
nav {
    white-space: nowrap;
    width: 100%;
    overflow-x: scroll;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>