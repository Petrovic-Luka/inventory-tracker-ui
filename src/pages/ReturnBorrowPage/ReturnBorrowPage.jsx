import React, { useState, useEffect } from "react";
import style from "./ReturnBorrowPage.module.css";
import { fetchData } from "../../functions";
import Menu from "../../components/Menu";
import ComboBox from "../../components/ComboBox";
import ErrorMessage from "../../components/ErrorMessage";

const ReturnBorrowPage = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [borrows, setBorrows] = useState([]);
  const [equipmentId, setEquipmentId] = useState("");
  const [connectionFailed, setConnectionFailed] = useState(false);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const postsData2 = await fetchData("https://localhost:7274/Employee");
        setEmployees(postsData2);
        try {
          setEmployeeId(postsData2[0].employeeId);
        } catch {
          alert("No employees found");
          return;
        }
      } catch (err) {
        console.log(err);
        setConnectionFailed(true);
        alert(err);
        return;
      }
    };
    fetchData2();
  }, []);

  async function LoadBorrows() {
    try {
      const result = await fetchData(
        "https://localhost:7274/Borrow/Employee?id=" +
          employeeId +
          "&active=true"
      );
      setBorrows(result);
      console.log(result);

      setEquipmentId(result[0].equipmentId);
    } catch {
      setBorrows([]);
      alert("No borrows found");
    }
  }

  async function sendPut() {
    console.log("Equipment " + equipmentId);
    console.log("Employee " + employeeId);
    if (equipmentId === "") {
      alert("Please select equipment");
      return;
    }
    let temp = {
      employeeId: employeeId,
      equipmentId: equipmentId,
    };
    console.log(JSON.stringify(temp));
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(temp),
    };
    const response = await fetch(
      "https://localhost:7274/Borrow/Return",
      requestOptions
    );
    alert(await response.text());
    LoadBorrows();
  }

  if (connectionFailed) {
    return <ErrorMessage></ErrorMessage>;
  }
  return (
    <div className={style.ReturnBorrowPage}>
      <Menu> </Menu>
      <div className={style.Container}>
        <label>Employee</label>
        <ComboBox
          list={employees}
          key={"employeeId"}
          value={"employeeId"}
          text={"mailAddress"}
          setValue={setEmployeeId}
        />
      </div>
      <div className={style.Container}>
        <input
          type="button"
          value="Load equipment"
          onClick={LoadBorrows}
        ></input>
        <label>Borrows</label>
        <ComboBox
          list={borrows}
          key={"startDate"}
          value={"equipmentId"}
          text={"displayString"}
          setValue={setEquipmentId}
        />
      </div>

      <div className={style.Container}>
        <input type="button" value="Return equipment" onClick={sendPut}></input>
      </div>
    </div>
  );
};

export default ReturnBorrowPage;
