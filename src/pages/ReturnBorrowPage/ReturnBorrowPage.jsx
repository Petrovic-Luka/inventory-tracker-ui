import React, { useState, useEffect } from "react";
import style from "./ReturnBorrowPage.module.css";
import { fetchData } from "../../functions";
import Menu from "../../components/Menu";
const ReturnBorrowPage = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [equipmentId, setEquipmentId] = useState([]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const postsData2 = await fetchData("https://localhost:7274/Employee");
        setEmployees(postsData2);
        setEmployeeId(postsData2[0].employeeId);
      } catch (err) {}
    };
    fetchData2();
  }, []);

  async function LoadBorrows() {
    const result = await fetchData(
      "https://localhost:7274/Borrow/Employee?id=" + employeeId + "&active=true"
    );
    setBorrows(result);
    console.log(result);
    try {
      setEquipmentId(result[0].equipmentId);
    } catch {
      alert("No borrows found");
    }
  }

  async function sendPut() {
    console.log("Equipment " + equipmentId);
    console.log("Employee " + employeeId);

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
    alert(response.status);
    LoadBorrows();
  }

  return (
    <div className={style.ReturnBorrowPage}>
      <Menu> </Menu>
      <div className={style.Container}>
        <label>Employee</label>
        <select
          onChange={(e) => {
            setEmployeeId(e.target.value);
          }}
        >
          {employees.map((employee) => (
            <option key={employee.employeeId} value={employee.employeeId}>
              {employee.mailAddress}
            </option>
          ))}
        </select>
      </div>
      <div className={style.Container}>
        <input
          type="button"
          value="Load equipment"
          onClick={LoadBorrows}
        ></input>
        <label>Borrows</label>
        <select
          onChange={(e) => {
            setEquipmentId(e.target.value);
          }}
        >
          {borrows
            ? borrows.map((eq) => (
                <option
                  key={eq.employeeId + eq.equipmentId}
                  value={eq.displayString}
                >
                  {eq.displayString}
                </option>
              ))
            : null}
        </select>
      </div>

      <div className={style.Container}>
        <input type="button" value="Return equipment" onClick={sendPut}></input>
      </div>
    </div>
  );
};

export default ReturnBorrowPage;
