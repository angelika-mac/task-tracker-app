<template>
    <div id="signup-component-main">
        <div id="form-inputs">
            <div class="form-title">
                Get Started
            </div>
            <Transition name="bounce">
                <div id="error-message-wrap" v-if="bHasError">
                    {{ sErrorMessage }}
                </div>
            </Transition>
            <div class="form-inputs">
                <div id="form-row-3" class="form-row">
                    <div class="input-label">First Name</div>
                    <input type="text" id="form-login-fname" class="input-fname" v-model="sFirstName" 
                    ref="firstnameField" @input="bHasError = false">
                </div>
                <div id="form-row-4" class="form-row">
                    <div class="input-label">Last Name</div>
                    <input type="text" id="form-login-lname" class="input-lname" v-model="sLastName" 
                    ref="lastnameField" @input="bHasError = false">
                </div>
            </div>
            <div class="form-inputs">
                <div id="form-row-2" class="form-row">
                    <div class="input-label">Username</div>
                    <input type="text" id="form-login-username" v-model="sUsername" 
                    ref="usernameField" @keyup="chageToLowercase">
                </div>
            </div>
            <div class="form-inputs">
                <div id="form-row-3" class="form-row">
                    <div class="input-label">Password</div>
                    <input type="password" id="form-login-password" class="input-pass" v-model="sPassword" 
                    ref="passwordField" @input="bHasError = false">
                </div>
                <div id="form-row-4" class="form-row">
                    <div class="input-label">Re-enter Password</div>
                    <input type="password" id="form-login-repassword" class="input-repass" v-model="sRePassword" 
                    ref="repasswordField" @input="bHasError = false">
                </div>
            </div>
            <br>
            <div class="form-inputs">
                <button class="primary" @click="signup">Sign Up</button>
            </div>
        </div>
        <div id="form-text">
            <div id="toggle-form-wrapper">
                <div class="section-title">
                    Welcome back!
                </div>
                <div class="section-text">
                    Log in and start tracking your time
                </div>
                <br><br>
                <button class="secondary secondary-outline medium" @click="showSignup">Login</button>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
export default {
    data() {
        return {
            bHasError: false,
            sFirstName: '',
            sLastName: '',
            sUsername: '',
            sPassword: '',
            sRePassword: '',
            sErrorMessage: ''
        }
    },
    methods: {
        ...mapMutations('store', ['setShowSignup', 'setShowLogin', 'setHasUser', 'toggleLoader']),
        ...mapActions('store', ['insertMember', 'checkUsername']),

        showSignup() {
            this.setShowSignup(false);
            this.setShowLogin(true);
        },

        chageToLowercase() {
            let sUsername = this.sUsername;
            this.sUsername = sUsername.toLowerCase();
            this.bHasError = false
            console.log(this.sUsername)
        },

        signup() {
            this.validateForm(oFormInput);

            if(this.bHasError === true) {
                return false;
            }

            var oFormInput = {
                first_name: this.sFirstName,
                last_name: this.sLastName,
                username: this.sUsername,
                password: btoa(this.sPassword),
            }

            this.insertMember(oFormInput).then((response) => {
                console.log(response)
                if(response.data.message !== 'success') {
                    return false;
                }

                localStorage.setItem('time_tracker_user', this.sFirstName);
                this.setHasUser(true);
                this.setShowSignup(false);
                this.setShowLogin(false);
            }).catch((error) => {
                console.log(error)
            }).then(() => {
                this.toggleLoader(false);
            })
        },

        validateForm() {
            if(this.sFirstName === '' || this.sLastName === '') {
                this.bHasError = true;
                this.sErrorMessage = 'Please input your complete name.'
                this.toggleLoader(false);
                return false;
            }

            if(this.sUsername === '' || this.sLastName === '') {
                this.bHasError = true;
                this.sErrorMessage = 'Please input a username.'
                this.toggleLoader(false);
                return false;
            }

            if(this.sPassword === '') {
                this.bHasError = true;
                this.sErrorMessage = 'Please input a password.'
                this.toggleLoader(false);
                return false;
            }

            if(this.sPassword !== this.sRePassword) {
                this.bHasError = true;
                this.sErrorMessage = 'The password did not match.'
                this.toggleLoader(false);
                return false;
            }

            this.toggleLoader(true);
            this.checkUsername({
                username: this.sUsername
            }).then((response) => {
                if(response.data.length <= 0) {
                    return false;
                }

                this.bHasError = true;
                this.sErrorMessage = 'Username already exists. Choose another one.';
            }).catch((error) => {
                console.error(error)
            }).then(() => {
                this.toggleLoader(false);
            })

        }
    }

}
</script>

<style>
#signup-component-main  {
    display: flex;
    justify-content: space-between;
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
    padding: 0 500px;
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

.form-group-name {
    display: flex;
    flex-direction: row;
    gap: 50px;
}

#error-message-wrap {
    background-color: var(--light-red);
    width: 100%;
    height: 50px;
    color: var(--dark-red);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 20px;
}

</style>