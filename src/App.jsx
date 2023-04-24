import React, { useState, useReducer } from "react";
import { ACTION_TYPES, initialState } from "./InitialState";
import reducer from "./Reducer";
import { v4 as uuid } from "uuid";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inpVal, setInpVal] = useState({
    name: "",
    surname: "",
    age: "",
    position: "",
    salary: "",
  });

  const handleChange = (e) => {
    setInpVal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateEmployee = (e) => {
    e.preventDefault();
    const { name, surname, age, position, salary } = inpVal;
    if (
      name.trim() &&
      surname.trim() &&
      age.trim() &&
      position.trim() &&
      salary.trim()
    ) {
      dispatch({
        type: ACTION_TYPES.CREATE_EMPLOYEE,
        payload: {
          ...inpVal,
          id: uuid(),
        },
      });
      setInpVal({ name: "", surname: "", age: "", position: "", salary: "" });
    }
  };

  const handleDeleteEmployee = (id) => {
    dispatch({ type: ACTION_TYPES.DELETE_EMPLOYEE, payload: id });
  };

  return (
    <div className=" w-full min-h-screen bg-teal-950 py-10 flex items-center flex-col gap-10">
      <form
        className="w-full px-10 grid grid-cols-3 gap-6"
        onSubmit={handleCreateEmployee}
      >
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={inpVal.name}
          onChange={handleChange}
          className=" border-2 border-gray-300 focus:border-red-500 transition-all outline-0 py-2 px-3 rounded-md"
        />
        <input
          type="text"
          placeholder="Surname"
          name="surname"
          value={inpVal.surname}
          onChange={handleChange}
          className=" border-2 border-gray-300 focus:border-red-500 transition-all outline-0 py-2 px-3 rounded-md"
        />
        <input
          type="number"
          placeholder="Age"
          name="age"
          value={inpVal.age}
          onChange={handleChange}
          className=" border-2 border-gray-300 focus:border-red-500 transition-all outline-0 py-2 px-3 rounded-md"
        />
        <input
          type="text"
          placeholder="Position"
          name="position"
          value={inpVal.position}
          onChange={handleChange}
          className=" border-2 border-gray-300 focus:border-red-500 transition-all outline-0 py-2 px-3 rounded-md"
        />
        <input
          type="number"
          placeholder="Salary"
          name="salary"
          value={inpVal.salary}
          onChange={handleChange}
          className=" border-2 border-gray-300 focus:border-red-500 transition-all outline-0 py-2 px-3 rounded-md"
        />
        <button
          type="submit"
          className=" bg-lime-600 text-white uppercase py-2 rounded-md"
        >
          Add
        </button>
      </form>
      <table className=" w-[800px] border-2 border-gray-400 text-white">
        <thead>
          <tr>
            <th className=" border-2 border-gray-400">Name</th>
            <th className=" border-2 border-gray-400">Surname</th>
            <th className=" border-2 border-gray-400">Age</th>
            <th className=" border-2 border-gray-400">Position</th>
            <th className=" border-2 border-gray-400">Salary</th>
            <th className=" border-2 border-gray-400">Delete Employee</th>
          </tr>
        </thead>
        <tbody>
          {state?.person?.map((item) => {
            return (
              <tr key={item.id} className=" h-[50px] text-center">
                <td className=" border-2 border-gray-400">{item.name}</td>
                <td className=" border-2 border-gray-400">{item.surname}</td>
                <td className=" border-2 border-gray-400">{item.age}</td>
                <td className=" border-2 border-gray-400">{item.position}</td>
                <td className=" border-2 border-gray-400">{item.salary}</td>
                <td className=" border-2 border-gray-400">
                  <button
                    className=" py-1 rounded-[5px] px-6 text-white bg-red-500"
                    onClick={() => handleDeleteEmployee(item?.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
