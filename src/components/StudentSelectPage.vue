<template>
    <NavBar :title="'学生用户选择'" />
    <div class="container">
        <div class="stage-list">
            <div v-for="stage in stages" :key="stage" class="stage-display">
                <div class="stage-item">
                    <div class="stage-circle" :class="{ active: stage.id <= currentStage }"></div>
                    <div class="stage-name">{{ stage.name }}</div>
                </div>
                <div class="stage-line" v-if="stage.hasLine" :class="{ active: stage.id + 1 <= currentStage }"></div>
            </div>
        </div>

        <div class="stage-container">
            <Transition name="stage-switch" mode="out-in">
                <StudentSelectStage v-if="currentStage === 1" @submit="handleSubmit" />
                <StudentSubmittedStage v-else-if="currentStage === 2" :coaches="selectedCoaches" />
            </Transition>
        </div>
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    overflow: hidden;
}

.student-select {
    padding: 20px;
}

body {
    background-color: var(--background-color);
}

.stage-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
    position: relative;
    left: 10%;
    width: 80%;
    height: 80px;
    transition: all 0.5s ease;
    transform: translateY(0);
    opacity: 1;
}

.stage-list-enter-from,
.stage-list-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

.stage-list-enter-active,
.stage-list-leave-active {
    transition: all 0.5s ease;
}

.stage-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    left: 0%;
    width: 100%;
}

.stage-line {
    height: 2px;
    width: 600px;
    position: relative;
    overflow: hidden;
    background-color: var(--stage-line-color);
}

.stage-line::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background-color: var(--stage-line-active-color);
    transition: width 0.8s ease;
}

.stage-line.active::before {
    width: 100%;
}

.stage-display {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.stage-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 150px;
    height: 80px;
    background-color: var(--background-color);
    transition: all 0.3s ease;
    transform: scale(1);
}

.stage-item:hover {
    transform: scale(1.05);
}

.stage-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--stage-line-color);
    transition: background-color 0.8s ease;
}

.stage-circle.active {
    background-color: var(--stage-line-active-color);
}

.stage-name {
    margin-top: 10px;
    font-size: 16px;
    color: var(--text-color);
}

.stage-switch-enter-active,
.stage-switch-leave-active {
    transition: all 0.5s ease;
}

.stage-switch-enter-from {
    opacity: 0;
    transform: translateX(50px);
}

.stage-switch-leave-to {
    opacity: 0;
    transform: translateX(-50px);
}

/* body {
    font-family: 'Helvetica Neue', sans-serif;
    background: #f1f1f1;
    color: #333;
    padding: 1rem;
  } */
</style>

<script setup>
import consts from './const.vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import cookies from 'vue-cookies';
import { ref } from 'vue';
import axios from 'axios';
import StudentSelectStage from './StudentSelectStage.vue';
import StudentSubmittedStage from './StudentSubmittedStage.vue';
import NavBar from './NavBar.vue';

const stages = [
    { name: "教练选择", id: 1, hasLine: true },
    { name: "确认提交", id: 2, hasLine: true },
    { name: "查看结果", id: 3, hasLine: false }
]

const currentStage = ref(1);
const router = useRouter();
const selectedCoaches = ref([]);

const handleSubmit = (coaches) => {
    if (coaches.length !== 3) {
        alert('请选择3位教练');
        return;
    }
    
    selectedCoaches.value = coaches;
    axios.post(`${consts.backendurl}/select`, { 
        coaches: coaches,
        token: cookies.get('cs-ssid')
    })
    .then(res => {
        if(res.data.status !== 'success') {
            alert('提交失败，请重试!');
            return;
        }
        currentStage.value = 2;
    })
    .catch(error => {
        console.error('提交失败:', error);
        alert('后台错误，请稍后再试!');
    });
};
</script>
