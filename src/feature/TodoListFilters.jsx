import React from "react";
import { useRecoilState } from "recoil";
import { todoListFilterState } from "./state";

export default function TodoListFIlters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);
  function updateFilter(e) {
    setFilter(e.target.value);
  }
  return (
    <div className="filter">
      <span>filter:</span>
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </div>
  );
}
