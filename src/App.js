import React from 'react';
import './App.css';
import Nav from './Components/Nav';
import Body from './Components/Body';
import LogInForm from './Components/LogInForm';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      isLoading: false,
      error: null,
      // isLoggedIn: false,
      // form: false,
      logInMethod: this.logIn,
      user: null,
      ratings: null
    }
    this.url = 'https://rancid-tomatillos.herokuapp.com/api/v2'
  }

  logIn = () => {
    this.setState({ ...this.state, form: true })
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.userID !== prevProps.userID) {
  //     this.fetchData(this.props.userID);
  //   }
  // }

  componentDidMount() {
    this.setState({ isLoading: true })
    // set logged in as a property on state - boolean
    // switch to true after logged in and conditional render 

    // the other option is to use router, ask teachers

    fetch(`${this.url}/movies`)
      .then(response => {
        if(response.ok) {
          return response.json() 
        } else {
          throw new Error('Pardon the disturbance...')
        }})
      .then(data => this.setState({ 
        movies: data.movies, 
        isLoading: false 
    })).catch(error => this.setState({ error, isLoading: false}))
  }
  
  getUserRatings = (data) => {
    console.log('data', data)
    this.setState({user: data.user, isLoggedIn: true})
    fetch(`${this.url}/users/${this.state.user.id}/ratings`) 
      .then(response => response.json())
      .then(data => this.setState({form: false, ratings: data.ratings}))
      .then(data => console.log('userratingsstate', this.state))
      .catch(error => console.log(error))

  
  }

  render() {
    const { movies, isLoading, error, form, isLoggedIn, ratings } = this.state
    if(isLoading) {
      return <p>Loading...</p>
    }

    if(error) {
    return <p>{error.message}</p>
    }

    if(form) {
      return (
         <LogInForm getUserRatings= {this.getUserRatings}/>
        )
    }

    if(isLoggedIn) {
      return (
        <main className="App">
          <Nav data={this.state}/>
          <Body movies={movies} ratings={ratings} />
        </main>
      )
    }
    
    return (
      <main className="App">
        <Nav data={this.state}/>
        <Body movies={movies} ratings={ratings}/>
      </main>
    );
  }
  // logged out screen component
}

export default App;
