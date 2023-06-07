<template>
    <div id="login-component-main">
        <div id="form-text">
            <div id="toggle-form-wrapper">
                <div class="section-title">
                    New Here?
                </div>
                <div class="section-text">
                    Sign up and track your time in a cool way!
                </div>
                <br><br>
                <button class="secondary secondary-outline medium" @click="showSignup">SIGN UP</button>
            </div>
        </div>
        <div id="form-input-wrapper">
            <div id="form-inputs">
                <div class="form-title">
                    Great to see you again!
                </div>
                <br><br>
                <Transition name="bounce">
                    <div id="error-message-wrap" v-if="bHasError">
                        {{ sErrorMessage }}
                    </div>
                </Transition>
                <div class="form-inputs">
                    <div id="form-row-1" class="form-row">
                        <div class="input-label">Username</div>
                        <input type="text" id="form-login-username" v-model="sUsername" @input="bHasError = false">
                    </div>
                </div>
                <div class="form-inputs">
                    <div id="form-row-2" class="form-row">
                        <div class="input-label">Password</div>
                        <input type="password" id="form-login-password" class="input-pass" v-model="sPassword" 
                        @input="bHasError = false" @keyup.enter="login">
                    </div>
                </div>
                <div class="form-inputs">
                    <button class="primary" @click="login">Log In</button>
                </div>
            </div>
        </div>
    <ToastComponent v-model:show_toast="bShowToast" v-model:toast_message="sToastMessage" v-model:toast_type="sToastType"></ToastComponent>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import ToastComponent from './../ToastComponent.vue'
export default {
    data() {
        return {
            sErrorMessage: '',
            bHasError: false,
            sUsername: '',
            sPassword: '',
            bShowToast: false,
            sToastMessage: '',
            sToastType: 'success_toast'
        }
    },

    components: {
        ToastComponent
    },
    methods: {
        ...mapMutations('store', ['setShowSignup', 'setShowLogin', 'setHasUser', 'toggleLoader', 'setUserData']),
        ...mapActions('store', ['getMember']),

        showSignup() {
            this.setShowSignup(true);
            this.setShowLogin(false);
        },

        login() {
            if(this.sUsername === '' || this.sPassword === '') {
                this.bHasError = true;
                this.sErrorMessage = 'Please enter your correct username or password.';
                return false;
            }

            this.toggleLoader(true);

            var oFormData = {
                username: this.sUsername,
                password: btoa(this.sPassword)
            }

            this.getMember(oFormData).then((response) => {
                this.toggleLoader(false);
                if(response.data.message !== 'success' || response.data.data.length <= 0){
                    this.bHasError = true;
                    this.sErrorMessage = 'Username and password did not match.'
                    return false;
                }
                
                localStorage.setItem('time_tracker_user', this.sUsername);
                this.sToastMessage = 'Login successful!';
                this.bShowToast = true;
                this.sToastType = 'success_toast'

                var oUserData = response.data.data[0];
                delete oUserData['password'];
                this.setUserData(oUserData);
                var oThis = this;

                setTimeout(function() {
                    oThis.setHasUser(true);
                    oThis.setShowSignup(false);
                    oThis.setShowLogin(false);
                }, 1500)
            })
        },
    }
}
</script>

<style>
#login-component-main  {
    display: flex;
}
#form-text {
    background-color: var(--teal);
    height: 100vh;
    width: 500px;
}

#toggle-form-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 50px;
    height: 100%;
}

#form-inputs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
    padding: 0 50px;
    gap: 20px;
}

.form-inputs{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
}

.form-label {
    width: 100px;
}
.form-row {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
}

#form-input-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
}

</style>