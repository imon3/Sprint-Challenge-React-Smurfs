import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };

    const id = this.state.smurfs.find(smurf => `${smurf.id}` === this.state.smurfs.id);
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
      .then(res => {
        this.setState({
          smurfs: res.data
        })
      })
      .catch(err => console.log(err))
  }

  deleteSmurf = (e, id) => {
    e.preventDefault();
    axios.delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        this.setState({
          smurfs: res.data
        })
        this.props.history.push('/')
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/smurf-form'>Form</NavLink>
          <NavLink to='/'>Smurf List</NavLink>
        </nav>
        <Route
          path='/smurf-form'
          render={props => <SmurfForm {...props} />}
        />
        <Route
          exact
          path='/'
          render={props => <Smurfs {...props} smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf} />}
        />
      </div>
    );
  }
}

export default App;
