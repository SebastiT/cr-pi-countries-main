import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Landing } from "./components/Landing/Landing";
import { Home } from "./components/Home/Home";
import { Detail } from "./components/Detail/Detail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountries } from "./redux/actions";
import { Form } from "./components/Form/Form";
import { Nav } from "./components/Nav/Nav";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
