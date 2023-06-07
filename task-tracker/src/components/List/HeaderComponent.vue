<template>
    <div id="header-component-main">
        <div class="list-header">
            <div class="list-title">
                <span>
                    <img width="50" height="50" :src=header_icon />            
                </span>
                <p>{{ header_title }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['header_title', 'header_icon']
}
</script>

<style>

</style>