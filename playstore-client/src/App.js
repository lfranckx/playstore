import React, {Component} from 'react';
import './App.css';
import AppList from './AppList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      sort: '',
      genres: '',
      error: null
    }
  }

  // METHODS FOR UPDATING STATE
  setSort(sort) {
    this.setState({
      sort
    })
  }
  setGenres(genres) {
    this.setState({
      genres
    })
  }

  // form-submit handler will construct the query string attach it to the URL, 
  // perform the fetch and update the state with the returned data.
  // If there is an error when fetching the data display a message to the user.
  // Seperated the query string constructor and the fetch into two seperate 
  // functions so I could do a fetch when component mounts.
  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    // construct parameters from state
    if(this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    if(this.state.genres) {
      params.push(`genres=${this.state.genres}`);
    }
    // join parameters with &
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;
    console.log(url);

    this.getData(url);
  }

  getData(url) {
    fetch(url)
    .then(res => {
      if(res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      this.setState({
        apps: data,
        error: null // reset errors
      })
    })
    .catch(err => {
      this.setState({
        error: `Sorry, something went wrong: ${err.message}`
      })
    })
  }

  // load list of all apps as default state when page first loads.
  componentDidMount() {
    const baseUrl = 'http://localhost:8000/apps';
    this.getData(baseUrl);
  }
    
  render() {
    console.log(this.state.apps)
    const apps = this.state.apps.map((app, i) => {
      return <AppList apps={this.state.apps} key={i} />
    })
    return (
      <main className="App">
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="sort">Sort: </label>
          <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
            <option value="">None</option>
            <option value="App">App Name</option>
            <option value="Rating">Rating</option>
          </select>
          
          <label htmlFor="genres">Genres: </label>
          <select id="genres" name="genres" onChange={e => this.setGenres(e.target.value)}>
            <option value="">None</option>
            <option value="Action">Action</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Strategy">Strategy</option>
            <option value="Casual">Casual</option>
            <option value="Arcade">Arcade</option>
            <option value="Card">Card</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        {apps}
      </main>
    );
  }
}

export default App;
