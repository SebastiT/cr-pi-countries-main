import { store } from "../../redux/store";
import { useState, useEffect } from "react";
import { CardCountry } from "../CardCountry/CardCountry";
import { useDispatch } from "react-redux";
import { getCountries, getActivities } from "../../redux/actions";
import { FilterAndOrder } from "../FilterAndOrder.jsx/FilterAndOrder";
import { NavLink } from "react-router-dom";
import styles from "./Home.module.css";
const maxPage = 10;

export const Home = () => {
  const activitiesState = store.getState().activities;
  const countriesState = store.getState().countries;
  const allCountriesState = store.getState().allCountries;
  const [input, setInput] = useState(1)

  // console.log(activitiesState);

  const continents = [];
  const activities = [];

  allCountriesState.forEach((country) => {
    if (!continents.includes(country.continent)) {
      continents.push(country.continent);
    }
  });

  activitiesState.forEach((activity) => {
    activities.push(activity.name);
  });

  // console.log(continents);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState(false);

  useEffect(() => {
    dispatch(getCountries()).then(() => {
      dispatch(getActivities()).then(() => {
        setLoading(false);
      });
    });
  }, [dispatch, allCountriesState]);

  //console.log(countries);

  // console.log(allCountriesState);
  const [firstPage, setFirstPage] = useState(1);

  let page = countriesState.slice(
    (firstPage - 1) * maxPage,
    (firstPage - 1) * maxPage + maxPage
  );

  const maximo = Math.ceil(countriesState.length / maxPage);
  // console.log((firstPage - 1) * maxPage);

  const nextPage = () => {
    setInput(firstPage+1)
    setFirstPage(firstPage + 1);
  };

  const prevPage = () => {
    setInput(firstPage-1)
    setFirstPage(firstPage - 1);
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      if (parseInt(event.target.value) < 1 || isNaN(parseInt(event.target.value))) {
        setInput(1)
        setFirstPage(1)
        return
      } 
      if (parseInt(event.target.value) > maximo) {
        setInput(maximo);
        setFirstPage(maximo)
        return
      }
      setInput(parseInt(event.target.value))
      setFirstPage(parseInt(event.target.value));
    }
  }

  const onChange = (event) => {
    setInput(event.target.value)
  }

  if (loading) {
    return (
      <div>
        <h1>cargando</h1>
      </div>
    );
  }

  return (
    <div className={styles.home}>
      <FilterAndOrder
        setOrder={setOrder}
        setFirstPage={setFirstPage}
        continents={continents}
        activities={activities}
      />
      <div className={styles.cards}>
        {page.map(({ id, name, flag, continent }) => {
          return (
            <CardCountry
              id={id}
              name={name}
              flag={flag}
              continent={continent}
              key={id}
            />
          );
        })}
      </div>
      <b></b>
      <div className={styles.nextprev}>
        {firstPage > 1 && <button onClick={prevPage}>prev</button>}
        <p>
          <input name="page" autoComplete="off" value={input} onChange={onChange} onKeyDown={onKeyDown} /> of {maximo}
        </p>
        {firstPage < maximo && <button onClick={nextPage}>next</button>}
      </div>
    </div>
  );
};
