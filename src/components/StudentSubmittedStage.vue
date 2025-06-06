<template>
    <div class="submitted-container">
        <div class="checkmark-container">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
        </div>
        <div class="submitted-message">
            <h1 class="success-message">提交成功!</h1>
            <p class="wait-message">请等待分配结果</p>
        </div>
    </div>
</template>

<style scoped>
.submitted-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
}

.checkmark-container {
    width: 120px;
    height: 120px;
    margin-bottom: 30px;
}

.checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #4CAF50;
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #4CAF50;
    stroke-miterlimit: 10;
    box-shadow: inset 0px 0px 0px #4CAF50;
    animation: fill .4s ease-in-out .4s forwards;
}

.checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    stroke: white;
    stroke-width: 3;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

.submitted-message {
    text-align: center;
}

.success-message {
    font-family: 'Courier New', Courier, monospace;
    font-size: 38px;
    color: #333;
    margin-bottom: 20px;
}

.wait-message {
    font-size: 15px;
    color: #666;
}

@keyframes stroke {
    100% {
        stroke-dashoffset: 0;
    }
}

@keyframes fill {
    100% {
        box-shadow: inset 0px 0px 0px 80px #4CAF50;
    }
}
</style>

<script setup>
</script>