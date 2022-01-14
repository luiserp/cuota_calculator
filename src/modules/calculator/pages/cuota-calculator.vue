<template>
  <Localnav/>
  <router-view></router-view>      
</template>

<script>
import Localnav from '../components/local-nav.vue'
export default {
    components: {
        Localnav
    }
}
</script>

<style>

</style>