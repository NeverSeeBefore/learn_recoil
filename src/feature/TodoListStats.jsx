import React from "react";
import { useRecoilValue } from "recoil";
import { todoListStatsState } from "./state";

export default function TodoListStats() {
  const todoListStats = useRecoilValue(todoListStatsState);
  const formattedPercentCompleted = Math.round(todoListStats.persentCompleted);
  return (
    <ul>
      <li>total num: {todoListStats.totalNum}</li>
      <li>total completed num: {todoListStats.totalCompletedNum}</li>
      <li>total uncompleted num: {todoListStats.totalUncompletedNum}</li>
      <li>persend completed: {formattedPercentCompleted}%</li>
    </ul>
  );
}
