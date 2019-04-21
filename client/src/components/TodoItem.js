import React from 'react';

export default function TodoItem({
  todoText,
  deleteTodoItem,
  toggleTodoItem,
  done
}) {
  return (
    <li style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span
        onClick={toggleTodoItem}
        style={{ textDecoration: done ? 'line-through' : 'none' }}
      >
        {todoText}
      </span>
      <button onClick={deleteTodoItem}>Delete</button>
    </li>
  );
}
