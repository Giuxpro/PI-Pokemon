const initialState = {
  pokemons: [],
  backUpPoke: [],
  types: [],
  detail: [],
}


function rootReducer(state = initialState, action){
  switch(action.type){
    case "GET_POKE":
      return{
        ...state,
        pokemons: action.payload,
        backUpPoke: action.payload,
      }
    case "GET_TYPES":
      
      return{
        ...state,
        types: action.payload,
      }
    case "POKE_BY_TYPES":
      const allPokes = state.backUpPoke;
      const filterPokeByTypes = action.payload === "Type"? allPokes : allPokes.filter( e => e.types.map(e => e.name).includes(action.payload))

      return{
        ...state,
        pokemons: filterPokeByTypes,
      }
    case "SORT_DB_API":
      const allSortPoke = state.backUpPoke;
      const SortDbApi = action.payload === "all"? allSortPoke : action.payload === "db"? allSortPoke.filter( e => e.createInDb) : allSortPoke.filter(e => !e.createInDb)
      return{
        ...state,
        pokemons: SortDbApi,
      }
    
    case "SEARCH":
      return{
        ...state,
        pokemons: action.payload,
      }
    case "POKE_ID":
      return{
        ...state,
        detail:action.payload,
      }
    case "CLEAN_DETAIL":
      return{
        ...state,
        detail:[]
      }
  
    case "POST_POKE":
      return{
        ...state
      }
      
    case "SORT_BY_STRENGTH":
      const allSortStrength = action.payload === "hight"
      ? state.pokemons.sort((a,b)=>{
          
          if(a.attack > b.attack){
              return -1;
          }
          if(a.attack < b.attack){
              return 1;
          }
          return 0;

      }): state.pokemons.sort((a,b)=>{

          if(a.attack > b.attack){
              return 1;
          }
          if(a.attack < b.attack){
              return -1;
          }
          return 0;
      })
      
      return{
        ...state,
        pokemons: allSortStrength,
      }

    case "SORT_ALPHA":
      const allSortAlpha = action.payload === "des"
      ? state.pokemons.sort((a,b)=>{
          
          if(a.name.toLowerCase() > b.name.toLowerCase()){
              return -1;
          }
          if(a.name.toLowerCase() < b.name.toLowerCase()){
              return 1;
          }
          return 0;

      }): state.pokemons.sort((a,b)=>{

          if(a.name.toLowerCase() > b.name.toLowerCase()){
              return 1;
          }
          if(a.name.toLowerCase() < b.name.toLowerCase()){
              return -1;
          }
          return 0;
      })
      return{
        ...state,
        pokemons: allSortAlpha,
      }

      default: return state;
  }
}

export default rootReducer