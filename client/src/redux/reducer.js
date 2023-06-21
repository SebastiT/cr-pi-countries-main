import { GET_COUNTRIES,ORDER_BY_ALPHABET,ORDER_BY_POPULATION, FILTER_BY_CONTINENT,POST_ACTIVITY, FILTER_BY_ACTIVITIES, GET_ACTIVITIES, GET_COUNTRIES_BY_NAME } from "./actions-types";


const initialState = {
  allCountries: [],
  countries: [],
  activities: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        countries: action.payload
      };
    
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    
    case GET_COUNTRIES_BY_NAME:
      return {
        ...state,
        countries:action.payload
      }
    
    case ORDER_BY_POPULATION:
      return {
        ...state,
        countries:
          action.payload === "ascendente"
            ? state.countries.sort((a, b) => a.population - b.population)
            : state.countries.sort((a, b) => b.population - a.population),
        allCountries:
          action.payload === "ascendente"
            ? state.allCountries.sort((a, b) => a.population - b.population)
            : state.allCountries.sort((a, b) => b.population - a.population),
      };
    
    case ORDER_BY_ALPHABET:
      return {
        ...state,
        countries:
          action.payload === "ascendente"
            ? state.countries.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                  return -1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return 1;
                }
                return 0;
              })
            : state.countries.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                  return 1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return -1;
                }
                return 0;
              }),
        allCountriesountries:
          action.payload === "ascendente"
            ? state.allCountries.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                  return -1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return 1;
                }
                return 0;
              })
            : state.allCountries.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                  return 1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return -1;
                }
                return 0;
              }),
      };
    
    case FILTER_BY_CONTINENT:
      return {
        ...state,
        countries:
          action.payload === "all"
            ? state.allCountries
            : state.allCountries.filter(country => {
              return country.continent === action.payload
            })
      }
    
    
    case FILTER_BY_ACTIVITIES:
      return {
        ...state,
        countries:
          action.payload === "all"
            ? state.allCountries
            : state.allCountries.filter((country) => {
              return country.Activities?.find((activity) => {
                  return activity.name === action.payload
                });
              }),
      };
    
    case POST_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload]
      }
    
      
      
    
  
    default:
      return {...state};
  }
}

export default rootReducer;