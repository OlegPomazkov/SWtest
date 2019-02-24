<template>
  <div class="ship">

  	<div class="ship__title">
  		SHIP PARAMETERS	
  	</div> 

    <div class="ship__info_wrapper">
    	<div 
        class="ship__info_wrapper__info"
        v-for="(item, k) in pageData"
        :key="k">
          <div class="ship__info_wrapper__info__label">
            {{item.label}}
          </div>
          <div class="ship__info_wrapper__info__value">
            {{ship[item.name]}}
          </div>
    	</div>
    </div>

    <div сlass="ship__button">
      <el-button          
          type="primary" 
          size="mini" 
          @click="moveToShipsPage">
            BACK TO SHIPS LIST
      </el-button>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const SHIP_DATA = [
  {name: 'name',           			    label: 'Name'},
  {name: 'model',          			    label: 'Model'},
  {name: 'starship_class', 			    label: 'Class'},
  {name: 'manufacturer',   			    label: 'Manufacturer'},
  {name: 'cost_in_credits',			    label: 'Cost in credits'},
  {name: 'length',         			    label: 'Length'},
  {name: 'max_atmosphering_speed',  label: 'Max atmosphering speed'},
  {name: 'crew',          			    label: 'Crew'},
  {name: 'passengers',          	  label: 'Passengers'},
  {name: 'cargo_capacity',          label: 'Cargo capacity'},
  {name: 'consumables',     	      label: 'Consumables'},
  {name: 'hyperdrive_rating',       label: 'Hyperdrive rating'},
  {name: 'MGLT',		          	    label: 'MGLT'},
  {name: 'filmsInfo',          		  label: 'Films'},
  {name: 'pilotsInfo',           		label: 'Pilots'},
  {name: 'created',          		    label: 'created'},
  {name: 'edited',          		    label: 'edited'},
  {name: 'url',  			              label: 'url'}
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
  },
  methods: {
    moveToShipsPage() {
      this.$router.push(`/`)
    } 
  }
}
</script>

<style lang="stylus">
.ship
  margin-left auto
  margin-right auto
  width 800px
  display flex
  flex-direction column
  justify-content center
  align-items center


  &__title
    margin-bottom 30px
    font-size 24px
    font-weight bold
    color #555

  &__info_wrapper
    width 100%
    display flex
    flex-direction column
    margin-bottom 30px

    &__info
      width 100%
      display flex
      flex-direction row
      justify-content start
      align-items center
      padding 1px

      &__label
        min-width 250px
        padding-left 15px
        color #888
        font-weight bold
        background-color #eee

      &__value
        padding-left 15px
        color #444
        font-style italic

</style>
