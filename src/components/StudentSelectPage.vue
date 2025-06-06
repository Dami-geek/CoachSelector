<template>
    <NavBar :username="username" :title="'学生用户选择'" />
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
            <StudentSelectStage />
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
    background-color: #f5f5f5;
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
    background-color: #ddd;
}

.stage-line.active {
    background-color: #888;
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
    background-color: #f5f5f5;
}

.stage-circle:not(.active) {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ddd;
}

.stage-circle.active {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #888;
}

.stage-name {
    margin-top: 10px;
    font-size: 16px;
    color: #444;
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
import StudentSelectStage from './StudentSelectStage.vue';
import NavBar from './NavBar.vue';

const stages = [
    { name: "教练选择", id: 1, hasLine: true },
    { name: "确认提交", id: 2, hasLine: true },
    { name: "查看结果", id: 3, hasLine: false }
]

</script>