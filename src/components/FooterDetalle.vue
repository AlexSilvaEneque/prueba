<script setup>
    import { ref, onMounted } from 'vue'
    import Popup from './Popup.vue'

    const prop = defineProps(['id'])

    defineEmits(['closePopup'])

    const likes = ref()

    const pupopOptions = ref({
        button: false
    })

    const getLikes = async (xid) => {
            const res = await fetch(`https://61c35faa9cfb8f0017a3eb2e.mockapi.io/api/v1/posts/${xid}/likes/`)
            const data = await res.json()
            likes.value = data.length
    }

    const popup = () => {
        pupopOptions.value.button = !pupopOptions.value.button
    }

    onMounted(() => {
        getLikes(prop.id)
    })
</script>

<template>
    <div class="wrapper__footer" v-if="prop.id">
        
        <div class="footer-likes" @click="popup">
            <span>{{ likes }}</span>
            <span><font-awesome icon="fa-solid fa-heart" /></span>
        </div>
        <div class="footer-reserva">
            <button type="button" @click="popup">Reservar</button>
        </div>
    </div>
    <Popup v-if="pupopOptions.button" @closePopup="popup">
        <h2>Próximamente</h2>
    </Popup>
</template>

<style scoped>
.wrapper__footer {
    margin-top: 1.5rem;
    background-color: #fff;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    display: flex;
    padding: 1rem 1.8rem;
    align-items: center;
    justify-content: space-around;
}

.footer-likes {
    cursor: pointer;
    width: 70px;
    background-color: var(--background-input);
    text-align: center;
    height: 35px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 .4rem;
}

.footer-reserva {
    height: 35px;
    width: 200px;
}

button {
    height: 100%;
    border: none;
    width: 100%;
    background-color: var(--color-font);
    color: var(--background-input);
    line-height: 21px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 40px;
    cursor: pointer;
}

@media (min-width:1018px ) {
    .wrapper__footer {
        background-color: #fff;
        display: block;
        height: 50px;
        position: relative;
    }
    .footer-likes {
        height: 45px;
        float: right;
        position: absolute;
        top: 0;
        right: 20px;
    }

    .footer-reserva {
        height: 45px;
        position: absolute;
        top: 0;
        left: 20px;
    }

    button {
        line-height: 21px;
        font-size: 18px;
    }
}
</style>