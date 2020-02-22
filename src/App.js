// Dependencies
import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Header from "./components/layout/Header";
import { AddTodo } from "./components/AddTodo";
import Todos from "./components/Todos";
// import { About } from "./components/pages/About";

// Style
import "./App.css";

const ipcRenderer = window.ipcRenderer;

export class App extends Component {
  state = {
    Todos: []
  };

  componentDidMount = async () => {
    // make migrations
    await ipcRenderer.invoke("todo", { method: "migrations" });
    // fill todo-list
    ipcRenderer
      .invoke("todo", { method: "index" })
      .then(res => this.setState({ Todos: [...res] }));
  };

  // Toggle mark
  toggleTodo = id => {
    console.log("toggle: [" + id + "]");
    this.setState({
      Todos: this.state.Todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          ipcRenderer.invoke("todo", {
            method: "update",
            content: { id, completed: todo.completed }
          });
        }
        return todo;
      })
    });
  };

  // Delete Todo
  deleteTodo = id => {
    console.log("delete: [" + id + "]");
    ipcRenderer
      .invoke("todo", { method: "destroy", content: { id } })
      .then(res =>
        this.setState({
          Todos: [...this.state.Todos.filter(todo => todo.id !== id)]
        })
      );
  };
  // Create Todo
  addTodo = title => {
    console.log("create:", title);
    ipcRenderer
      .invoke("todo", {
        method: "create",
        content: { title, completed: false }
      })
      .then(res =>
        this.setState({
          Todos: [...this.state.Todos, res]
        })
      );
  };

  render() {
    //    return (
    //      <Router>
    //        <div className="App">
    //          <Header />
    //          <Route
    //            exact
    //            path="/"
    //            render={props => (
    //              <React.Fragment>
    //                <AddTodo addTodo={this.addTodo} />
    //                <Todos
    //                  todos={this.state.Todos}
    //                  toggleTodo={this.toggleTodo}
    //                  deleteTodo={this.deleteTodo}
    //                />
    //              </React.Fragment>
    //            )}
    //          />
    //          {/* <Route path="/about" render={props => <About />} /> */}
    //          <Route path="/about" component={About} />
    //        </div>
    //      </Router>
    //    );
    return (
      <div className="App">
        <Header />
        <AddTodo addTodo={this.addTodo} />
        <Todos
          todos={this.state.Todos}
          toggleTodo={this.toggleTodo}
          deleteTodo={this.deleteTodo}
        />
      </div>
    );
  }
}

export default App;
