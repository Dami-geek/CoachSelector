<script setup>
import consts from './const.vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import cookies from 'vue-cookies';
import { ref } from 'vue';

const router = useRouter();
const username = ref("");
</script>

<template>
    <div class="manage">
        <div class="nav">
            <div class="nav-left">
                <span class="title">学生选课</span>
            </div>
            <div class="nav-right">
                <span>欢迎，{{ username }}</span>
                <button @click="logout">登出</button>
            </div>
        </div>
        <StudentSelectStage :stages="stages" />
        <div class="grid">
            
        </div>

    </div>
</template>

<style scoped>
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fafafa;
    padding: 10px 20px;
}

.nav-left {
    display: flex;
    align-items: center;
}

.title {
    font-size: 24px;
    font-weight: bold;
}

.nav-right {
    display: flex;
    align-items: center;
}

button {
    margin-left: 20px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.grid {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    gap: 10px;
    margin: 20px;
}

.row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.cell {
    background-color: #f0f0f0;
    padding: 20px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style>