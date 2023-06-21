import { useDispatch } from "react-redux";
import { useState } from "react";
import { store } from "../../redux/store";
import { validate } from "./validate";
import { useNavigate } from "react-router-dom";
import { postActivity } from "../../redux/actions";
import styles from "./Form.module.css";

export const Form = () => {
  const dispatch = useDispatch();
  const allCountries = store.getState().allCountries;
  const navigate = useNavigate();

  const [activity, setActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countriesId: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countriesId: "",
  });

  const handleChange = (event) => {
    setActivity({
      ...activity,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...activity,
        [event.target.name]: event.target.value,
      })
    );
  };
  console.log(errors);

  function handleSelectCountries(e) {
    console.log(e.target.value);
    if (!activity.countriesId.includes(e.target.value)) {
      setActivity({
        ...activity,
        countriesId: [...activity.countriesId, e.target.value],
      });
    }
    setErrors(
      validate({
        ...activity,
        countriesId: [...activity.countriesId, e.target.value],
      })
    );
  }

  function handleDelete(id) {
    const newInput = {
      ...activity,
      countriesId: activity.countriesId.filter((country) => country !== id), //en el
    };
    setActivity(newInput);
    setErrors(validate(newInput));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(Object.values(errors).length);
    if (Object.values(errors).length) {
      alert("Please enter the data correctly");
    } else {
      alert("Activity Created");
      dispatch(postActivity(activity));
      navigate("/home");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="text"
            name="name"
            value={activity.name}
            onChange={(event) => {
              handleChange(event);
            }}
            required
            className={styles.input}
          ></input>
          <label className={styles.label}>Name: </label>
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div className={styles.group}>
          <select
            name="difficulty"
            value={activity.difficulty}
            onChange={(event) => {
              handleChange(event);
            }}
            required
            className={styles.input}
          >
            <option value={undefined} hidden></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label className={styles.label}>Difficulty: </label>
          {errors.difficulty && <p>{errors.difficulty}</p>}
        </div>

        <div className={styles.group}>
          <input
            type="number"
            name="duration"
            value={activity.duration}
            onChange={(event) => {
              handleChange(event);
            }}
            required
            className={styles.input}
          ></input>
          <label className={styles.label}>Duration in Hours: </label>
          {errors.duration && <p>{errors.duration}</p>}
        </div>

        <div className={styles.group}>
          <select
            name="season"
            value={activity.season}
            onChange={(event) => {
              handleChange(event);
            }}
            className={styles.input}
            required
          >
            <option value={undefined} hidden></option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
          </select>
          <label className={styles.label}>Season: </label>
          {errors.season && <p>{errors.season}</p>}
        </div>

        <div className={styles.group}>
          <select
            name="countriesId"
            value=""
            onChange={(event) => {
              handleSelectCountries(event);
            }}
            className={styles.input}
            required
          >
            <option value={undefined}>Select one or more countries</option>
            {allCountries
              .filter((country) => !activity.countriesId.includes(country.id)) //filtro por todo lo que no sea ese elemento
              .sort((a, b) => a.name.localeCompare(b.name)) //ordeno alfabeticamente
              .map(
                (
                  country //muestro los paises
                ) => {
                  return (
                    <option value={country.id} key={country.id}>
                      {country.name}
                    </option> //value es el id del pais
                  );
                }
              )}
          </select>
          <label className={styles.label}>Countries: </label>
          {errors.countriesId && <p>{errors.countriesId}</p>}
        </div>
        <div className={styles.contCountry}>
          {activity.countriesId.map((country) => (
            // eslint-disable-next-line react/jsx-key
            <div className={styles.countryName}>
              {allCountries.find((c) => c.id === country).name}
              <button
                type="button"
                key={country}
                onClick={() => handleDelete(country)}
                className={styles.close}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <div>
          <button className={styles.submit} type="Submit">
            Create Activity
          </button>
        </div>
      </form>
    </div>
  );
};
