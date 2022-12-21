<script setup>
    import Header from '../components/Header.vue';
    import Inicio from '../views/Inicio.vue';

</script>

<template>
    <div class="op">
        <Header class="header" />
        <Inicio />
    </div>
</template>

<style scoped>

@media (min-width:1023px ) {
    .header {
        display: none;
    }
}
</style>