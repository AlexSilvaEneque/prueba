<script setup>
  import { onMounted } from 'vue'
  import store from './store'

  const checkSession = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      store.auth = true
    }
  }

  onMounted(() => {
    checkSession()
  })
</script>

<template>
  <router-view />
</template>

<style>

</style>