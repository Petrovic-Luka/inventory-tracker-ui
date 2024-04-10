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
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [error, setError] = useState(false);

  const loadingFailed = false;

  useEffect(() => {
    async function fetchData2() {
      try {
        const postsData = await fetchData(
          "https://localhost:7274/EquipmentType"
        );
        setEquipmentTypes(postsData);
      } catch (err) {
        console.log(err);
        setConnectionFailed(true);
        alert(err);
      }
    }

    fetchData2();
  }, []);

  async function sendPost() {
    try {
      if (!validateData()) {
        alert("Data not valid");
        return;
      }
      var temp = {
        description: description,
        note: note,
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
      alert(await response.text());
      if (response.ok) {
        window.location.reload();
      }
    } catch (err) {
      alert(err.message);
    }
  }

  function validateData() {
    if (
      description === "" ||
      inventoryMark.length !== 10 ||
      serialMark.length !== 10
    ) {
      setError(true);
      return false;
    }
    return true;
  }

  if (connectionFailed) {
    return <ErrorMessage></ErrorMessage>;
  }
  return (
    <div className={style.CreateEquipmentPage}>
      <Menu></Menu>
      <div className={style.Container}>
        <label for="description">Description</label>
        <input
          type="text"
          id="description"
          className={`${description === "" && error ? style.errorClass : ""}`}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <p
          className={`${
            description === "" && error ? style.errorTextClass : style.invis
          }`}
        >
          This field can't be empty
        </p>
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
          className={`${
            inventoryMark.length !== 10 && error ? style.errorClass : ""
          }`}
          onChange={(e) => {
            setInventoryMark(e.target.value);
          }}
        ></input>
        <p
          className={`${
            inventoryMark.length !== 10 && error
              ? style.errorTextClass
              : style.invis
          }`}
        >
          This field must be 10 characters long
        </p>
      </div>

      <div className={style.Container}>
        <label for="Serial Mark">Serial Mark</label>
        <input
          type="text"
          id="Serial Mark"
          className={`${
            serialMark.length !== 10 && error ? style.errorClass : ""
          }`}
          onChange={(e) => {
            setSerialMark(e.target.value);
          }}
        ></input>
        <p
          className={`${
            serialMark.length !== 10 && error
              ? style.errorTextClass
              : style.invis
          }`}
        >
          This field must be 10 characters long
        </p>
      </div>
      <div className={style.Container}>
        <ComboBox
          setValue={setEquipmentTypeId}
          list={equipmentTypes}
          key={"equipmentTypeId"}
          value={"equipmentTypeId"}
          text={"name"}
        />
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
};

export default CreateEquipmentPage;
