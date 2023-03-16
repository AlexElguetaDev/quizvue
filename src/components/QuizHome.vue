<template>
  <div class="home">
    <h1 class="home-title">{{ msg }}</h1>
    <img alt="quizeasy logo" class="logo" src="@/assets/logo.png" width="500" height="100" />
    <h3 class="home-subtitle">{{ sub }}</h3>
  </div>
</template>

<script setup lang="ts">
  interface HomeProps {
    msg: string;
    sub: string;
  }

  // eslint-disable-next-line no-undef
  defineProps<HomeProps>();
</script>

<style scoped>
  .home {
    text-align: left;
    left: -150px;
  }

  .home-title {
    font-weight: 800;
    font-size: 2.6rem;
    top: 15px;
  }

  .logo {
    left: -10px;
  }

  .home-subtitle {
    font-weight: 300;
    font-size: 1.2rem;
    top: -5px;
    text-align: left;
  }
</style>
