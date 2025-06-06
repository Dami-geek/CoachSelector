<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import cookies from 'vue-cookies'
import consts from './const.vue'

const router = useRouter()

onMounted(() => {
    if(!cookies.isKey('cs-ssid')){
        router.push('/login');
        return;
    }
    axios.get(consts.backendurl+'/verify/'+cookies.get('cs-ssid'))
        .then(res => {
            if(res.data.status == 'success'){
                if(res.data.role == 'student')
                    router.push('/student/dashboard');
                else if(res.data.role == 'coach')
                    router.push('/coach/dashboard');
                else if(res.data.role == 'admin')
                    router.push('/admin/dashboard');
                else{
                    console.log('Invalid role');
                    router.push('/login');
                }
            } else {
                console.log('Email verification failed');
                router.push('/login');
            }
        });
});
</script>

<template>
</template>

<style>
</style>