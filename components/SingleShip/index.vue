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
  {name: 'name',           label: 'Name'},
  {name: 'starship_class', label: 'Class'},
  {name: 'model',          label: 'Model'}
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
