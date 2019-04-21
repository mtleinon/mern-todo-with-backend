import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from '../actions/actions';
const initialState = [];

function todoApp(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_TODO:
      const stateCopy = [...state];
      stateCopy[+action.payload].done = !stateCopy[+action.payload].done;
      return stateCopy;
    case ADD_TODO:
      return [...state, { text: action.payload, done: false }];
    case DELETE_TODO:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
    default:
      return state;
  }
}

export default todoApp;
