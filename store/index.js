import { SHIPS_PER_PAGE } from '@/assets/constants'

export const state = () => ({
  currentPage: 0,
  nextPageUrl: null,
  pagesAll: 0,
  ships: [],
  films: {},
  pilots: {},
  shipLinks: {}
})

export const getters = {
  shipsOnPage: (state) => (page) => {
    return state.ships.filter( (item, i) => (i >= page*SHIPS_PER_PAGE) && (i < ((page+1)*SHIPS_PER_PAGE)))
  }
}

export const mutations = {
  SET_PAGES_ALL (state, count) {
    state.pagesAll = (count%SHIPS_PER_PAGE > 0)? parseInt(count/SHIPS_PER_PAGE)+1:parseInt(count/SHIPS_PER_PAGE)   
  },
  SET_CURRENT_PAGE (state, page) {
    state.currentPage = page
  },
  SET_NEXT_PAGE_URL (state, url) {
    state.nextPageUrl = url
  },
  ADD_SHIPS (state, newShips) {
    newShips.forEach( item => {state.ships.push(item)})
  }, 
  ADD_FILM (state, newFilm) {
    state.films[newFilm.url] = {}
    state.films[newFilm.url].name = newFilm.name
  },
  ADD_PILOT (state, newPilot) {
    state.pilots[newPilot.url] = {}
    state.pilots[newPilot.url].name = newPilot.name
  }
}

export const actions = {
  setPagesAll({commit}, count) {
    commit('SET_PAGES_ALL', count)
  },
  setNextPage({commit}, url) {
    commit('SET_NEXT_PAGE_URL', url)
  },
  addShips({commit}, ships) {
    commit('ADD_SHIPS', ships)
  },
  incrementPage({dispatch, commit, state}) {
    if( (state.currentPage+1)*SHIPS_PER_PAGE < state.ships.length) {
      commit('SET_CURRENT_PAGE', state.currentPage+1)  
    } else {
      dispatch('getNextPageData')
    }
  },
  decrementPage({commit, state}) {
    if (state.currentPage < 1 ) throw new Error('Could not decrement page less then 1')
    commit('SET_CURRENT_PAGE', state.currentPage-1)  
  },

  async getNextPageData({dispatch, commit, state}) {
    try {
      const res = await this.$axios(state.nextPageUrl)

      dispatch('addShips', res.data.results)
      dispatch('setNextPage', res.data.next)
      dispatch('incrementPage')
    }
    catch(err) {
      throw err
    }
  },




  async appInit({dispatch, commit}) {
    try {

      console.log('Going to init ...')
      await Promise.all([
        dispatch('getI18n'),
        dispatch('getFeedItems'),
        dispatch('getIcons') 
      ])
      
      commit('SET_INITIALS')
      commit('SET_INITED', true)
    } catch (err) {
      throw err
    }

    // Инициализация запроса о новых push уведомлениях
    let checkNewFeedItems = () => {
      dispatch('getFeedItems')
    }

    setInterval(checkNewFeedItems, 2*60*1000)
  }
}
