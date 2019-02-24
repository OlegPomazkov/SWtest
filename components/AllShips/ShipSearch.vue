<template>
  <div class="ship_search">
  
    <div class="ship_search__controls">
      <div сlass="ship_search__controls__input">
        <el-input
          placeholder="Type ship name"
          prefix-icon="el-icon-search"
          clearable
          @focus="setShipNames"
          @input="findShips"
          v-model="searchStr"/>
      </div>
      <el-button
        сlass="ship_search__controls__button"
        type="primary" 
        size="mini"
        icon="el-icon-arrow-right" 
        circle
        @click="moveToShipPage"/>
    </div>

    <div 
      class="ship_search__results"
      v-if="foundShips.length > 0">
      <div
        class="ship_search__results__item"
        v-for="(ship,k) in foundShips"
        :key="k"
        @click="setFoundShipName(ship)">
          <div>
              {{ship.name}}  
          </div>
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
      this.findShips()
    },
    moveToShipPage() {
      if ( this.searchStr === '' ) return
      this.$router.push(`/ship/${getShipId(this.shipUrl)}`)
    } 
  }
}
</script>

<style lang="stylus">
@import '~assets/styles/variables.styl'

.ship_search
  position relative
  width 280px

  &__controls
    width 100%
    height 40px
    display flex
    flex-direction row
    justify-content space-between
    align-items center

    &__input
      max-width 275px
    
  &__results
    position absolute
    left 0
    top 50px
    width 100%
    max-height 400px
    padding-bottom 8px
    overflow auto
    z-index 10
    border 1px solid #409eff
    border-radius 4px
    background-color #fafafa

    &__item
      width 100%
      display flex
      justify-content center
      align-items center
      padding-top 5px
      cursor pointer
      color $textColorDark
      border-bottom 1px solid $line 

      &:hover
        background-color #eee

</style>
