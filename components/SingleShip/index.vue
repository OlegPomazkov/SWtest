<template>
  <div class="ship">

  	<div class="ship__title">
  		SHIP  {{ $route.params.ship }}	
  	</div> 

  	<div class="ship__info">
  	  <el-input 
  	  	v-for="(item, k) in pageData"
  	  	:key="k"
  	    placeholder="Please input" 
  	    v-model="ship[item.name]">
    	  <template slot="prepend">
    	  	{{item.label}}
    	  </template>
  	  </el-input>  
  	</div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const SHIP_DATA = [
  {name: 'name',           			label: 'Name'},
  {name: 'model',          			label: 'Model'},
  {name: 'starship_class', 			label: 'Class'},
  {name: 'manufacturer',   			label: 'Manufacturer'},
  {name: 'cost_in_credits',			label: 'Cost in credits'},
  {name: 'length',         			label: 'Length'},
  {name: 'max_atmosphering_speed', 	label: 'Max atmosphering speed'},
  {name: 'crew',          			label: 'Crew'},
  {name: 'passengers',          	label: 'Passengers'},
  {name: 'cargo_capacity',          label: 'Cargo capacity'},
  {name: 'consumables',     	    label: 'Consumables'},
  {name: 'hyperdrive_rating',       label: 'Hyperdrive rating'},
  {name: 'MGLT',		          	label: 'MGLT'},
  {name: 'filmsInfo',          		label: 'Films'},
  {name: 'pilotsInfo',         		label: 'Pilots'},
  {name: 'created',          		label: 'created'},
  {name: 'edited',          		label: 'edited'},
  {name: 'url',  			        label: 'url'}
]
export default {
  props: {
  	ship: {
  	  type: Object,
  	  required: true
  	}
  },
  data() {
  	return {
  	  pageData: SHIP_DATA
  	}
  }
}
</script>

<style lang="stylus">
</style>
