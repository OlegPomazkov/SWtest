<template>
  <div class="ships">
  	
    <div class="ships__title">
  	  Список кораблей
  	</div>

    <div class="ships__controls">
      <ship-search/>
      <pagination-comp/>
    </div>
    
    <div class="ships__table">
      <el-table
        :data="ships"
        @row-click="handleRowClick"
        style="width: 100%">
        
          <el-table-column
            prop="name"
            label="Name"
            width="180">
          </el-table-column>
          <el-table-column
            prop="model"
            label="Model"
            width="180">
          </el-table-column>
          <el-table-column
            prop="starship_class"
            label="Class"
            width="180">
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

export default {
  components: {
    ShipSearch, 
    PaginationComp
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
.ships
  display flex
  flex-direction column
  justify-content center
  align-items center

  &__controls
    display flex
    flex-direction row
    justify-content space-between
    align-items center
</style>
