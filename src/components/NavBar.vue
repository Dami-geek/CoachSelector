<template>
    <div class="nav">
        <div class="nav-center">
            <span class="title">{{ title }}</span>
        </div>
        <div class="nav-right">
            <span>{{ username }}</span>
            <div><button class="logout-button" @click="logout">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" stroke="var(--icon-color)" stroke-width="0.00024000000000000003">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC"
                            stroke-width="0.9600000000000002"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.25 5.25L9 4.5H18L18.75 5.25V18.75L18 19.5H9L8.25 18.75V16.5H9.75V18H17.25V6H9.75V7.5H8.25V5.25Z"
                                fill="var(--icon-color)"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.06068 12.7499L14.25 12.7499L14.25 11.2499L7.06068 11.2499L8.78035 9.53027L7.71969 8.46961L4.18936 11.9999L7.71969 15.5303L8.78035 14.4696L7.06068 12.7499Z"
                                fill="var(--icon-color)"></path>
                        </g>
                    </svg>
                    登出
                </button></div>
        </div>
    </div>
</template>

<script>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import consts from './const.vue';
import cookies from 'vue-cookies'

const username = ref("");
const currentStage = ref(1);

export default {
    name: 'NavBar',
    props: {
        title: {
            type: String,
            default: 'Title'
        },
        requireRole: {
            type: String,
            default: 'any'
        }
    },
    mounted() {
        consts.checkCookie(this.requireRole).then(userData => {
            username.value = userData.username;
        }).catch(error => {
            // router.push('/');
            alert("Error on checking cookie: "+error.message);
        });
        return { username };
    },
    data() {
        return {
            username: username,
            currentStage: currentStage,
            router: useRouter()
        };
    },
    methods: {
        logout() {
            console.log("Logging out...");
            cookies.remove('cs-ssid');
            this.router.push('/login');
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
    background-color: var(--navbar-color);
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
.logout-button {
    background-color: var(--danger-color);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease-in-out;
}
.logout-button:hover {
    background-color: var(--danger-hover-color);
}
</style>
