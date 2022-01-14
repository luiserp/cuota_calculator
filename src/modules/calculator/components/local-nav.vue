<template>
  <nav class="text-center mt-5">
    <h1>Calculador de cuota</h1>
      <ul class="nav justify-content-center">
          <li class="nav-item"> <router-link class="nav-link" :to="{ name: 'recuperacion' }" > Recuperacion </router-link> </li>
          <li class="nav-item"> <router-link class="nav-link" :to="{ name: 'disponibilidad' }" > Disponibilidad </router-link> </li>
      </ul>
  </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>