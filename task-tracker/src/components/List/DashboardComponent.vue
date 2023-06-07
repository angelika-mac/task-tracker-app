<template>
    <div id="dashboard-component-main">
        <HeaderComponent header_title="Dashboard" header_icon="https://img.icons8.com/sf-regular/50/14a4ad/dashboard.png"></HeaderComponent>
        
        <div class="list-content">
            <div id="weekly-section" class="task-wrapper">
                <span class="list-section-title">
                    <span>
                        This Week
                    </span>
                    <p class="list-section-hours" v-if="aDataSource !== undefined">
                        Total hours worked: <span class="total-today">{{ computeTotalHours(aDataSource) }}h</span>
                    </p>
                </span>
                <div class="list-task" v-if="aDataSource === undefined || aDataSource.length <= 0" :class="{empty: aDataSource === undefined || aDataSource.length <= 0}">
                    <span class="empty-placeholder">No data to show</span>
                </div>
                <span v-if="aDataSource !== undefined && aDataSource.length > 0">
                    <div class="list-task" v-for="task in aDataSource" :key="task.task_id">
                        
                        <div class="task-col">
                            <div class="task-title">
                                {{ task.task_name }}
                            </div>
                            <div class="task-desc">
                                {{ task.task_description === '' ? '+ Add Description' : task.task_description}}
                            </div>
                        </div>
                        <div class="proj-col">
                            <div class="proj" :class="`proj-${task.color}`">{{ task.project_name }}</div>
                        </div>
                        <div class="log-col">
                            <div class="task-log">
                                {{ formatDatetime(task.log_datetime) }}
                            </div>
                        </div>
                        <div class="hours-col">
                            <div class="task-hours">
                                {{ task.hours }}h
                            </div>
                        </div>

                        <div class="edit-col" :class="{disabled: oUserData.member_id !== task.member_id}" @click="editTask(task.task_id, oUserData.member_id === task.member_id)">
                            <img width="25" height="25" :src="`https://img.icons8.com/sf-regular/25/${oUserData.member_id === task.member_id ? '14a4ad' : '848B93'}/create-new.png`" alt="create-new"/>
                        </div>
                        
                        <div class="del-col" :class="{disabled: oUserData.member_id !== task.member_id}" @click="removeTask(task.task_id, oUserData.member_id === task.member_id)" >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 64 64" :style="`fill: #${oUserData.member_id === task.member_id ? 'E94B5E' : '848B93'}`">
                                <path d="M 28 7 C 25.243 7 23 9.243 23 12 L 23 15 L 13 15 C 11.896 15 11 15.896 11 17 C 11 18.104 11.896 19 13 19 L 15.109375 19 L 16.792969 49.332031 C 16.970969 52.510031 19.600203 55 22.783203 55 L 41.216797 55 C 44.398797 55 47.029031 52.510031 47.207031 49.332031 L 48.890625 19 L 51 19 C 52.104 19 53 18.104 53 17 C 53 15.896 52.104 15 51 15 L 41 15 L 41 12 C 41 9.243 38.757 7 36 7 L 28 7 z M 28 11 L 36 11 C 36.552 11 37 11.449 37 12 L 37 15 L 27 15 L 27 12 C 27 11.449 27.448 11 28 11 z M 19.113281 19 L 44.886719 19 L 43.212891 49.109375 C 43.153891 50.169375 42.277797 51 41.216797 51 L 22.783203 51 C 21.723203 51 20.846109 50.170328 20.787109 49.111328 L 19.113281 19 z M 32 23.25 C 31.033 23.25 30.25 24.034 30.25 25 L 30.25 45 C 30.25 45.966 31.033 46.75 32 46.75 C 32.967 46.75 33.75 45.966 33.75 45 L 33.75 25 C 33.75 24.034 32.967 23.25 32 23.25 z M 24.642578 23.251953 C 23.677578 23.285953 22.922078 24.094547 22.955078 25.060547 L 23.652344 45.146484 C 23.685344 46.091484 24.462391 46.835938 25.400391 46.835938 C 25.421391 46.835938 25.441891 46.835938 25.462891 46.835938 C 26.427891 46.801938 27.183391 45.991391 27.150391 45.025391 L 26.453125 24.939453 C 26.419125 23.974453 25.606578 23.228953 24.642578 23.251953 z M 39.355469 23.251953 C 38.388469 23.224953 37.580875 23.974453 37.546875 24.939453 L 36.849609 45.025391 C 36.815609 45.991391 37.571109 46.801938 38.537109 46.835938 C 38.558109 46.836938 38.578609 46.835938 38.599609 46.835938 C 39.537609 46.835938 40.314656 46.091484 40.347656 45.146484 L 41.044922 25.060547 C 41.078922 24.094547 40.321469 23.285953 39.355469 23.251953 z"></path>
                            </svg>
                        </div>
                    </div>
                </span>
            </div>
        </div>
        <TaskFormComponent v-model:form_type="sFormType" v-model:show_task_modal="bShowTaskForm"></TaskFormComponent>
        <ToastComponent v-model:show_toast="bShowToast" v-model:toast_message="sToastText" v-model:toast_type="sToastType"></ToastComponent>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import HeaderComponent from './HeaderComponent.vue';
