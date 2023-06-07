<template>
    <div id="navigation-component-main">
        <div id="nav-wrapper">
            <a href="#" @click.prevent="logout">
                <img width="48" height="48" src="https://img.icons8.com/sf-regular/48/14a4ad/login-rounded-right.png" alt="login-rounded-right"/>
            </a>
            <div class="nav-section">
                <span>
                    Hi, <span>{{ oUserData.username }}</span>
                </span>
            </div>
            <br>
            <div class="add-task" @click="displayTaskModal">
                <img src="https://img.icons8.com/hatch/30/FFFFFF/add.png" alt="add"/>
                <p>Add New Task</p>
            </div>
            <div class="list" :class="{ selected: sTab === 'dashboard' }" @click="getData('all', 'dashboard')">
                <span>
                    <img src="https://img.icons8.com/sf-regular/30/14a4ad/dashboard.png" alt="dashboard"/>
                </span>
                <p>Dashboard</p>
            </div>
            <div class="nav-section">
                My Projects
            </div>
            <span v-if="aProjects !== undefined">
                <div class="list" v-for="(project, index) in aProjects" :key="index" @click="getData(project.project_id, `proj${project.project_id}`)" :class="{ selected: sTab === `proj${project.project_id}` }">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 64 64"
                            :style="'fill:#' + oColors[project.color]">
                        <path d="M 16 13 C 12.691 13 10 15.691 10 19 L 10 45 C 10 48.309 12.691 51 16 51 L 48 51 C 51.309 51 54 48.309 54 45 L 54 23 C 54 19.691 51.309 17 48 17 L 29.103516 17 C 28.198516 17 27.312422 16.689047 26.607422 16.123047 L 24.894531 14.753906 C 23.481531 13.623906 21.706484 13 19.896484 13 L 16 13 z M 16 17 L 19.896484 17 C 20.801484 17 21.688531 17.310953 22.394531 17.876953 L 24.105469 19.246094 C 25.518469 20.376094 27.293516 21 29.103516 21 L 48 21 C 49.103 21 50 21.897 50 23 L 50 24 L 14 24 L 14 19 C 14 17.897 14.897 17 16 17 z M 14 28 L 50 28 L 50 45 C 50 46.103 49.103 47 48 47 L 16 47 C 14.897 47 14 46.103 14 45 L 14 28 z"></path>
                        </svg>
                    </span>
                    <p>{{ project.project_name }}</p>
                </div>
            </span>
            
        </div>
        <DashboardComponent show_dashboard="yes"></DashboardComponent>
        <TaskFormComponent v-model:form_type="sFormType" v-model:show_task_modal="bShowTaskForm"></TaskFormComponent>
    </div>
</template>

<script>
import DashboardComponent from './List/DashboardComponent.vue';
import TaskFormComponent from './TaskFormComponent.vue';

import { mapActions, mapMutations, mapState } from 'vuex';
import _ from 'lodash';
export default {
    data() {
        return {
            bShowTaskForm: false,
            sFormType: 'add',
            oColors: {
                blue: '22BDDE',
                orange: 'F5A353',
                red: 'E86264',
                green: '38AF91'
            }
        }
    },
    components: {
        DashboardComponent,
        TaskFormComponent
    },
    computed: {
        ...mapState('store', ['oUserData', 'aProjects', 'sTab'])
    },
    methods: {
        ...mapMutations('store', ['toggleLoader', 'setHeader', 'resetDashboard', 'setTab']),
        ...mapActions('store', ['getProjects', 'getWeeklyTasks', 'getProjectTasks']),
        displayTaskModal() {
            this.bShowTaskForm = true;
            this.sFormType = 'add';
        },
        getData(mType, sTab) {
            if(sTab === this.sTab) {
                return false;
            }
            
            this.toggleLoader(true)
            this.setTab(sTab)
            var oHeader = {
                'title': 'Dashboard',
                'src': 'https://img.icons8.com/sf-regular/50/14a4ad/dashboard.png'
            };
            if(mType=== 'all') {
                this.getWeeklyTasks(this.oUserData.member_id)
            } else {
                this.getProjectTasks(mType);
                var oProject = _.find(this.aProjects, {project_id: mType});
                oHeader.title = oProject.project_name;
                oHeader.src = `https://img.icons8.com/sf-regular/50/${this.oColors[oProject.color]}/folder-invoices.png`
                
            }
            this.setHeader(oHeader);
        },
        logout() {
            this.toggleLoader(true);
            this.resetDashboard();
        }
    },
    mounted() {
        this.toggleLoader(true);
        this.getProjects();
    }
}
</script>

<style>
#navigation-component-main {
    width: 100vw;
    height: 100vh;
    background-color: var(--lighter-grey);
    display: flex;
}

#nav-wrapper {
    width: 300px;
    padding: 30px;
}

.nav-section {
    color: var(--gray);
    font-size: 28px;
    margin-top: 30px;
}

.nav-section > span {
    font-weight: 500;
}
</style>