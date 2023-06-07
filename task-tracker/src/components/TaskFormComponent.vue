<template>
    <div id="task-component-id">
        <div id="task-wrapper" class="black-overlay" v-if="show_task_modal">
            <div id="task-container">
                <div id="add-wrapper">
                    <div id="add-title">
                        <span>{{ form_text[form_type] }}</span>
                        <a href="#" @click.prevent="closeModal()">
                            <img width="35" height="35" src="https://img.icons8.com/sf-regular/35/14a4ad/multiply.png" alt="multiply"/>
                        </a>
                    </div>
                    <Transition name="bounce">
                        <div class="error-message-wrap" v-if="bHasError">
                            {{ sErrorMessage }}
                        </div>
                    </Transition>
                    <div id="add-row-1">
                        <div id="input-project" class="input-item">
                            <span>Project name <p class="required">*</p></span>
                            <select id="add-project" class="add-input" v-model="iProjectId" @change="bHasError = false">
                                <option value="">Select a project</option>
                                <option v-for="(project, index) in aProjects" :key="index" :value="project.project_id">
                                    {{ project.project_name }}
                                </option>
                            </select>
                        </div>
                        
                    </div>
                    <div id="add-row-2">
                        <div id="input-date" class="input-item">
                            <span>Data <p class="required">*</p></span>
                            <VueDatePicker v-model="sDate"></VueDatePicker>
                        </div>
                        <div id="input-hours" class="input-item">
                            <span>Hours <p class="required">*</p></span>
                            <input type="text" id="input-hours" class="add-input" v-model="sHours" 
                            @input="restrictInput" max="255">
                        </div>
                    </div>
                    <div id="add-row-3">
                        <div id="input-task-name" class="input-item">
                            <span>Task title <p class="required">*</p></span>
                            <input type="text" id="add-name" class="add-input" v-model="sTaskName" 
                            @input="bHasError = false" max="255">
                        </div>
                        <div id="input-task-desc" class="input-item">
                            <span>Description</span>
                            <textarea id="add-desc" class="add-input" v-model="sTaskDescription" 
                            @input="bHasError = false" max="500"></textarea>
                        </div>
                    </div>
                    <div id="add-row-4">
                        <button class="button primary primary-outline" @click="resetForm">Reset</button>
                        <button class="button primary" @click="submitForm">{{ form_text[form_type] }}</button>
                    </div>
                </div>
            </div>
        </div>

        <ToastComponent v-model:show_toast="bShowToast" v-model:toast_message="sToastText" v-model:toast_type="sToastType"></ToastComponent>
    </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { mapActions, mapMutations, mapState } from 'vuex';
