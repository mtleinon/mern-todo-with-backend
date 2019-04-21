import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { deleteTodo, toggleTodo } from '../actions/actions';

export class TodoList extends Component {
  static propTypes = {
    todoList: PropTypes.array.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired
  };

  deleteTodoItem = index => e => {
    this.props.deleteTodo(index);
  };
  toggleTodoItem = index => e => {
    this.props.toggleTodo(index);
  };

  render() {
    const { todoList } = this.props;
    return (
      <ul>
        {todoList.map((todo, index) => (
          <TodoItem
            key={index}
            todoText={todo.text}
            done={todo.done}
            deleteTodoItem={this.deleteTodoItem(index)}
            toggleTodoItem={this.toggleTodoItem(index)}
          />
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  todoList: state
});

const mapDispatchToProps = {
  deleteTodo,
  toggleTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
