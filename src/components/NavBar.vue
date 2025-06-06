<template>
    <div class="nav">
        <div class="nav-center">
            <span class="title">{{ title }}</span>
        </div>
        <div class="nav-right">
            <span>{{ username }}</span>
            <div><button @onclick="cookies.remove('cs-ssid');router.push('/login')">登出</button></div>
        </div>
    </div>
</template>

<script>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import consts from './const.vue';

const router = useRouter();
const username = ref("");
const currentStage = ref(1);

export default {
    name: 'NavBar',
    props: {
        title: {
            type: String,
            default: 'Title'
        }
    },
    mounted() {
        consts.checkCookie().then(userData => {
            username.value = userData.username;
        }).catch(error => {
            // router.push('/');
        });
    },
    methods: {
        logout() {
            this.$cookies.remove('cs-ssid');
            this.$router.push('/login');
        },
        getUsername() {
            return username.value;
        }
    }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
}

body {
    background-color: #f5f5f5;
}

.nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fafafa;
    height: 80px;
}
.nav div {
    font-size: 20px;
    padding: 7px;
    justify-content: space-between;
    align-items: center;
}
.title{
    font-size: 32px;
}
.nav-right {
    display: flex;
    position: absolute;
    right: 10px;
}
</style>