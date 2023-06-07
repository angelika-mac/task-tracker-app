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
                    <div id="add-row-1">
                        <div id="input-project" class="input-item">
                            <span>Project name</span>
                            <input type="text" id="add-project" class="add-input">
                        </div>
                        
                    </div>
                    <div id="add-row-2">
                        <div id="input-date" class="input-item">
                            <span>Data</span>
                            <VueDatePicker v-model="date"></VueDatePicker>
                        </div>
                        <div id="input-hours" class="input-item">
                            <span>Hours</span>
                            <input type="text" id="input-hours" class="add-input">
                        </div>
                    </div>
                    <div id="add-row-3">
                        <div id="input-task-name" class="input-item">
                            <span>Task title</span>
                            <input type="text" id="add-name" class="add-input">
                        </div>
                        <div id="input-task-desc" class="input-item">
                            <span>Description</span>
                            <textarea id="add-desc" class="add-input"></textarea>
                        </div>
                    </div>
                    <div id="add-row-4">
                        <button class="button primary primary-outline">Reset</button>
                        <button class="button primary">{{ form_text[form_type] }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
export default {
    components: { VueDatePicker },
    emits: ['update:show_task_modal'],
    data() {
        return {
            date: null,
            form_text: {
                add: 'Add new task',
                edit: 'Edit task'
            }
        };
    },
    props: ['form_type', 'show_task_modal'],
    methods: {
        closeModal() {
            this.$emit('update:show_task_modal', false)
        }
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
    height: 500px;
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
    gap: 20px;
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
    width: 350px;
}

#input-hours{
    width: 75px;
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
</style>