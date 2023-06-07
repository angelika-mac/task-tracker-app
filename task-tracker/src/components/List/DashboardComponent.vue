<template>
    <div id="dashboard-component-main">
        <HeaderComponent header_title="Dashboard" header_icon="https://img.icons8.com/sf-regular/50/14a4ad/dashboard.png"></HeaderComponent>
        
        <!-- <div id="del-all">
            <div class="delete-task">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 64 64" style="fill:#e86264;">
                    <path d="M 28 7 C 25.243 7 23 9.243 23 12 L 23 15 L 13 15 C 11.896 15 11 15.896 11 17 C 11 18.104 11.896 19 13 19 L 15.109375 19 L 16.792969 49.332031 C 16.970969 52.510031 19.600203 55 22.783203 55 L 41.216797 55 C 44.398797 55 47.029031 52.510031 47.207031 49.332031 L 48.890625 19 L 51 19 C 52.104 19 53 18.104 53 17 C 53 15.896 52.104 15 51 15 L 41 15 L 41 12 C 41 9.243 38.757 7 36 7 L 28 7 z M 28 11 L 36 11 C 36.552 11 37 11.449 37 12 L 37 15 L 27 15 L 27 12 C 27 11.449 27.448 11 28 11 z M 19.113281 19 L 44.886719 19 L 43.212891 49.109375 C 43.153891 50.169375 42.277797 51 41.216797 51 L 22.783203 51 C 21.723203 51 20.846109 50.170328 20.787109 49.111328 L 19.113281 19 z M 32 23.25 C 31.033 23.25 30.25 24.034 30.25 25 L 30.25 45 C 30.25 45.966 31.033 46.75 32 46.75 C 32.967 46.75 33.75 45.966 33.75 45 L 33.75 25 C 33.75 24.034 32.967 23.25 32 23.25 z M 24.642578 23.251953 C 23.677578 23.285953 22.922078 24.094547 22.955078 25.060547 L 23.652344 45.146484 C 23.685344 46.091484 24.462391 46.835938 25.400391 46.835938 C 25.421391 46.835938 25.441891 46.835938 25.462891 46.835938 C 26.427891 46.801938 27.183391 45.991391 27.150391 45.025391 L 26.453125 24.939453 C 26.419125 23.974453 25.606578 23.228953 24.642578 23.251953 z M 39.355469 23.251953 C 38.388469 23.224953 37.580875 23.974453 37.546875 24.939453 L 36.849609 45.025391 C 36.815609 45.991391 37.571109 46.801938 38.537109 46.835938 C 38.558109 46.836938 38.578609 46.835938 38.599609 46.835938 C 39.537609 46.835938 40.314656 46.091484 40.347656 45.146484 L 41.044922 25.060547 C 41.078922 24.094547 40.321469 23.285953 39.355469 23.251953 z"></path>
                </svg>
                <p>Remove all</p>
            </div> 
        </div> -->
        <div class="list-content">
            <div id="today-section" class="task-wrapper">
                <span class="list-section-title">
                    <span>
                        <input type="checkbox" class="check-col">
                        Today
                    </span>
                    <p class="list-section-hours">
                        Total hours worked: <span class="total-today">8h</span>
                    </p>
                </span>
                <div class="list-task" v-for="(task, index) in aTasks" :key="index">
                    <div class="check-col">
                        <input type="checkbox">
                    </div>
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
                    <div class="hours-col">
                        <div class="task-desc">
                            {{ task.hours }}
                        </div>
                    </div>
                    <div class="del-col" :id="`task_${index}`">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 64 64" style="fill:#e94b5e;">
                            <path d="M 28 7 C 25.243 7 23 9.243 23 12 L 23 15 L 13 15 C 11.896 15 11 15.896 11 17 C 11 18.104 11.896 19 13 19 L 15.109375 19 L 16.792969 49.332031 C 16.970969 52.510031 19.600203 55 22.783203 55 L 41.216797 55 C 44.398797 55 47.029031 52.510031 47.207031 49.332031 L 48.890625 19 L 51 19 C 52.104 19 53 18.104 53 17 C 53 15.896 52.104 15 51 15 L 41 15 L 41 12 C 41 9.243 38.757 7 36 7 L 28 7 z M 28 11 L 36 11 C 36.552 11 37 11.449 37 12 L 37 15 L 27 15 L 27 12 C 27 11.449 27.448 11 28 11 z M 19.113281 19 L 44.886719 19 L 43.212891 49.109375 C 43.153891 50.169375 42.277797 51 41.216797 51 L 22.783203 51 C 21.723203 51 20.846109 50.170328 20.787109 49.111328 L 19.113281 19 z M 32 23.25 C 31.033 23.25 30.25 24.034 30.25 25 L 30.25 45 C 30.25 45.966 31.033 46.75 32 46.75 C 32.967 46.75 33.75 45.966 33.75 45 L 33.75 25 C 33.75 24.034 32.967 23.25 32 23.25 z M 24.642578 23.251953 C 23.677578 23.285953 22.922078 24.094547 22.955078 25.060547 L 23.652344 45.146484 C 23.685344 46.091484 24.462391 46.835938 25.400391 46.835938 C 25.421391 46.835938 25.441891 46.835938 25.462891 46.835938 C 26.427891 46.801938 27.183391 45.991391 27.150391 45.025391 L 26.453125 24.939453 C 26.419125 23.974453 25.606578 23.228953 24.642578 23.251953 z M 39.355469 23.251953 C 38.388469 23.224953 37.580875 23.974453 37.546875 24.939453 L 36.849609 45.025391 C 36.815609 45.991391 37.571109 46.801938 38.537109 46.835938 C 38.558109 46.836938 38.578609 46.835938 38.599609 46.835938 C 39.537609 46.835938 40.314656 46.091484 40.347656 45.146484 L 41.044922 25.060547 C 41.078922 24.094547 40.321469 23.285953 39.355469 23.251953 z"></path>
                        </svg>
                    </div>
                </div>

            </div>
            <div id="weekly-section" class="task-wrapper">
                <span class="list-section-title">
                    This Week
                    <p class="list-section-hours">
                        8h
                    </p>
                </span>
                <div class="list-task">
                    <span class="empty-placeholder">No data to show</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from './HeaderComponent.vue';
export default {
    data() {
        return {
            aTasks: [
                {
                    id: 0,
                    task_name: 'Update To-Do Design',
                    task_description: 'Update To-Do Design',
                    project_name: 'Secret Project!!!!!!!!!!!!!!!!!!!1',
                    color: 'blue',
                    hours: '8h',
                },
                {
                    id: 1,
                    task_name: 'Update Designssssssssssssssssd sdf sfsfsdfs fsdd sdf s fds dfs dfs dfs df sdf sd fs fds dfsd sd',
                    task_description: '',
                    project_name: 'Secret Project',
                    color: 'red',
                    hours: '8h',
                }
            ]
        }
    },
    props: ['show_dashboard'],
    components: {HeaderComponent}
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



</style>