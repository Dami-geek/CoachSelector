<template>
    <div class="student-select-stage">
        <section class="academy" v-for="academy in academies" :key="academy.name" :style="{ backgroundColor: academy.color, color: academy.textcolor }">
            <div class="header">
                <img :src="academy.photo" alt="ChiZi" />
                <div>
                    <h2>{{ academy.name }}</h2>
                    <p>{{ academy.description }}</p>
                </div>
            </div>
            <div class="members">
                <div v-for="teacher in academy.teachers" :key="teacher.id" class="student">
                    <div class="selected-red-dot" :class="{ active: isSelected(teacher.id) }">{{ getSelectionId(teacher.id) }}</div>
                    <div class="member" @click="selectCoach(teacher.id)" :style="{ backgroundColor: academy.backcolor }">
                        <img :src="teacher.photo" :alt="teacher.name" />
                        <div>
                            <strong>{{ teacher.name }}</strong>
                            <p>{{ teacher.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="submit-button" @click="submit" :class="{ active: selectedTeachers.length === 3 }">
            Select Coaches ({{ selectedTeachers.length }} / 3)
        </div>
    </div>
</template>

<style scoped>
.student-select-stage {
    width: 100%;
    height: 100%;
    padding: 24px;
    top: 120px;
    left: 24px;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin: 30px;
}

.academy {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 4px rgba(0,0,0,0.1);
    padding: 1rem;
    flex: 1;
    min-width: 300px;
}

.academy .header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.academy .header img {
    width: 60px;
    height: 60px;
    border: currentColor 2px solid;
    border-radius: 50%; /* Make the logo round */
    object-fit: cover; /* Ensure the image covers the circular area */
}

.student .members {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.member {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 5px;
    border-radius: 0.5rem;
    opacity: 0.8;
    transition: opacity 0.3s ease-in-out;
}
.member:hover {
    opacity: 1;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
}

.member img {
    width: 48px;
    height: 48px;
    border-radius: 5px;
    object-fit: cover;
    margin: 1rem;
}

.member p {
    font-size: 0.85rem;
    color: currentColor;
    margin-top: 0.25rem;
}

.member strong {
    font-size: 1rem;
    font-weight: 600;
}

.selected-red-dot:not(.active) {
    opacity: 0%;
    animation: fade-out 0.3s ease-in-out;
}
.selected-red-dot.active {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(229, 41, 12);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    opacity: 100%;
    z-index: 10;

    animation: fade-in 0.3s ease-in-out;
}

.submit-button {
    position: fixed;
    background-color: var(--button-disabled-color);
    color: white;
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    bottom: 60px;
    right: 60px;
}
.submit-button.active {
    background-color: var(--primary-color);
}
.submit-button.active:hover {
    background-color: var(--primary-hover-color);
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import constant from './const.vue'

const selectedTeachers = ref([]);

const academies = ref([
    {
        id: 'chizi',
        name: 'ChiZi',
        description: 'Academy of Chinese language teachers',
        photo: '/logo-chizi.jpg',
        color: '#fff8dc',
        textcolor: '#8B6C00',
        backcolor: '#EBBC20',
        teachers: []
    },
    {
        id: 'shangshan',
        name: "ShangShan",
        description: "Academy of Chinese language teachers",
        photo: '/logo-shangshan.jpg',
        color: '#e5f0ff',
        textcolor: '#3E83A9',
        backcolor: '#B0D4E5',
        teachers: [
            // {
            //     "name": "Teacher1",
            //     "description": "Teacher1 description",
            //     "photo": "/teacher1.jpg",
            //     "id": "teacher1"
            // }
        ]
    },
    {
        id: 'fupu',
        name: "Fupu",
        description: "Academy of Chinese language teachers",
        photo: '/logo-fupu.png',
        color: 'rgba(145, 211, 151, 0.3)',
        textcolor: '#33883B',
        backcolor: '#A8D6A3',
        teachers: []
    },
    {
        id: 'wuji',
        name: "Wuji",
        description: "Academy of Chinese language teachers",
        photo: '/logo-wuji.png',
        color: 'rgba(196, 0.3)',
        textcolor: '#6A6C6A',
        backcolor: '#C4C4C4',
        teachers: []
    }
]);

function fetchTeachers() {
    axios.get(constant.backendurl+'/teachers')
        .then(response => {
            const teachers = response.data;
            console.log('Fetched teachers:', teachers);
            academies.value.forEach(academy => {
                academy.teachers.push(...teachers.filter(teacher => teacher.house == academy.id));
            });
            console.log(academies);
            // forceUpdate();
        })
        .catch(error => {
            console.error('Error fetching teachers:', error);
        });
}

onMounted(() => {
    fetchTeachers();
});

function isSelected(id) {
    return selectedTeachers.value.includes(id);
}

function getSelectionId(id) {
    return isSelected(id) ? selectedTeachers.value.indexOf(id) + 1 : '';
}

function selectCoach(id) {
    if(selectedTeachers.value.includes(id)) {
        selectedTeachers.value = selectedTeachers.value.filter(teacherId => teacherId !== id);
    }
    else {
        if(selectedTeachers.value.length >= 3){
            return;
        }
        selectedTeachers.value.push(id);
    }
}

const emit = defineEmits(['submit']);

function submit() {
    if (selectedTeachers.value.length === 3) {
        emit('submit', selectedTeachers.value);
    }
}

</script>
