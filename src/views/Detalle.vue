<script setup>
    import Header from '../components/Header.vue'
    import FooterDetalle from '../components/FooterDetalle.vue'
    import Comentario from '../components/Comentario.vue'
    import { ref, onMounted, watch } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import moment from 'moment'

    const lista = ref([])
    const router = useRouter()
    const route = useRoute()

    const id = ref()
    const info = ref()
    const date = ref()
    const comment = ref()

    const cambio = ref(0)
    
    cambio.value = document.documentElement.clientWidth

    const back = () => {
        router.push({name: 'inicio'})
    }

    const formatter = (date) => {
        return moment(date).format('LTS')
    }

    const getPost = async () => {
        const res = await fetch(`https://61c35faa9cfb8f0017a3eb2e.mockapi.io/api/v1/posts/${id.value}`)
        const data = await res.json()
        info.value = data
        date.value = formatter(info.value.createdAt)
    }

    const getComments = async () => {
        const res = await fetch(`https://61c35faa9cfb8f0017a3eb2e.mockapi.io/api/v1/posts/${id.value}/comments`)
        const data = await res.json()
        lista.value = data
    }

    const commentPost = async () => {
        let send = {
            text: comment.value,
            postId: id.value
        }

        const res = await fetch(`https://61c35faa9cfb8f0017a3eb2e.mockapi.io/api/v1/posts/${id.value}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(send)
        })
        
        const p = await res.json()
        comment.value = ''

        getComments()
    }

    watch(cambio, (a) => {
        console.log(a);
    })

    onMounted(() => {
        // aux.value = document.documentElement.clientWidth
        // console.log(aux.value);
        id.value = route.params.id
        getPost()
        getComments()
    })
</script>

<template>
    <Header class="header" />
    <div class="wrapper__main" v-if="info">
        <div class="wrapper__imagen">
            <img src="/img/imagen1.jpg" alt="" class="imagen-img">
        </div>
        <div class="wrapper__detalle">
            <div class="wrapper__detalle__main">
                <div class="main__header">
                    <i @click="back"><font-awesome icon="fa-solid fa-left-long" /></i>
                    <h1 class="main__title">{{ info.title }}</h1>
                </div>

                <img :src="info.image" alt="imagen producto" class="img-producto">
                <div class="body__user">
                    <div class="body__user__header">
                            <img :src="info.user.avatar" alt="" class="user__avatar">
                        <span class="main__user-nombre">{{ info.user.firstName }} {{ info.user.lastName }}</span>
                    </div>
                    <p class="body__user__body">
                        {{ info.description }}
                    </p>
                    <div class="body__user__footer">
                        <span>Publicado a las {{ date }}</span>
                    </div>
                </div>
            </div>

            <FooterDetalle :id="id" />

            <div class="wrapper__detalle__coments">
                <h1 class="coments-h1">Comentarios</h1>
                <div class="comments-main">
                    <Comentario v-for="item in lista" :key="item" :comment="item" />
                </div>
                <form @submit.prevent="commentPost" class="form">
                    <input type="text" class="input-comentario" placeholder="Escribe un comentario..." v-model="comment">
                    <button class="send"><font-awesome icon="fa-solid fa-paper-plane" /></button>
                </form>
            </div>
        </div>
        <FooterDetalle :id="id" />
    </div>
</template>

<style scoped>
i {
    display: none;
}
.wrapper__main {
    width: 100%;
}
.wrapper__imagen {
    display: none;
}
.wrapper__detalle {
    width: 100%;
    overflow-x: hidden;
}
.wrapper__detalle__coments,
.wrapper__detalle__main {
    padding: 1rem 1.8rem;
}

.main__title {
    font-size: 14px;
    margin-bottom: 1rem;
}

.img-producto {
    width: 100%;
}

.body__user__header {
    display: flex;
    align-items: center;
    margin-bottom: .5rem;
}

.user__avatar {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    object-fit: cover;
}

.main__user-nombre {
    margin-left: .7rem;
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
}

.body__user__body {
    font-size: 12px;
    line-height: 18px;
    margin-bottom: .4rem;
}

.body__user__footer {
    font-size: 8px;
    line-height: 12px;
}

.wrapper__detalle__coments {
    background-color: var(--background-navbar);
    margin-top: 1rem;
}

.coments-h1 {
    font-size: 16px;
    margin-bottom: 1.1rem;
    display: block;
}

.comments-main {
    height: 200px;
    margin-bottom: 1.5rem;
    overflow-y: scroll;
}

.input-comentario {
    width: 100%;
    height: 33px;
    border: none;
    border-radius: 40px;
    padding: 0 1rem;
    color: #434343;
    line-height: 18px;
}

.form {
    display: flex;
}

.send {
    border: none;
    background: none;
    font-size: 18px;
    color: #434343;
    margin-left: .4rem;
    cursor: pointer;
}



@media (min-width:1018px ) {
    .header {
        display: none;
    }

    .wrapper__main {
        width: 100%;
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 40% auto;
        grid-template-areas:
            "a b";
        height: 100vh;
        overflow: hidden;
        place-items: center;
    }

    i {
        display: inline-block;
        font-size: 25px;
        margin-bottom: 1rem;
        color: var(--color-font);
    }
    .main__header{
        display: flex;
    }
    .main__title {
        font-size: 20px;
        display: inline;
        margin-left: 1rem;
        color: var(--color-font);
    }

    .user__avatar {
        height: 50px;
        width: 50px;
    }

    .main__user-nombre {
        font-size: 18px;
    }

    .body__user__body {
        font-size: 16px;
    }

    .body__user__footer {
        font-size: 12px;
        margin-top: 1.5rem;
    }

    .wrapper__imagen {
        display: block;
        grid-area: a;
        width: 100%;
        height: 100%;
    }

    .imagen-img {
        width: 100%;
        height: 100vh;
    }

    .wrapper__detalle {
        grid-area: b;
        height: 100%;
        padding: 3rem;
        overflow-x: scroll;
    }

    .img-producto {
        width: 70%;
        margin: auto;
        display: block;
    }

    .wrapper__detalle__coments {
        margin-top: 1.2rem;
        border-radius: 5px;
    }

    .coments-h1 {
        font-size: 18px;
    }

    .input-comentario {
        width: 100%;
        height: 40px;
        font-size: 14px;
    }
}
</style>