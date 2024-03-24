import { useState, useEffect, React } from "react";
import style from "./HomePage.module.css";
import { fetchData } from "../../functions";
import Menu from "../../components/Menu";
const HomePage = () => {
  const [data, setData] = useState([]);
  fetchData("https://localhost:7274/ClassRoom", setData);
  return (
    <div>
      <Menu></Menu>
      {/* <ul>
        {data.map((classRoom) => (
          <div>
            <li>{classRoom.classRoomId}</li>
            <li>{classRoom.name}</li>
          </div>
        ))}
      </ul> */}
    </div>
  );
};

export default HomePage;
