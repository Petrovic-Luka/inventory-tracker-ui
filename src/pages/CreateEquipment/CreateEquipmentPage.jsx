import React, { useState, useEffect } from "react";
import style from "./CreateEquipmentPage.module.css";
import { fetchData } from "../../functions";
import Menu from "../../components/Menu";
import ErrorMessage from "../../components/ErrorMessage";
const CreateEquipmentPage = () => {
  const [equipment, setEquipment] = useState({
    Description: "",
    Description: "",
    InventoryMark: "",
    SerialMark: "",
    equipmentTypeId: -1,
  });
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const loadingFailed = false;

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const postsData = await fetchData(
          "https://localhost:7274/EquipmentType"
        );
        setEquipmentTypes(postsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData2();
  }, []);

  async function sendPost() {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(equipment),
      };
      const response = await fetch(
        "https://localhost:7274/Equipment",
        requestOptions
      );
      alert(response.status);
    } catch (err) {
      alert(err.message);
    }
  }
  try {
    return (
      <div className={style.CreateEquipmentPage}>
        <Menu></Menu>
        <div className={style.Container}>
          <label for="description">Description</label>
          <input
            type="text"
            id="description"
            onChange={(e) => {
              setEquipment({ ...equipment, Description: e.target.value });
              console.log(equipment);
            }}
          ></input>
        </div>

        <div className={style.Container}>
          <label for="Note">Note</label>
          <input
            type="text"
            id="Note"
            onChange={(e) => {
              setEquipment({ ...equipment, Note: e.target.value });
              console.log(equipment);
            }}
          ></input>
        </div>

        <div className={style.Container}>
          <label for="Inventory Mark">Inventory Mark</label>
          <input
            type="text"
            id="Inventory Mark"
            onChange={(e) => {
              setEquipment({ ...equipment, InventoryMark: e.target.value });
              console.log(equipment);
            }}
          ></input>
        </div>

        <div className={style.Container}>
          <label for="Serial Mark">Serial Mark</label>
          <input
            type="text"
            id="Serial Mark"
            onChange={(e) => {
              setEquipment({ ...equipment, SerialMark: e.target.value });
              console.log(equipment);
            }}
          ></input>
        </div>

        <div className={style.Container}>
          <label for="Serial Mark">Equipment type</label>
          <select
            onChange={(e) => {
              setEquipment({ ...equipment, equipmentTypeId: e.target.value });
              console.log(equipment);
            }}
          >
            {equipmentTypes.map((classRoom) => (
              <option
                key={classRoom.equipmentTypeId}
                value={classRoom.equipmentTypeId}
              >
                {classRoom.name}
              </option>
            ))}
          </select>
        </div>

        <div className={style.Container}>
          <input
            value="Add equipment"
            type="button"
            id="Create"
            onClick={(e) => {
              sendPost();
            }}
          ></input>
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
    return <ErrorMessage></ErrorMessage>;
  }
};

export default CreateEquipmentPage;
