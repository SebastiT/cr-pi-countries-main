import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Detail.module.css";

export const Detail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/countries/${id}`).then(({ data }) => {
      if (data.name) {
        setCountry(data);
      } else {
        window.alert("No hay ciudades con ese ID");
      }
    });
    return setCountry({});
  }, [id]);

  console.log(country.Activities);

  console.log(country);

  return (
    <div className={styles.detail}>
      <img src={country?.flag} alt="" />
      <h1>{country?.name}</h1>
      <h2>Continent: {country?.continent}</h2>
      <h2>Capital: {country?.capital}</h2>
      <h2>Area: {country?.area}</h2>
      <h2>Subregion: {country?.subregion}</h2>
      <h2>Population: {country?.population}</h2>
      {country?.Activities?.length ? (
        <div>
          <h2>Activities:</h2>
          <div className={styles.activitiesCont}>
            {country?.Activities?.map((activity) => {
              return (
                <div key={activity.name} className={styles.activity}>
                  <h3>{activity.name}</h3>
                  <h4>Season: {activity.season}</h4>
                  <h4>Difficulty: {activity.difficulty}</h4>
                  <h4>Duration: {activity.duration} hours</h4>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h2>No activities available</h2>
      )}
      
    </div>
  );
};
