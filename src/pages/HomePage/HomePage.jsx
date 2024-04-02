import { useState, useEffect, React } from "react";
import style from "./HomePage.module.css";
import { fetchData } from "../../functions";
import Menu from "../../components/Menu";
const HomePage = () => {
  return (
    <div>
      <Menu></Menu>
    </div>
  );
};

export default HomePage;
