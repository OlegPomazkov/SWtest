<template>
  <div class="pagination">
  	<el-button 
  	  :disabled="currentPage === 0"	
  	  @click="getPreviousPage"
  	  type="primary"
  	  size="mini" 
  	  icon="el-icon-d-arrow-left" 
  	  circle/>

  	<span>
  	  {{ `${currentPage+1} from ${pagesAll}`}}	
  	</span>

  	<el-button 
  	  :disabled="(currentPage+1) === pagesAll"
  	  @click="getNextPage"	
  	  type="primary"
  	  size="mini" 
  	  icon="el-icon-d-arrow-right" 
  	  circle/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed:{
  	...mapState({
  	  currentPage: state => state.currentPage,
      pagesAll: state => state.pagesAll
  	})
  },
  methods: {
  	getPreviousPage() {
      this.$store.dispatch('decrementPage')
  	},
  	getNextPage(){
  	  this.$store.dispatch('incrementPage')
  	}
  }
}
</script>

<style lang="stylus">
.pagination
  color #333
</style>
