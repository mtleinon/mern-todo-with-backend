export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export function addTodo(text) {
  return { type: ADD_TODO, payload: text };
}

export function deleteTodo(index) {
  return { type: DELETE_TODO, payload: index };
}
export function toggleTodo(index) {
  return { type: TOGGLE_TODO, payload: index };
}
