import React, { Component } from "react";
import PropTypes from "prop-types";

export class TodoItem extends Component {
  getTodoStyle = () => {
    return {
      background: "lightgrey",
      padding: "10px",
      borderBottom: "1px white dotted",
      textDecoration: this.props.todo.completed ? "line-through" : "none"
    };
  };

  render() {
    const { id, title } = this.props.todo;
    return (
      <div style={this.getTodoStyle()}>
        <p>
          <input
            type="checkbox"
            checked={this.props.todo.completed === true}
            onChange={this.props.toggleTodo.bind(this, id)}
          />
          {"  "}
          {title}
          <button
            onClick={this.props.deleteTodo.bind(this, id)}
            style={btnStyle}
          >
            X
          </button>
        </p>
      </div>
    );
  }
}

// PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

const btnStyle = {
  background: "#ff1122",
  color: "white",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right"
};

export default TodoItem;
