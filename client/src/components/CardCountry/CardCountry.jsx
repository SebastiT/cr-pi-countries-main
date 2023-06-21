import { Link } from "react-router-dom";
import styles from "./CardCountry.module.css";

export const CardCountry = ({ id, name, flag, continent }) => {
  return (
    <Link to={`/detail/${id}`}>
    <div key={id} className={styles.card}>
      <div className={styles.imgContainer}>
        <img src={flag} alt={`${name}`} className={styles.image} />
      </div>
      <div className={styles.text}>
        <div>
          <h3>{name}</h3>
          <h4>{continent}</h4>
        </div>
      </div>
    </div>
    </Link>
  );
};
