import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo } from '../actions/actions';

class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addTodoValue: ''
    };
  }
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({ ...this.state, addTodoValue: e.target.value });
  };
  onClick = e => {
    this.props.addTodo(this.state.addTodoValue);
    this.setState({ ...this.state, addTodoValue: '' });
  };

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input
          type="text"
          onChange={this.onChange}
          value={this.state.addTodoValue}
        />
        <button onClick={this.onClick}>Add</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  addTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo);
