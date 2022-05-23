import React from "react";
import axios from "axios";
import Movielist from "./components/movieList";
import Navbar from "./components/navbar";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: localStorage.getItem("title") || null,
      movielist: null,
      page: 1,
      sortBy: localStorage.getItem("sortBy") || "year",
    };
    this.handleExpandList = this.handleExpandList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSortOption = this.handleSortOption.bind(this);
  }

  reloadMovieList() {
    if (!this.state.title) return;

    const apikey = "88ba4a8d";
    const url = `https://www.omdbapi.com`;

    axios
      .get(url, {
        params: {
          s: this.state.title,
          type: "movie",
          apikey: apikey,
        },
      })
      .then((response) => {
        if (!response.data.Response) return;

        this.setState({ movielist: response.data.Search });
      });
  }

  componentDidMount() {
    this.reloadMovieList();
  }

  handleExpandList() {
    if (!this.state.title) return;

    let state = this.state;
    state.page += 1;
    this.setState(state);

    const apikey = "88ba4a8d";
    const url = `https://www.omdbapi.com`;

    axios
      .get(url, {
        params: {
          s: this.state.title,
          apikey: apikey,
          page: this.state.page,
          type: "movie",
        },
      })
      .then((response) => {
        if (!response.data.Response) return;

        let state = this.state;
        response.data.Search.map((search) => state.movielist.push(search));
        this.setState({ state });
      });
  }

  componentDidUpdate() {
    localStorage.setItem("title", this.state.title);
    localStorage.setItem("sortBy", this.state.sortBy);
  }

  handleSearch(title) {
    let state = this.state;
    state.title = title;
    this.setState(state);
    this.reloadMovieList();
  }

  sortMovieList() {
    if (this.state.movielist) {
      if (this.state.sortBy === "year") {
        console.log("year");
        this.sortMovieListByYear();
      } else if (this.state.sortBy === "name") {
        console.log("name");
        this.sortMovieListByName();
      }
    }
  }

  sortMovieListByYear() {
    this.state.movielist.sort((a, b) => {
      return b.Year - a.Year;
    });
  }

  sortMovieListByName() {
    this.state.movielist.sort((a, b) =>
      a.Title.toLowerCase().localeCompare(b.Title.toLowerCase())
    );
  }

  handleSortOption(event) {
    let state = this.state;
    state.sortBy = event.target.value;
    this.setState(state);
    this.sortMovieList();
  }

  render() {
    if (!this.state.movielist)
      return <Navbar handleSearch={this.handleSearch} />;

    this.sortMovieList();
    return (
      <>
        <Navbar handleSearch={this.handleSearch} />
        <div className="app__header">
          <h2 className="search__title">You Searched: {this.state.title}</h2>

          <div>
            <label htmlFor="filter__select">sort by:</label>
            <select id="filter__select" onChange={this.handleSortOption}>
              <option value="year" selected={this.state.sortBy === "year"}>
                year
              </option>
              <option value="name" selected={this.state.sortBy === "name"}>
                name
              </option>
            </select>
          </div>
        </div>
        <Movielist list={this.state.movielist} />
        <button className="expand__list_btn" onClick={this.handleExpandList}>
          expand list
        </button>
      </>
    );
  }
}
