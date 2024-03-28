import React, { useState, useEffect } from "react";
import style from "./CreateBorrowPage.module.css";
import { fetchData } from "../../functions";
import Menu from "../../components/Menu";
import ComboBox from "../../components/ComboBox";
import ErrorMessage from "../../components/ErrorMessage";

const CreateBorrowPage = () => {
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [equipmentTypeId, setEquipmentTypeId] = useState(1);
  const [equipment, setEquipment] = useState([]);
  const [equipmentId, setEquipmentId] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);
  const [classRooms, setClassRooms] = useState([]);
  const [classRoomId, setClassRoomId] = useState([]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const postsData = await fetchData(
          "https://localhost:7274/EquipmentType"
        );
        setEquipmentTypes(postsData);
        const postsData2 = await fetchData("https://localhost:7274/Employee");
        setEmployees(postsData2);
        setEmployeeId(postsData2[0].employeeId);
        const postsData3 = await fetchData("https://localhost:7274/ClassRoom");
        setClassRooms(postsData3);
        setClassRoomId(postsData3[0].classRoomId);
      } catch (err) {
        setEquipmentTypes([]);
        setEmployees([]);
        setClassRooms([]);
        console.log(err);
        alert(err);
        return;
      }
    };
    fetchData2();
  }, []);

  async function sendPost() {
    console.log("Equipment " + equipmentId);
    console.log("Employee " + employeeId);

    let temp = {
      employeeId: employeeId,
      equipmentId: equipmentId,
      classRoomId: classRoomId,
    };
    console.log(JSON.stringify(temp));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(temp),
    };
    const response = await fetch(
      "https://localhost:7274/Borrow",
      requestOptions
    );
    alert(response.status);
    if (response.status == 200) {
      LoadEquipment();
    }
  }

  async function LoadEquipment() {
    try {
      const result = await fetchData(
        "https://localhost:7274/Equipment/type?typeId=" +
          equipmentTypeId +
          "&available=true"
      );
      setEquipment(result);

      setEquipmentId(result[0].equipmentId);
    } catch (e) {
      alert("No awailable equipment found");
    }
  }
  try {
    return (
      <div className={style.CreateBorrowPage}>
        <Menu></Menu>

        <div className={style.Container}>
          <label>Equipment type</label>
          <ComboBox
            list={equipmentTypes}
            setValue={setEquipmentTypeId}
            key={"equipmentTypeId"}
            value={"equipmentTypeId"}
            text={"name"}
          />
        </div>

        <div className={style.Container}>
          <label>Employee</label>
          <ComboBox
            list={employees}
            setValue={setEmployeeId}
            key={"employeeId"}
            value={"employeeId"}
            text={"mailAddress"}
          />
        </div>

        <div className={style.Container}>
          <label>ClassRoom</label>
          <ComboBox
            list={classRooms}
            setValue={setClassRoomId}
            key={"classRoomId"}
            value={"classRoomId"}
            text={"name"}
          />
        </div>

        <div className={style.Container}>
          <input
            type="button"
            value="Load equipment"
            onClick={LoadEquipment}
          ></input>
          <label>Equipment</label>
          {/* <select
            onChange={(e) => {
              setEquipmentId(e.target.value);
            }}
          >
            {equipment.map((eq) => (
              <option key={eq.equipmentId} value={eq.equipmentId}>
                {eq.description} {eq.inventoryMark}
              </option>
            ))}
          </select> */}
          <ComboBox
            list={equipment}
            setValue={setClassRoomId}
            key={"equipmentId"}
            value={"equipmentId"}
            text={"displayString"}
          />
        </div>
        <button onClick={sendPost}>Create borrow </button>
      </div>
    );
  } catch (e) {
    console.error(e);
    return <ErrorMessage></ErrorMessage>;
  }
};

export default CreateBorrowPage;
