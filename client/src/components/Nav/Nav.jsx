import styles from "./Nav.module.css";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <ul className={styles.nav}>
      <li className={styles.active}>
        <Link to="/Home">Home</Link>
      </li>
      <li className={styles.form}>
        <Link to="/form">Create a new Activity</Link>
      </li>
    </ul>
  );
};
