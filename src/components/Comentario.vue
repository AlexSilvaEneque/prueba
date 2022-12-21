<script setup>
    const prop = defineProps(['comment'])
</script>

<template>
    <div class="wrapper__comentario" v-if="comment">
        <div class="wrapper__comentario-header">
            <div class="user__img">
                <img :src="comment.user.avatar" alt="avatar">
            </div>
            <span>{{ comment.user.firstName }} {{ comment.user.lastName }}</span>
        </div>
        <div class="wrapper__comentario-main">
            <p>{{ comment.text }}</p>
        </div>
    </div>
</template>

<style scoped>
.wrapper__comentario {
    margin-bottom: 1rem;
}

.wrapper__comentario-header {
    display: flex;
}

span {
    font-size: 14px;
    font-weight: 18px;
}

.user__img {
    height: 30px;
    width: 30px;
    background-color: black;
    border-radius: 100%;
    margin-right: .4rem;
}

img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
}

.wrapper__comentario-main {
    padding: 0 calc(30px + .4rem);
}

p {
    font-size: 12px;
}

@media (min-width:1023px ) {
    span {
        font-size: 16px;
    }

    .user__img {
        height: 40px;
        width: 40px;
    }

    .wrapper__comentario-main {
        padding: 0 calc(40px + .4rem);
    }

    p {
        font-size: 14px;
    }
}
</style>