import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil';
import { todoListState } from './state';

const getId = function(){
    let id = 0;
    return function(){
        return id ++
    }
}()

export default function TodoItemCreator() {
    const [inputValue, setInputValue] = useState('')
    const setTodoListState = useSetRecoilState(todoListState)
    function onInputChange(e){
        setInputValue(e.target.value);
    }
    function addItem() {
        if (inputValue === '') {
            return;
        }
        setTodoListState((oldState) => {
            return [
                ...oldState,
                {
                    id: getId(),
                    text: inputValue,
                    isComplete: false,
                }
            ]
        })
        setInputValue('');
    }
  return (
    <div className='todo-item-creator'>
        <input type="text" value={inputValue} onChange={onInputChange} />
        <button onClick={addItem}>Add</button>
    </div>
  )
}
