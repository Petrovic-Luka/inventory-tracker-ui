import { useState, useEffect, React } from "react";
import style from "./HomePage.module.css";
const HomePage = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("https://localhost:7274/ClassRoom");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
  return (
    <div>
      <ul>
        {data.map((classRoom) => (
          <li>
            {classRoom.classRoomId}
            {classRoom.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