import TaskFormComponent from '../TaskFormComponent.vue';
import ToastComponent from './../ToastComponent.vue';
import moment from 'moment';
import _ from 'lodash';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            sFormType: 'add',
            bShowTaskForm: '',
            bShowToast: false,
            sToastText: '',
            sToastType: 'success_toast',
            aDisplay: undefined
        }
    },
    props: ['show_dashboard'],
    components: {HeaderComponent, TaskFormComponent, ToastComponent},
    computed: {
        ...mapState('store', ['oUserData', 'aDataSource'])
    },
    methods: {
        ...mapMutations('store', ['toggleLoader', 'setTaskToEdit']),
        ...mapActions('store', ['getWeeklyTasks', 'deleteTask']),
        formatDatetime(sLogDate) {
            return moment(sLogDate).format('YYYY-MM-DD HH:ss')
        },
        computeTotalHours(aData) {
            var iTotalHours = 0;
            aData.forEach(oTask => {
                iTotalHours = parseFloat(oTask.hours) + iTotalHours
            });

            return iTotalHours
        },
        editTask(iTaskId, bValid) {
            if(bValid === false) {
                return false;
            }
            var oTaskInfo = _.find(this.aDataSource, { 'task_id': iTaskId });
            this.setTaskToEdit(oTaskInfo);
            this.bShowTaskForm = true;
            this.sFormType = 'edit';
        },
        removeTask(iTaskId, bValid) {
            if(bValid === false) {
                return false;
            }
            var oThis = this;
            Swal.fire({
                title: 'Are you sure you want to delete this task?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#14A4AD',
                cancelButtonColor: '#E94B5E',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    oThis.toggleLoader(true);
                    oThis.deleteTask(iTaskId).then(() => {
                        oThis.sToastText = 'Task deleted.';
                        oThis.sToastType = 'success_toast';
                        oThis.bShowToast = true;
                        oThis.getWeeklyTasks(oThis.oUserData.member_id).then(()=> {
                            oThis.toggleLoader(false);
                        });
                    })
                }
            })
            
        }
    },
    mounted() {
        this.getWeeklyTasks(this.oUserData.member_id);
    }
}
</script>

<style>
#dashboard-component-main {
    background-color: white;
    width: 100vw;
    height: 100%;
    margin: 50px;
    border-radius: 10px;
}

#del-all {
    display: flex;
    justify-content: flex-end;
    margin-right: 50px;
    margin-top: 20px;
}

.total-today {
    font-weight: 600;
}

#today-section{
    gap: 10px
}

</style>