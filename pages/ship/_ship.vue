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
      app.store.dispatch('setShipPilots', shipData.pilots)
    ])
    let filmsStr = '' 
    let pilotsStr = ''

    app.store.getters.getFilmsInfo(shipData.films).forEach( obj => {
    	filmsStr += `, "${obj.title}" episode ${obj.episode}` 
    })
    app.store.getters.getPilotsInfo(shipData.pilots).forEach( obj => {   	
    	pilotsStr += `, ${obj.name}` 
    })
	shipData.filmsInfo = filmsStr.slice(2)
	shipData.pilotsInfo = pilotsStr.slice(2)
  	
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
