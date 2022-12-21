<script setup>
    import { ref } from "vue"
    import { useRouter } from 'vue-router'
    import store from '../store'

    const router = useRouter()

    const bol1 = ref(false)
    const bol2 = ref(false)
    const bol3 = ref(false)

    const imageSelector = ref(null)
    const preview = ref('')

    const nombre = ref('')
    const apellido = ref('')
    
    const loadImage = () => {
        imageSelector.value.click()
    }

    const pickfile = () => {
        let input = imageSelector.value
        let file = input.files

        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = (e) => {
            preview.value = e.target.result
          }
          reader.readAsDataURL(file[0])
        }
    }

    const register = () => {
        !preview.value ? bol1.value = true : !nombre.value ? bol2.value = true : !apellido.value ?  bol3.value = true :

        store.user = {
                        name: nombre.value,
                        last: apellido.value,
                        avatar: preview.value
                    }
            

        store.auth = true
        
        localStorage.setItem('user', JSON.stringify(store.user))
        
        if (preview.value && nombre.value && apellido.value) {
            router.push({ name: 'inicio' })    
        }

    }

</script>

<template>
    <div class="wrapper__main">
        <div class="wrapper__imagen">
            <img src="/img/imagen1.jpg" alt="" class="imagen-img">
        </div>
        <div class="wrapper__register">
            <div class="wrapper__register--header">
                <img src="/img/plazavealogo.png" alt="logo_register" class="header--img">
                <h1>Registrate para ingresar</h1>
            </div>
            <div class="wrapper__register--body">
                <form @submit.prevent="register" class="body-form">
                    <div class="form__group">
                        <label>Foto de perfil</label>
                        <input type="file" ref="imageSelector" v-show="false" @input="pickfile" accept="image/png, image/jpeg">
                        <div class="input__img" :class="{ 'background-image': `url(${preview})` }" @click="loadImage">
                            <img src="/img/user.png" alt="" class="icon" v-if="!preview">
                            <img :src="preview" alt="" class="icon" v-if="preview">
                        </div>
                        <span v-if="bol1">Necesita una imagen*</span>
                    </div>
                    <div class="form__group">
                        <label>Nombres</label>
                        <input type="text" placeholder="Rodrigo" v-model="nombre">
                        <span v-if="bol2">Ingrese nombre*</span>
                    </div>
                    <div class="form__group">
                        <label>Apellidos</label>
                        <input type="text" placeholder="Fernandez Panta" v-model="apellido">
                        <span v-if="bol3">Ingrese apellidos*</span>
                    </div>
                    <div class="form__group">
                        <input type="submit" value="Ingresar">
                    </div>
                </form>
            </div>
        </div>
        <div class="wrapper__footer">
            <img src="/img/footer1.png" alt="footer" class="wrapper__footer--img">
            <img src="/img/footer1-1.png" alt="footer" class="wrapper__footer--img2">
        </div>
    </div>
</template>

<style scoped>
.wrapper__main {
    overflow: hidden;
    width: 100%;
}
.wrapper__imagen {
    display: none;
}

.wrapper__register {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 2rem;
    width: 100%;
}

.wrapper__register--header {
    margin-bottom: 3.1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1 {
    color: var(--color-font);
    font-size: 14px;
    margin-top: .5rem;
}

.header--img {
    width: 133px;
}

.wrapper__register--body {
    width: 280px;
}

.form__group {
    margin-bottom: 1rem;
}

.input__img {
    align-items: center;
    background-color: var(--background-input);
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    height: 80px;
    justify-content: center;
    margin: auto;
    width: 80px;
}

.icon {
    height: 32px;
}

label {
    display: block;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    margin-bottom: 12px;
}

input[type=text] {
    background-color: var(--background-input);
    border-radius: 5px;
    border: none;
    height: 30px;
    padding: 0 .7rem;
    width: 100%;
}

span {
    color: var(--color-font);
}

input[type=submit] {
    background-color: #FFE81E;
    color: var(--color-font);
    font-weight: 700;
    font-size: 12px;
    line-height: 18px;
    border: none;
    border-radius: 40px;
    height: 32px;
    width: 100%;
    margin-top: .8rem;
    cursor: pointer;
}
/* .wrapper__footer{
    width: 100%;
    border: solid;
} */
.wrapper__footer--img {
    position: absolute;
    bottom: 0;
    height: 110px;
}

.wrapper__footer--img2 {
    display: none;
}


@media (min-width:1023px ) {

    .wrapper__main {
        width: 100%;
        display: grid;
        grid-template-rows: 70% auto;
        grid-template-columns: 40% auto;
        grid-template-areas:
            "a b"
            "a c";
        height: 100vh;
        overflow: hidden;
    }
    .wrapper__imagen {
        display: block;
        grid-area: a;
        width: 100%;
    }
    .imagen-img {
        width: 100%;
        height: 100%;
    }

    .wrapper__register  {
        grid-area: b;
        padding-left: 3rem;
        align-items: flex-start;
    }

    .wrapper__register--header {
        align-items: flex-start;
    }

    h1 {
        font-size: 30px;
        line-height: 45px;
        padding-left: 5rem;
    }

    .header--img {
        display: none;
    }

    .wrapper__register--body{
        width: 100%;
    }

    .body-form {
        width: 50%;
        margin: auto;
    }

    .form__group:nth-child(1) {
        text-align: center;
    }


    label {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 14px;
    }

    input[type=text] {
        height: 40px;
        padding: 0 .9rem;
        font-size: 16px;
    }

    input[type=submit] {
        font-size: 16px;
        height: 40px;
    }


    .wrapper__footer {
        grid-area: c;
    }

    .wrapper__footer--img {
        display: none;
    }
    .wrapper__footer--img2 {
        display: inline;
        position: absolute;
        height: 180px;
        right: 0;
        bottom: 0;
    }
}
</style>