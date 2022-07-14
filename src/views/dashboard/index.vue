<template>
  <!-- <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <Card></Card>
  </div> -->
  <div class="dashboard-container">
    <Card></Card>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Card from './Card'
import Sale from './Sale'
import Observe from './Observe'

export default {
  name: 'Dashboard',
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ])
  // },
  components: { Card, Sale, Observe },
  mounted() {
    this.$store.dispatch('getData');
  }
}
</script>

<style scoped>
</style>
