<script>
import FormComponent from "./components/FormComponent.vue";
import NavigationComponent from "./components/NavigationComponent.vue";
import LoaderComponent from "./components/LoaderComponent.vue";
import { mapState } from 'vuex';
export default {
    data() {
        return {
            
        }
    },
    computed: {
      ...mapState('store', ['bHasUser']),
      has_user: {
        get() {
          return this.bHasUser;
        }
      }
    },
    components: {
      FormComponent, NavigationComponent, LoaderComponent
    }
}
</script>

<template>
  <LoaderComponent></LoaderComponent>
  <FormComponent v-if="has_user === false"></FormComponent>
  <NavigationComponent v-if="has_user === true"></NavigationComponent>
</template>

<style scoped>
</style>
