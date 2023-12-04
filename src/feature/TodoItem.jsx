import React from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "./state";

export default function TodoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);
  function editItemText(e) {
    setTodoList(
      replaceItemAdIndex(todoList, index, {
        ...item,
        text: e.target.value,
      })
    );
  }
  function toggleItemCompletion() {
    setTodoList(
      replaceItemAdIndex(todoList, index, {
        ...item,
        isComplete: !item.isComplete,
      })
    );
  }
  function deleteItem() {
    setTodoList(removeItemAtIndex(todoList, index));
  }

  return (
    <div className="todo-list-item">
      <input
        className="check-box"
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
        name=""
        id=""
      />
      <input
        className="input"
        type="text"
        value={item.text}
        onChange={editItemText}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function replaceItemAdIndex(list, index, item) {
  return [...list.slice(0, index), item, ...list.slice(index + 1)];
}

function removeItemAtIndex(list, index) {
  return [...list.slice(0, index), ...list.slice(index + 1)];
}
