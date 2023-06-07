<template>
    <div id="header-component-main">
        <div class="list-header">
            <div class="list-title">
                <span>
                    <img width="50" height="50" :src=oHeader.src />            
                </span>
                <p>{{ oHeader.title }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState('store', ['oHeader'])
    }
}
</script>

<style>

</style>