import ToastComponent from './ToastComponent.vue';
import moment from 'moment';
export default {
    components: { VueDatePicker, ToastComponent },
    emits: ['update:show_task_modal'],
    data() {
        return {
            form_text: {
                add: 'Add new task',
                edit: 'Edit task'
            },
            bHasError: false,
            sErrorMessage: '',
            iProjectId: '',
            sDate: new Date(),
            sHours: '',
            sTaskName: '',
            sTaskDescription: '',
            bShowToast: false,
            sToastText: '',
            sErrorToast: '',
            sToastType: 'success_toast',
            sFormType: 'add'
        };
    },
    props: ['form_type', 'show_task_modal'],
    computed: {
        ...mapState('store', ['aProjects', 'oUserData', 'oTaskToEdit', 'sTab'])
    },
    methods: {
        ...mapMutations('store', ['toggleLoader', 'setTaskToEdit']),
        ...mapActions('store', ['addTask', 'editTask', 'getWeeklyTasks', 'getProjectTasks']),
        closeModal() {
            this.$emit('update:show_task_modal', false);
            this.setTaskToEdit(undefined);
            this.resetForm();
        },

        resetForm() {
            this.sErrorMessage = '',
            this.bHasError = false;
            this.iProjectId = '';
            this.sDate = new Date(),
            this.sHours = '';
            this.sTaskName = '';
            this.sTaskDescription = '';
        },

        restrictInput(event) {
            this.bHasError = false;
            const input = event.target;
            const value = input.value;
            const regex = /^[0-9.]*$/;
            
            if (!regex.test(value)) {
                this.sHours = value.replace(/[^0-9.]/g, '');
            }
        },

        submitForm() {
            this.validateInput();
            if(this.bHasError === true) {
                return false;
            }

            this.toggleLoader(true);
            var oFormData = {
                member_id: this.oUserData.member_id,
                project_id: this.iProjectId,
                log_datetime: moment(this.sDate).format('YYYY-MM-DD HH:ss'),
                hours: this.sHours,
                task_name: this.sTaskName,
                task_description: this.sTaskDescription
            }
            this.form_type === 'add' ? this.insertTask(oFormData) : this.updateTask(oFormData);
        },

        insertTask(oFormData) {
            this.addTask(oFormData).then((response) => {
                if(response.data.message !== 'success') {
                    return false;
                }
                
                this.bShowToast = true;
                this.sToastText = 'New task added!'
                this.sToastType = 'success_toast';
                this.closeModal();
            }).catch((error) => {
                this.errorCallback();
            }).then(() => {
                this.upsertCallback();
            })
        },

        updateTask(oFormData) {
            oFormData.task_id = this.oTaskToEdit.task_id;
            this.editTask(oFormData).then((response) => {
                if(response.data.message !== 'success') {
                    return false;
                }

                this.toggleLoader(false);
                this.bShowToast = true;
                this.sToastText = 'Task updated!'
                this.sToastType = 'success_toast';
                this.closeModal();
            }).catch((error) => {
                this.errorCallback();
            }).then(() => {
                this.upsertCallback();
            })
        },

        errorCallback() {
            this.bShowToast = true;
            this.sToastText = 'Something went wrong';
            this.sToastType = 'error_toast'
            this.toggleLoader(false);
        },

        upsertCallback() {
            this.toggleLoader(true);
            if(this.sTab === 'dashboard' || this.form_type === 'add') {
                this.getWeeklyTasks(this.oUserData.member_id);
            } else {
                this.getProjectTasks(this.sTab.replace('proj', ''));
            }
        },

        validateInput() {
            if(this.iProjectId === '') {
                this.bHasError = true;
                this.sErrorMessage = 'Please select a project.'
                return false;
            }

            if(this.sDate === null) {
                this.bHasError = true;
                this.sErrorMessage = 'Please select a date and time.'
                return false;
            }

            if(this.sHours === '') {
                this.bHasError = true;
                this.sErrorMessage = 'Please input hours spent.'
                return false;
            }

            if(this.sTaskName === '') {
                this.bHasError = true;
                this.sErrorMessage = 'Please input a task name.'
                return false;
            }
        }

    },

    watch: {
        oTaskToEdit(newval) {
            if(newval === undefined) {
                return false;
            }

            var oTaskInfo = this.oTaskToEdit;
            this.iProjectId = oTaskInfo.project_id;
            this.sDate = new Date(oTaskInfo.log_datetime);
            this.sHours = oTaskInfo.hours;
            this.sTaskName = oTaskInfo.task_name;
            this.sTaskDescription = oTaskInfo.task_description;
            this.sFormType = 'edit';
        }
    },
    mounted() {
        this.toggleLoader();
    }
}
</script>

<style>
#task-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 550px;
    background-color: var(--light-grey);
    z-index: 9999;
    color: var(--gray);
    text-align: center;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px 50px;
}

#add-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    width: 100%;
    height: 100%;
}

#add-row-1, #add-row-2{
    display: flex;
    align-items: center;
    gap: 30px;
}

#add-row-3 {
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: flex-start;
}

#add-row-4 {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.input-item {
    display: flex;
    align-items: center !important;
    justify-content: flex-start;
    gap: 20px;
    color: var(--dark-gray);
}

#add-project {
    width: 340px;
}

#input-hours{
    width: 55px;
    text-align: center
}

#add-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--dark-gray);
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
}

#add-title > img {
    cursor: pointer;
}

#add-name, #add-desc {
    width: 480px;
}
#input-task-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
}
#input-task-name >span {
    width: 20%;
}

#add-row-3 {
    display: flex;
    justify-content: flex-end;
}

#input-task-desc {
    display: flex;
    flex-direction: column;
    align-items: flex-start !important;
}

.input-item > span {
    display: flex;
    align-items: center;
}

.required {
    color: var(--red);
    font-weight: 500;
}
</style>