<template>
  <single-ship
  	:ship="shipData"/>
</template>

<script>
import SingleShip from '@/components/SingleShip'

export default {
  async asyncData({ app }) {
	let shipData = app.store.getters.getShipById(app.context.params.ship)

	await Promise.all([
      app.store.dispatch('setShipFilms', shipData.films),
//      app.store.dispatch('setShipPilots', ship.data.pilots)
    ])
	shipData.filmsInfo = app.store.getters.getFilmsInfo(shipData.films)

  	debugger

  	return {
  	  shipData: shipData
  	}
  },
  components: {
    SingleShip
  }
}
</script>

<style lang="stylus">

</style>
