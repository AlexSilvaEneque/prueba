<script setup>
    import { ref, onMounted, watch } from 'vue'
    import store from '../store'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const list = ref([])
    const page = ref(1)

    const hasMore = ref(false)
    const npag = ref(0)
    const qty = ref(0)

    const pagina = (num) => {
        page.value = num
    }

    const changeFlag = (id) => {
        store.flag = false

        router.push({ name: 'item', params: {id} })
    }

    const allPosts = async () => {
        const res = await fetch(`https://61c35faa9cfb8f0017a3eb2e.mockapi.io/api/v1/posts/?page=${page.value}&limit=10`)
        const data = await res.json()
        list.value = data.items
        qty.value = data.count

        npag.value = parseInt((qty.value/10).toFixed())

        hasMore.value = qty.value > page.value * 10
    }

    watch(page, () => {
        allPosts()
    })

    onMounted(() => {
        allPosts()
    })
    
</script>

<template>
    <div class="wrapper__main">
        <div class="wrapper__imagen">
            <img src="/img/imagen1.jpg" alt="image" class="imagen-img">
        </div>
        <div class="wrapper__inicio">
            <h1>Ultimas promociones</h1>
            <div ref="scrollComponent">
                <div class="inicio__card" v-for="item in list" :key="item">
                    <div @click="changeFlag(item.id)" class="card">
                        <div class="main">
                            <img :src="item.image" alt="item" class="main__img">
                            <img :src="item.user.avatar" alt="user" class="user__avatar">
                        </div>
                        <div class="description">
                            <p class="description--title">{{ item.title }}</p>
                            <p class="description--more">{{ item.description }}</p>
                        </div>
                    </div>
                </div>
                <div class="wrapper__pagination">
                    <div class="box" v-for="item in npag" :key="item" @click="pagina(item)" :class="{'box-select': (item === page) }">
                        {{ item }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.wrapper__main {
    width: 100%;
}

.wrapper__imagen {
    display: none;
}

.wrapper__inicio {
    width: 100%;
    padding: 1rem 2.5rem;
}

h1 {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 1rem;
}

.inicio__card {
    background-color: var(--background-cards);
    margin-bottom: .5rem;
    border-radius: 5px;
    padding: 2rem;
    cursor: pointer;
}

.main {
    position: relative;
    width: 70%;
    margin: auto;
}
.main__img {
    width: 100%;
    position: relative;
    display: block;
    margin: auto;
}
.user__avatar {
    position: absolute;
    height: 28px;
    width: 28px;
    border-radius: 100%;
    object-fit: cover;
    bottom: 0;
}

p {
    font-size: 12px;
}

.description--title {
    line-height: 21px;
    font-weight: 700;
}

.description--more {
    line-height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.wrapper__pagination {
    width: 40%;
    margin: auto;
    display: flex;
    justify-content: center;
}

.box {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: .4rem;
    background-color: var(--background-navbar);
    color: #4e4e4e;
    cursor: pointer;
}

.box-select {
    background: rgba(196, 196, 196, .6);
}

@media (min-width:767px ) {
    .wrapper__inicio {
        padding: 70px;
    }

    .main__img {
        width: 100%;
    }

    .user__avatar {
        height: 40px;
        width: 40px;
        border-radius: 100%;
        object-fit: cover;
        bottom: 0;
    }
}

@media (min-width:1023px ) {
    .wrapper__main {
        width: 100%;
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 40% auto;
        grid-template-areas:
            "a b";
        height: 100vh;
        overflow: hidden;
        place-items: center;
    }

    h1 {
        font-size: 36px;
    }

    .wrapper__imagen {
        display: block;
        grid-area: a;
        width: 100%;
    }

    .imagen-img {
        width: 100%;
        height: 100vh;
    }

    .wrapper__inicio {
        grid-area: b;
        height: 90vh;
        overflow-y: scroll;
    }

    .card {
        display: flex;
        justify-content: space-around;
    }

    .main__img {
        width: 90%;
    }

    .main {
        width: 40%;
    }

    .description {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .main__user {
        width: 50px;
        height: 50px;
        bottom: 2px;
        right: 35px;
    }

    .description--title {
        font-size: 21px;
        line-height: 21px;
        margin-bottom: 1rem;
    }

    .description--more {
        font-size: 18px;
        line-height: 21px;
    }
}
</style>