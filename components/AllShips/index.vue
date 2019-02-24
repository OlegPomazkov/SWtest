<template>
  <div class="ships">
  	
    <div class="ships__title">
  	  SHIPS LIST
  	</div>

    <div class="ships__controls">
      <ship-search/>
      <pagination-comp/>
    </div>
    
    <div class="ships__table">
      <el-table
        :data="ships"
        size="medium"
        @row-click="handleRowClick">
        
          <el-table-column
            v-for="( item, k) in shipsTable"
            :prop="item.name"
            :label="item.label"
            :width="item.width">
          </el-table-column>

      </el-table>
    </div>
  
  </div>
</template>

<script>
import ShipSearch from '@/components/AllShips/ShipSearch'
import PaginationComp from '@/components/AllShips/PaginationComp'
import { mapState, mapGetters } from 'vuex'
import { getShipId } from '@/utils/helpers'

const SHIPS_TABLE = [
  { name: 'name',           label: 'Name' , width: '250'},
  { name: 'model',          label: 'Model'},
  { name: 'starship_class', label: 'Class', width: '250'}
]

export default {
  components: {
    ShipSearch, 
    PaginationComp
  },
  data() {
    return {
      shipsTable: SHIPS_TABLE
    }
  },
  computed: {
    ...mapState({
      'currentPage': state => state.currentPage
    }),
    ...mapGetters([
      'shipsOnPage'
    ]),
    ships() {
      return this.shipsOnPage(this.currentPage)
    }
  },
  methods: {
    handleRowClick(ev) {
      this.$router.push(`/ship/${getShipId(ev.url)}`)
    }
  }
}
</script>

<style lang="stylus">
@import '~assets/styles/variables.styl'

.ships
  margin-left auto
  margin-right auto
  width 800px
  display flex
  flex-direction column
  justify-content center
  align-items center

  &__title
    font-size 24px
    font-weight bold
    color $textColorDark


  &__controls
    width 100%
    padding-left 15px
    padding-right 15px
    display flex
    flex-direction row
    justify-content space-between
    align-items center

  &__table 
    width 100%
</style>
