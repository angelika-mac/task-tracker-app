<template>
  <div id="toast-component-main">
    <div id="toast-wrapper" :class="toast_type" v-if="show_toast">
        <div id="toast-content">
            <div id="toast-text">
                {{ toast_message }}
            </div>
            <a href="#" @click.prevent="closeToast()">
                <img width="20" height="20" src="https://img.icons8.com/sf-regular/20/14a4ad/multiply.png" alt="multiply"/>
            </a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['show_toast', 'toast_message', 'toast_type'],
    methods: {
        closeToast() {
            this.$emit('update:show_toast', false)
        }
    }
}
</script>

<style>
#toast-wrapper {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    box-shadow: -5px 4px 92px -32px rgba(204,204,204,0.68);
    -webkit-box-shadow: -5px 4px 92px -32px rgba(204,204,204,0.68);
    -moz-box-shadow: -5px 4px 92px -32px rgba(204,204,204,0.68);
}
#toast-content {
    width: 300px;
    height: auto;
    border-radius: 2px;
    padding: 20px;
    display: flex;
    gap: 20px;
    position: relative;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
}

.success_toast {
    background-color: var(--light-green);
    color: var(--dark-green);
}

.error_toast {  
    background-color: var(--light-red);
    color: var(--dark-red);
}
</style>