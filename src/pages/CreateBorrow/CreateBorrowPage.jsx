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
  const [equipmentId, setEquipmentId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [classRooms, setClassRooms] = useState([]);
  const [classRoomId, setClassRoomId] = useState("");
  const [connectionFailed, setConnectionFailed] = useState(false);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const [postsData, postsData2, postsData3] = await Promise.all([
          fetchData("https://localhost:7274/EquipmentType"),
          fetchData("https://localhost:7274/Employee"),
          fetchData("https://localhost:7274/ClassRoom"),
        ]);
        setEquipmentTypes(postsData);
        setEmployees(postsData2);
        setClassRooms(postsData3);
      } catch (err) {
        setEquipmentTypes([]);
        setEmployees([]);
        setClassRooms([]);
        console.log(err);
        setConnectionFailed(true);
        alert(err);
        return;
      }
    };
    fetchData2();
  }, []);

  async function sendPost() {
    if (equipmentId === "") {
      alert("Please select equipment");
      return;
    }
    try {
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
      alert(await response.text());
      if (response.status == 200) {
        LoadEquipment();
      }
    } catch (err) {
      alert(err.message);
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
      if (result.length > 0) {
        setEquipmentId(result[0].equipmentId);
      } else {
        alert("No equipment found ");
      }
    } catch (e) {
      alert(e.message);
    }
  }
  if (connectionFailed) {
    return <ErrorMessage></ErrorMessage>;
  }
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
        <ComboBox
          list={equipment}
          setValue={setEquipmentId}
          key={"equipmentId"}
          value={"equipmentId"}
          text={"displayString"}
        />
      </div>
      <div className={style.Container}>
        <input type="button" onClick={sendPost} value="Create borrow"></input>
      </div>
    </div>
  );
};

export default CreateBorrowPage;
