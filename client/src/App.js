import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import todoApp from './reducers/reducers';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

const initialState = [
  { text: 'Test todo 1', done: true },
  { text: 'Test todo 2', done: false }
];

const store = createStore(
  todoApp,
  initialState,
  compose(
    applyMiddleware(reduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

class App extends Component {
  render() {
    return (
      <div style={{ marginLeft: '100px', width: '250px' }}>
        <Provider store={store}>
          <h1>Todo List</h1>
          <AddTodo />
          <TodoList />
        </Provider>
      </div>
    );
  }
}

export default App;
