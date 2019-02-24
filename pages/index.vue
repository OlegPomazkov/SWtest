<template>
  <all-ships/>
</template>

<script>
import AllShips from '@/components/AllShips'

export default {
  components: {
    AllShips
  },

  async asyncData({ app, $axios }) {
    const res = await app.$axios.$get('https://swapi.co/api/starships/')

    app.store.dispatch('setPagesAll', res.count)
    app.store.dispatch('setShipsAll', res.count)
    app.store.dispatch('setNextPage', res.next)
    app.store.dispatch('addShips', res.results)
  }, 
}
</script>
