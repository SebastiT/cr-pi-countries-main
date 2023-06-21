import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { getCountries } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { store } from "../../redux/store";
import styles from "./Landing.module.css";

// eslint-disable-next-line react/prop-types
export const Landing = () => {
  const ciudades = store.getState().allCountries;
  console.log(ciudades);

  return (
    <div className={styles.landing}>
      <div className={styles.blur}>
        <div className={styles.text}>
          <h1>Welcome to my PI</h1>
          <h3>by Sebastian Tovar</h3>
          <p>
            On this proyect, you will be able to explore and search for
            information about the countries of the world, including data such as
            their population, continent, subregion, and other relevant details.
            You will also have access to a list of tourist activities available
            in each country and the possibility to create new activities.
          </p>
        </div>
          <NavLink to="/home">
            <button>Enter Here</button>
          </NavLink>
      </div>
    </div>
  );
};
