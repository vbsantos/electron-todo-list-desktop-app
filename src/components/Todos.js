import React, { Component } from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

export class Todos extends Component {
  render() {
    return this.props.todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        toggleTodo={this.props.toggleTodo}
        deleteTodo={this.props.deleteTodo}
      />
    ));
  }
}

// PropTypes
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

export default Todos;
