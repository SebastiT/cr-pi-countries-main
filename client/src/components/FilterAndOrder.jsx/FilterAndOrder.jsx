import { useDispatch } from "react-redux";
import {
  orderByAlphabet,
  orderByPopulation,
  filterByContinent,
  filterByActivities,
  getCountries,
  getCountriesByName,
} from "../../redux/actions";
import { useState, useRef } from "react";
import styles from "./FilterSort.module.css";

export const FilterAndOrder = ({
  setOrder,
  setFirstPage,
  continents,
  activities,
}) => {
  const dispatch = useDispatch();

  const populationRef = useRef(null);
  const alphabetRef = useRef(null);
  const continentRef = useRef(null);
  const activitiesRef = useRef(null);

  const handleOrder = (event) => {
    event.preventDefault();
    setFirstPage(1);

    if (event.target.name === "population") {
      dispatch(orderByPopulation(event.target.value));
      alphabetRef.current.value = "all";
      setFirstPage(1);
      setOrder(event.target.value + event.target.name);
    }
    if (event.target.name === "alphabet") {
      dispatch(orderByAlphabet(event.target.value));
      populationRef.current.value = "all";
      setFirstPage(1);

      setOrder(event.target.value + event.target.name);
    }
    setName("");
  };

  const handleFilter = (event) => {
    event.preventDefault();
    setFirstPage(1);

    if (event.target.name === "continents") {
      dispatch(filterByContinent(event.target.value));
      activitiesRef.current.value = "";

      setOrder(event.target.value);
    }

    if (event.target.name === "activities") {
      dispatch(filterByActivities(event.target.value));
      continentRef.current.value = "";
      setOrder(event.target.value);
    }
    setName("");
  };

  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onSearch = (name) => {
    setFirstPage(1);

    dispatch(getCountriesByName(name)).then(() => {
      setOrder(name);
    });
    continentRef.current.value = "";
    activitiesRef.current.value = "";
    alphabetRef.current.value = "all";
    populationRef.current.value = "all";
  };

  const clearFilter = () => {
    setFirstPage(1);

    continentRef.current.value = "";
    activitiesRef.current.value = "";
    alphabetRef.current.value = "all";
    populationRef.current.value = "all";
    dispatch(getCountries()).then(() => {
      setOrder("Filter cleared");
    });
  };

  return (
    <div className={styles.component}>
      <label>
        <input
          placeholder="Search by name..."
          type="search"
          onChange={handleChange}
          value={name}
        />
        <button
          onClick={() => {
            onSearch(name);
          }}
          className={styles.button}
        >
          Search
        </button>
      </label>

      <label>
        <h4>Sort by: </h4>
        <select
          name="population"
          onChange={(e) => {
            handleOrder(e);
          }}
          ref={populationRef}
        >
          <option value="all" hidden>
            Population
          </option>
          <option value="ascendente">ascendente</option>
          <option value="descendente">descendente</option>
        </select>
        <select
          name="alphabet"
          onChange={(e) => {
            handleOrder(e);
          }}
          ref={alphabetRef}
        >
          <option value="all" hidden>
            Alphabet
          </option>
          <option value="ascendente">A-Z</option>
          <option value="descendente">Z-A</option>
        </select>
      </label>

      <label>
        <h4>Filter by:</h4>

        <select
          name="continents"
          onChange={(event) => {
            handleFilter(event);
          }}
          ref={continentRef}
        >
          <option value="" hidden>
            Continents
          </option>
          <option value="all">All</option>
          {continents.map((continent) => {
            return (
              <option value={continent} key={continent}>
                {continent}
              </option>
            );
          })}
        </select>

        <select
          name="activities"
          onChange={(event) => {
            handleFilter(event);
          }}
          ref={activitiesRef}
        >
          <option value="" hidden>
            Activities
          </option>
          <option value="all">All</option>
          {activities.map((activity) => (
            <option value={activity} key={activity}>
              {activity}
            </option>
          ))}
        </select>
      </label>

      <label>
        <button onClick={clearFilter}>Clear Filter</button>
      </label>
    </div>
  );
};
