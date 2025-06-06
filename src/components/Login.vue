<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import constants from './const.vue';

const email = ref('')
const loginError = ref(null)
const router = useRouter()
const hCaptcha = ref(null)
const loading = ref(false)

function onVerify(token) {
  hCaptcha.value = token
}

function login() {
  loginError.value = null;

  if(hCaptcha.value==null || hCaptcha.value == undefined || !hCaptcha.value){
    loginError.value = 'Please complete the captcha.'
    return
  }

  if(email.value==null || !email.value.endsWith("@moonshotacademy.cn")){
    loginError.value = 'Please use your MSA email address.'
    return
  }

  loading.value = true;

  axios.post(constants.backendurl+'/sendVerification', {
    "email": email.value,
    "h-captcha-response": hCaptcha.value
  })
    .then(res => {
      loading.value = false;
      if(res.data=="success"){
        router.push('/checkmail');
      }
    })
    .catch(error => {
      loading.value = false;
      loginError.value = 'Login failed. Please try again later.'
      console.error('Login error:', error)
    })
}
</script>

<template>
  <div class="container">
    <div class="login-card">
      <h1 class="title">Welcome Back</h1>
      <form @submit.prevent="login" class="form">
        <div v-if="loginError" class="error-message">
          {{ loginError }}
        </div>

        <div class="input-group">
          <label for="username">MSA Email</label>
          <input id="username" type="email" v-model="email" class="input" placeholder="xxx@moonshotacademy.cn">
        </div>

        <vue-hcaptcha sitekey="21a4c4de-0510-4b9e-9cca-921c92ec0ea6" @verify="onVerify"></vue-hcaptcha>

        <button type="submit" class="button" :class="{ clicked: loading }">Sign In</button>
      </form>
    </div>
  </div>
</template>

<style>
/* Base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
}

.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e8f8e4 0%, #b9d1f3 100%);
}

.login-card {
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 50px 50px rgba(0, 0, 0, 0.1);
  width: 100%;
  animation: slideIn 1s ease-out;
  max-width: 400px;
  transition: transform 0.3s ease;
}

.title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
}

.input {
  padding: 0.8rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

.input::placeholder {
  color: #a0aec0;
}

.button {
  background: #4299e1;
  color: white;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.button.clicked {
  background: #224e73;
}

.button:hover {
  background: #3182ce;
  transform: translateY(-1px);
}

.button:active {
  transform: translateY(0);
}

@media (max-width: 480px) {
  .login-card {
    margin: 1rem;
    padding: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-1rem);
  }

  to {
    opacity: 100;
    transform: translateY(0);
  }
}

.error-message {
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.error-message {
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  padding: 0.75rem;
  background-color: #fed7d7;
  border-radius: 0.5rem;
  border: 1px solid #fc8181;
  animation: slideIn 0.3s ease-out;
}

@keyframes show {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>