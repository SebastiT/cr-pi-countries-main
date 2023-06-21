import { GET_COUNTRIES, ORDER_BY_ALPHABET, ORDER_BY_POPULATION,FILTER_BY_CONTINENT,POST_ACTIVITY, FILTER_BY_ACTIVITIES, GET_ACTIVITIES,GET_COUNTRIES_BY_NAME } from "./actions-types";
import axios from "axios";

export const getCountries = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/countries")
      return dispatch({
        type: GET_COUNTRIES,
        payload: response.data,
      });
    }; 
};

export const getActivities = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/activities");
    return dispatch({
      type: GET_ACTIVITIES,
      payload: response.data
    })
  }
}

export const getCountriesByName = (name) => {
  return async (dispatch) => {
    try {
      
      const response = await axios.get(
        `http://localhost:3001/countries/name?name=${name}`
      );
      return dispatch({
        type: GET_COUNTRIES_BY_NAME,
        payload: response.data
      })
    } catch (error) {
      alert("Countries not found.");
    }
  }
}

export const orderByAlphabet = (order) => {
  return {
    type: ORDER_BY_ALPHABET,
    payload: order
  }
}

export const orderByPopulation = (order) => {
  return {
    type: ORDER_BY_POPULATION,
    payload: order,
  };
};

export const filterByContinent = (continent) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload: continent
  }
}

export const filterByActivities = (activity) => {
  getCountries()
  return {
    type: FILTER_BY_ACTIVITIES,
    payload: activity
  }
}


export const postActivity = (activity) => { 
  return async (dispatch) => {
    await axios.post("http://localhost:3001/activities", activity);
    dispatch({
      type: POST_ACTIVITY,
      payload: activity
    })
  }
}