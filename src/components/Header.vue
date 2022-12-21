<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router'
    import store from '../store/index'

    const router = useRouter()
    const route = useRoute()

    const flag = ref()
    flag.value = store.flag

    onMounted(() => {
        if (route.fullPath.split('/')[1] == "detalle") {
            flag.value = false
        }
    })

    const back = () => {
        store.flag = true
        router.push({ name: 'inicio' })
    }
</script>

<template>
    <nav>
        <div class="wrapper__nav">
            <i v-if="!flag" @click="back"><font-awesome icon="fa-solid fa-left-long" /></i>
            <img src="/img/plazavealogo.png" alt="logo" :class="{ img_res: !flag }">
        </div>
        <span v-if="flag">TODAS LAS PROMOCIONES</span>
    </nav>
</template>

<style scoped>
nav {
    min-height: max-content;
    background-color: var(--background-navbar);
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
}

.wrapper__nav {
    display: flex;
    align-items: center;
    height: 29px;
}

img {
    width: 87px;
}

.img_res {
    margin: 0 5rem;
}

span {
    font-size: 12px;
    color: var(--color-font);
    font-weight: 600;
    border-bottom: 1px solid;
    margin-top: 1.8rem;
}
</style>