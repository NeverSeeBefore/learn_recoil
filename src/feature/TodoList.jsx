import React from "react";
import { useRecoilValue,  } from "recoil";
import { filteredTodoListState, } from "./state";
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
import TodoListFilters from "./TodoListFilters";
import TodoListStats from "./TodoListStats";
import styles from "./style.css";
console.log(styles);

export default function TodoList() {
  //   const todoList = useRecoilValue(todoListState);
  const todoList = useRecoilValue(filteredTodoListState);
  return (
    <div className="todoList">
      <div className="left">
        <TodoListFilters />
        <TodoItemCreator />
        {todoList.map((item) => (
          <TodoItem key={item.id} item={item}></TodoItem>
        ))}
      </div>
      <div className="right">
        <TodoListStats />
      </div>
    </div>
  );
}
