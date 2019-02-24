<template>
  <div сlass="search">
  	test
  	<div сlass="search__controls">
  	  <el-input
  	  	сlass="search__controls__input"
		    placeholder="Type ship name"
		    prefix-icon="el-icon-search"
		    clearable
		    @focus="setShipNames"
		    @input="findShips"
		    v-model="searchStr"/>
		  <el-button 
		  	сlass="search__controls__button"
		  	type="primary" 
		  	size="mini"
		  	icon="el-icon-arrow-right" 
		  	circle
		  	@click="moveToShipPage"/>
  	</div>

  	<div
  	  сlass="search__results"
  	  v-if="foundShips.length > 0">
	  	<div 
	  	  сlass="search__results__item"
	  	  v-for="(ship, k) in foundShips"
	  	  :key="k"
	  	  @click="setFoundShipName(ship)">
	  	  	{{ship.name}}
	  	</div>	
  	</div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getShipId } from '@/utils/helpers'

export default {
  data() {
  	return {
  	  searchStr: '',
  	  shipUrl: '',
  	  foundShips: []
  	}
  },
  computed: {
  	...mapGetters ([
      'getShipNames'
  	])
  },
  methods: {
  	setShipNames() {
  	  this.$store.dispatch('setShipNames')
  	},
  	findShips() {
  		if ( this.searchStr === '' ) {
  			this.foundShips = []
  		} else {
  	  	this.foundShips = this.getShipNames.filter( item => item.name.toLowerCase().indexOf(this.searchStr.toLowerCase()) !== -1)
  		}
  	},
  	setFoundShipName(ship) {
  	  this.searchStr = ship.name
  	  this.shipUrl = ship.url
  	},
  	moveToShipPage() {
  		this.$router.push(`/ship/${getShipId(this.shipUrl)}`)
  	} 
  }
}
</script>

<style scoped>
.search {
	font-size: 20px;
	color: #f00;
}

</style>