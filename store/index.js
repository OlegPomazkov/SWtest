import { SHIPS_PER_PAGE } from '@/utils/constants'
import { getShipId } from '@/utils/helpers'

export const state = () => ({
  currentPage: 0,
  nextPageUrl: null,
  pagesAll: 0,
  shipsAll: 0,
  ships: [],
  shipNames: [],
  films: {},
  pilots: {},
  shipLinks: {}
})

export const getters = {
  shipsOnPage: (state) => (page) => {
    return state.ships.filter( (item, i) => (i >= page*SHIPS_PER_PAGE) && (i < ((page+1)*SHIPS_PER_PAGE)))
  },
  getShipNames: (state) => state.shipNames.map( i => Object.assign({}, i)),
  getShipById: (state) => (id) => state.ships.filter( (item, i) => getShipId(item.url) === id)[0],
  getFilmsInfo: (state) => (films) => {
    let arr = []

    films.forEach( url => {arr.push(state.films[url])})

    return arr
  },
  getPilotsInfo: (state) => (pilots) => {
    let arr = []

    pilots.forEach( url => {arr.push(state.pilots[url])})

    return arr
  }
}

export const mutations = {
  SET_SHIPS_ALL (state, count) {
    state.shipsAll = count   
  },
  SET_PAGES_ALL (state, count) {
    state.pagesAll = (count%SHIPS_PER_PAGE > 0)? parseInt(count/SHIPS_PER_PAGE)+1:parseInt(count/SHIPS_PER_PAGE)   
  },
  SET_CURRENT_PAGE (state, page) {
    state.currentPage = page
  },
  SET_NEXT_PAGE_URL (state, url) {
    state.nextPageUrl = url
  },
  SET_SHIP_NAMES (state, names) {
    state.shipNames = names
  },
  ADD_SHIPS (state, newShips) {
    newShips.forEach( item => {state.ships.push(item)})
  }, 
  ADD_FILM (state, newFilm) {
    state.films[newFilm.filmUrl] = {}
    state.films[newFilm.filmUrl].title = newFilm.title
    state.films[newFilm.filmUrl].episode = newFilm.episode
  },
  ADD_PILOT (state, newPilot) {
    state.pilots[newPilot.pilotUrl] = {}
    state.pilots[newPilot.pilotUrl].name = newPilot.name
  }
}

export const actions = {
  setShipsAll({commit}, count) {
    commit('SET_SHIPS_ALL', count)
  },
  setPagesAll({commit}, count) {
    commit('SET_PAGES_ALL', count)
  },
  setNextPage({commit}, url) {
    commit('SET_NEXT_PAGE_URL', url)
  },
  addShips({commit}, ships) {
    commit('ADD_SHIPS', ships)
  },
  decrementPage({commit, state}) {
    if (state.currentPage < 1 ) throw new Error('Could not decrement page less then 1')
    commit('SET_CURRENT_PAGE', state.currentPage-1)  
  },
  fillShipNamesArray({commit, state}) {
    let namesArr = []

    state.ships.forEach( ship => {
      namesArr.push({
        name: ship.name,
        url: ship.url
      })
    })
    commit('SET_SHIP_NAMES', namesArr)
  },

  
  async incrementPage({dispatch, commit, state}) {
    if( (state.currentPage+1)*SHIPS_PER_PAGE >= state.ships.length) {
      await dispatch('getNextPageData')
    }  
    commit('SET_CURRENT_PAGE', state.currentPage+1)
  },
  async setShipNames({dispatch, commit, state}) {
    if(state.shipNames.length === +state.shipsAll) return

    await dispatch('fillShipsArray')
    dispatch('fillShipNamesArray')
  },
  async fillShipsArray({dispatch, state}) {
    do {
      await dispatch('getNextPageData')
    } 
    while (state.nextPageUrl !== null)
  },
  async getNextPageData({dispatch, commit, state}) {
    try {
      const res = await this.$axios(state.nextPageUrl)

      dispatch('addShips', res.data.results)
      dispatch('setNextPage', res.data.next)
    }
    catch(err) {
      throw err
    }
  },
  async setShipFilms({dispatch, commit, state}, films) {
    let promises = []

    films.forEach( film => {
      if( !(film in state.films) ){
        promises.push( dispatch('setNewFilm', film))
      }
    })
    await Promise.all(promises)      
  },
  async setNewFilm({dispatch, commit, state}, filmUrl) {
    const resp = await this.$axios(filmUrl)
    
    commit('ADD_FILM', {
      filmUrl: filmUrl,
      title: resp.data.title,
      episode: resp.data.episode_id
    })
  },
  async setShipPilots({dispatch, commit, state}, pilots) {
    let promises = []

    pilots.forEach( pilot => {
      if( !(pilot in state.pilots) ){
        promises.push( dispatch('setNewPilot', pilot))
      }
    })
    await Promise.all(promises)      
  },
  async setNewPilot({dispatch, commit, state}, pilotUrl) {
    const resp = await this.$axios(pilotUrl)
    
    commit('ADD_PILOT', {
      pilotUrl: pilotUrl,
      name: resp.data.name
    })
  }
}
