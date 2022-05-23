import React from "react";
import N_A from "../images/no-image.png";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let poster = this.props.movie.Poster;
    if (poster === "N/A") {
      poster = N_A;
    }

    return (
      <>
        <img src={poster} className="movie__img" alt=""></img>
        <p>{this.props.movie.Title}</p>
        <p>Year: {this.props.movie.Year}</p>
      </>
    );
  }
}
