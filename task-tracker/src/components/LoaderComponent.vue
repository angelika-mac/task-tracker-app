<template>
    <div id="loader-component-main" v-if="bShowLoader">
        <div id="loader-wrapper" class="black-overlay">
            <img src="./../assets/loader.svg">
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('store', ['bShowLoader'])
    }
}
</script>

<style>
#loader-wrapper {
    z-index: 99999;
}
</style>