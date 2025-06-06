<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import cookies from 'vue-cookies'
import consts from './const.vue'

const router = useRouter()
const route = useRoute();

const token = ref(route.params.token);

onMounted(() => {
    axios.get(consts.backendurl+'/verify/'+token.value)
        .then(res => {
            if(res.data.status == 'success'){
                cookies.set('cs-ssid', token.value, "1d");
                router.push('/');
            } else {
                alert('Email verification failed');
                router.push('/login');
            }
        });
    });
</script>

<template>
</template>