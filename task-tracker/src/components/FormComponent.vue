<template>
    <div id="form-component-main">
        <Transition name="slide-fade">
            <LoginComponent v-if="show_login"></LoginComponent>
        </Transition>

        <Transition name="slide-fade">
            <SignupComponent v-if="show_signup"></SignupComponent>
        </Transition>
    </div>
</template>

<script>
import axios from 'axios';
import LoginComponent from './Form/LoginComponent.vue';
import SignupComponent from './Form/SignupComponent.vue';
import { mapState } from 'vuex';

const api = axios.create({
  baseURL: 'http://localhost:5173',
});
export default {
    components: {
        LoginComponent, SignupComponent
    },
    computed: {
        ...mapState('store', ['bShowLogin', 'bShowSignup']),
        show_login: {
            get() {
                return this.bShowLogin;
            }
        },
        show_signup: {
            get() {
                return this.bShowSignup;
            }
        }
    },
    methods: {
        addJohn() {
            api.post('/api/insert', {
                name: 'John Doe',
                age: '25',
                email: 'johndoe@example.com',
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
        },

        updateJohn() {
            api.put('/api/update', {
                user_id: 2,
                name: 'Bree Van De Kamp',
                age: '25',
                email: 'johndoe@example.com',
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
        },

        deleteJohn() {
            api.delete('/api/delete/5,6')
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
        },

        getAll() {
            api.get('/api/all')
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        }

        
    },
    mounted() {
    }
}
</script>

<style>
#form-component-main {
    width: 100vw;
}
</style>