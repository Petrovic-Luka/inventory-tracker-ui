import React, { useState, useEffect } from "react";
import style from "./CreateEquipmentPage.module.css";
import { fetchData } from "../../functions";
import Menu from "../../components/Menu";
import ErrorMessage from "../../components/ErrorMessage";
import ComboBox from "../../components/ComboBox";
const CreateEquipmentPage = () => {
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [inventoryMark, setInventoryMark] = useState("");
  const [serialMark, setSerialMark] = useState("");
  const [equipmentTypeId, setEquipmentTypeId] = useState(1);

  const loadingFailed = false;

  useEffect(() => {
    async function fetchData2() {
      try {
        const postsData = await fetchData(
          "https://localhost:7274/EquipmentType"
        );
        setEquipmentTypes(postsData);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    }
    fetchData2();
  }, []);

  async function sendPost() {
    try {
      var temp = {
        description: description,
        inventoryMark: inventoryMark,
        serialMark: serialMark,
        equipmentTypeId: equipmentTypeId,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(temp),
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
  return (
    <div className={style.CreateEquipmentPage}>
      <Menu></Menu>
      <div className={style.Container}>
        <label for="description">Description</label>
        <input
          type="text"
          id="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
      </div>

      <div className={style.Container}>
        <label for="Note">Note</label>
        <input
          type="text"
          id="Note"
          onChange={(e) => {
            setNote(e.target.value);
          }}
        ></input>
      </div>

      <div className={style.Container}>
        <label for="Inventory Mark">Inventory Mark</label>
        <input
          type="text"
          id="Inventory Mark"
          onChange={(e) => {
            setInventoryMark(e.target.value);
          }}
        ></input>
      </div>

      <div className={style.Container}>
        <label for="Serial Mark">Serial Mark</label>
        <input
          type="text"
          id="Serial Mark"
          onChange={(e) => {
            setSerialMark(e.target.value);
          }}
        ></input>
      </div>
      <ComboBox
        setValue={setEquipmentTypeId}
        list={equipmentTypes}
        key={"equipmentTypeId"}
        value={"equipmentTypeId"}
        text={"name"}
      />

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
};

export default CreateEquipmentPage;
